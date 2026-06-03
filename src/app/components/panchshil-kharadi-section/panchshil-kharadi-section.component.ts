import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {
  formatProjectShareMessage,
  PROJECT_SHARE_PROFILES,
  projectShareImageUrl,
  projectShareUrl,
  resolveAssetOrigin,
  resolveShareOrigin,
  shareProjectViaWhatsApp,
} from '../../core/project-share';
import { GalleryLightboxComponent } from '../gallery-lightbox/gallery-lightbox.component';

interface PanchshilCarouselSlide {
  src: string;
  headline: string;
  caption: string;
}

@Component({
  selector: 'app-panchshil-kharadi-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GalleryLightboxComponent],
  templateUrl: './panchshil-kharadi-section.component.html',
  styleUrls: ['./panchshil-kharadi-section.component.css'],
})
export class PanchshilKharadiSectionComponent implements OnDestroy {
  readonly videoSrc = 'assets/panchshilKharadi/57Avenue%20by%20Panchshil.mp4';
  readonly shareProfile = PROJECT_SHARE_PROFILES['panchshil-mundhwa'];

  @HostListener('document:keydown.escape')
  onDocumentEscape(): void {
    if (this.galleryExpanded()) {
      this.closeGallery();
      return;
    }
    if (this.shareModalOpen()) {
      this.closeShareModal();
    }
  }

  readonly shareModalOpen = signal(false);
  readonly linkCopied = signal(false);
  readonly galleryExpanded = signal(false);

  readonly carouselSlides: PanchshilCarouselSlide[] = [
    {
      src: 'assets/panchshilKharadi/shared%20image%20(3).jpg',
      headline: 'Perfectly positioned',
      caption: 'Twin towers, pool & skyline — Mundhwa at the heart of Pune’s eastern corridor.',
    },
    {
      src: 'assets/panchshilKharadi/shared%20image%20(4).jpg',
      headline: 'A new landmark',
      caption: '3.5 & 4.5 BHK residences — architecture that defines the skyline.',
    },
    {
      src: 'assets/panchshilKharadi/shared%20image%20(5).jpg',
      headline: 'Infinite ways to indulge',
      caption: 'Clubhouse, recreation & wellness — spaces for a life well lived.',
    },
    {
      src: 'assets/panchshilKharadi/shared%20image%20(6).jpg',
      headline: 'Design in the details',
      caption: 'Layouts that flow into balconies framing sweeping city views.',
    },
  ];

  readonly carouselIndex = signal(0);
  readonly carouselPaused = signal(false);

  private copyResetTimer?: ReturnType<typeof setTimeout>;
  private carouselAutoTimer?: ReturnType<typeof setInterval>;
  private touchStartX = 0;

  private readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('panchshilVideo');

  constructor() {
    afterNextRender(() => {
      const el = this.videoRef()?.nativeElement;
      if (el) {
        this.ensureVideoPlays(el);
      }
    });
    this.carouselAutoTimer = setInterval(() => {
      if (!this.carouselPaused()) {
        this.advanceCarousel(1);
      }
    }, 6500);
  }

  ngOnDestroy(): void {
    if (this.carouselAutoTimer) {
      clearInterval(this.carouselAutoTimer);
    }
    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }
  }

  advanceCarousel(delta: number): void {
    const n = this.carouselSlides.length;
    if (n === 0) {
      return;
    }
    this.carouselIndex.update((i) => (i + delta + n) % n);
  }

  goCarousel(i: number): void {
    if (i >= 0 && i < this.carouselSlides.length) {
      this.carouselIndex.set(i);
    }
  }

  onCarouselTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onCarouselTouchEnd(event: TouchEvent): void {
    const x = event.changedTouches[0].clientX;
    const dx = x - this.touchStartX;
    if (dx > 56) {
      this.advanceCarousel(-1);
    } else if (dx < -56) {
      this.advanceCarousel(1);
    }
  }

  currentCarouselSlide(): PanchshilCarouselSlide {
    return this.carouselSlides[this.carouselIndex()] ?? this.carouselSlides[0];
  }

  onVideoMetadata(video: HTMLVideoElement): void {
    video.playsInline = true;
    video.muted = true;
    video.defaultMuted = true;
    video.preload = 'auto';
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
  }

  ensureVideoPlays(video: HTMLVideoElement): void {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    if (video.paused) {
      void video.play().catch(() => {
        /* Autoplay blocked or decode error — see browser console / re-encode to H.264 baseline */
      });
    }
  }

  openGallery(): void {
    this.galleryExpanded.set(true);
    this.carouselPaused.set(true);
  }

  closeGallery(): void {
    this.galleryExpanded.set(false);
  }

  openShareModal(): void {
    this.shareModalOpen.set(true);
  }

  closeShareModal(): void {
    this.shareModalOpen.set(false);
  }

  sharePageUrl(): string {
    return projectShareUrl(this.shareProfile.slug, resolveShareOrigin());
  }

  shareImageUrl(): string {
    return projectShareImageUrl(this.shareProfile, resolveAssetOrigin());
  }

  shareMessagePlain(): string {
    return formatProjectShareMessage(this.shareProfile, resolveShareOrigin());
  }

  twitterIntentText(): string {
    return `${this.shareProfile.headline} — ${this.shareProfile.ogDescription.split('.')[0]}.`;
  }

  async shareViaWhatsApp(): Promise<void> {
    await shareProjectViaWhatsApp(this.shareMessagePlain(), {
      imageUrl: this.shareImageUrl(),
      imageFilename: 'Panchshil-Mundhwa.webp',
    });
    this.closeShareModal();
  }

  shareViaFacebook(): void {
    const u = encodeURIComponent(this.sharePageUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, '_blank', 'noopener,noreferrer');
  }

  shareViaTwitter(): void {
    const text = encodeURIComponent(this.twitterIntentText());
    const url = encodeURIComponent(this.sharePageUrl());
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  async copyShareLink(): Promise<void> {
    const message = this.shareMessagePlain();
    if (!message || typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      this.linkCopied.set(true);
      if (this.copyResetTimer) {
        clearTimeout(this.copyResetTimer);
      }
      this.copyResetTimer = setTimeout(() => this.linkCopied.set(false), 2200);
    } catch {
      /* ignore */
    }
  }

  readonly overviewPoints = [
    'Possession targeted ~4 years from launch',
    '4 apartments per floor · 4 elevators (3 passenger + 1 service)',
    '1st-floor garden apartments for serene green living',
    'Exclusive 4.5 BHK — only 20 residences in the tower',
  ];

  readonly pricingTiers = [
    {
      label: '3.5 BHK',
      detail: '₹4.25 Cr – ₹4.50 Cr (all inclusive)',
      note: 'Includes 2 car parks',
    },
    {
      label: '4.5 BHK',
      detail: '₹8 Cr (all inclusive)',
      note: 'Includes 3 car parks',
    },
  ];

  readonly highlightPoints = [
    'Spread across 6.5 acres with only 369 exclusive residences',
    '4 towers — 3.5 & 4.5 BHK configurations',
    'Phase 1: Towers A & B — Phase 2: Towers C & D',
    'Structure: 3 basements + 27 floors',
  ];

  readonly apartmentSpecs = [
    { config: '3.5 BHK', carpet: '2,033 sq.ft. carpet' },
    { config: '4.5 BHK', carpet: '3,522 sq.ft. carpet' },
  ];

  readonly whyPoints = [
    'Rare low-density project — only 369 units across 6.5 acres',
    'Signature Panchshil luxury & design excellence',
    'Strategic location, minutes from Kalyani Nagar & Koregaon Park',
  ];

  readonly launchNotes = [
    { label: 'Expected launch', value: 'Mid-November 2025' },
    { label: 'Token amount', value: '₹25 lakh (non-bankable cheque)' },
  ];
}
