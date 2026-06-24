import {
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
  shareCacheBustToken,
  shareProjectViaWhatsApp,
} from '../../core/project-share';
import { GalleryLightboxComponent } from '../gallery-lightbox/gallery-lightbox.component';

interface GodrejCarouselSlide {
  src: string;
  headline: string;
  caption: string;
}

interface HeroVideoClip {
  src: string;
  startAt: number;
}

@Component({
  selector: 'app-godrej-skyline-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GalleryLightboxComponent],
  templateUrl: './godrej-skyline-section.component.html',
  styleUrls: ['./godrej-skyline-section.component.css'],
})
export class GodrejSkylineSectionComponent implements OnDestroy {
  readonly shareProfile = PROJECT_SHARE_PROFILES['godrej-skyline-koregaon-park'];

  readonly heroVideos: HeroVideoClip[] = [
    { src: 'assets/godrejSkyline/hero.mp4', startAt: 0 },
  ];

  readonly heroVideoIndex = signal(0);

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
  private shareLinkVersion = 0;
  readonly galleryExpanded = signal(false);

  readonly carouselSlides: GodrejCarouselSlide[] = [
    {
      src: 'assets/godrejSkyline/building-exterior.jpeg',
      headline: 'Castle in the clouds',
      caption:
        'The tallest tower in the vicinity — rising above Koregaon Park Annexe with views that redefine everyday living.',
    },
    {
      src: 'assets/godrejSkyline/rooftop-pool.jpeg',
      headline: 'Sky-high leisure',
      caption:
        'Rooftop infinity pool with sunken lounge seating — curated wellness above the city skyline.',
    },
    {
      src: 'assets/godrejSkyline/living-room.jpeg',
      headline: 'Expansive living',
      caption:
        'Thoughtfully crafted residences with floor-to-ceiling glass, generous decks, and effortless comfort.',
    },
    {
      src: 'assets/godrejSkyline/lobby.jpeg',
      headline: 'Grand arrival',
      caption:
        'A reception lobby that expresses refinement through every detail — sculptural light, marble, and calm luxury.',
    },
  ];

  readonly carouselIndex = signal(0);
  readonly carouselPaused = signal(false);

  private copyResetTimer?: ReturnType<typeof setTimeout>;
  private carouselAutoTimer?: ReturnType<typeof setInterval>;
  private touchStartX = 0;
  private heroSeekPending = false;

  private readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('godrejVideo');

  constructor() {
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
    const video = this.videoRef()?.nativeElement;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
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

  currentCarouselSlide(): GodrejCarouselSlide {
    return this.carouselSlides[this.carouselIndex()] ?? this.carouselSlides[0];
  }

  currentHeroVideoSrc(): string {
    return this.heroVideos[this.heroVideoIndex()]?.src ?? this.heroVideos[0].src;
  }

  startHeroClip(index: number): void {
    if (index < 0 || index >= this.heroVideos.length) {
      return;
    }
    this.heroVideoIndex.set(index);
  }

  onHeroVideoMetadata(video: HTMLVideoElement): void {
    this.configureHeroVideo(video);
    const clip = this.heroVideos[this.heroVideoIndex()];
    if (clip.startAt > 0.05) {
      this.heroSeekPending = true;
      video.currentTime = clip.startAt;
      return;
    }
    this.heroSeekPending = false;
    void video.play().catch(() => {
      /* Autoplay blocked — user gesture required */
    });
  }

  onHeroVideoSeeked(video: HTMLVideoElement): void {
    if (!this.heroSeekPending) {
      return;
    }
    this.heroSeekPending = false;
    void video.play().catch(() => {
      /* Autoplay blocked — user gesture required */
    });
  }

  onHeroVideoEnded(): void {
    const next = (this.heroVideoIndex() + 1) % this.heroVideos.length;
    this.startHeroClip(next);
  }

  private configureHeroVideo(video: HTMLVideoElement): void {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
  }

  openGallery(): void {
    this.galleryExpanded.set(true);
    this.carouselPaused.set(true);
  }

  closeGallery(): void {
    this.galleryExpanded.set(false);
  }

  openShareModal(): void {
    this.shareLinkVersion = Date.now();
    this.shareModalOpen.set(true);
  }

  closeShareModal(): void {
    this.shareModalOpen.set(false);
  }

  sharePageUrl(): string {
    const version = this.shareLinkVersion || shareCacheBustToken();
    return projectShareUrl(this.shareProfile.slug, resolveShareOrigin(), version);
  }

  shareImageUrl(): string {
    return projectShareImageUrl(this.shareProfile, resolveAssetOrigin());
  }

  shareMessagePlain(): string {
    const version = this.shareLinkVersion || shareCacheBustToken();
    return formatProjectShareMessage(this.shareProfile, resolveShareOrigin(), version);
  }

  twitterIntentText(): string {
    return `${this.shareProfile.headline} — ${this.shareProfile.ogDescription.split('.')[0]}.`;
  }

  async shareViaWhatsApp(): Promise<void> {
    await shareProjectViaWhatsApp(this.shareMessagePlain(), {
      imageUrl: this.shareImageUrl(),
      imageFilename: 'Godrej-Skyline-Koregaon-Park.jpg',
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
    'Thoughtfully crafted 3 & 4.5 bed residences with expansive layouts',
    'Floor-to-ceiling glass and generous decks framing city & green views',
    'Grand reception lobby with sculptural lighting and refined finishes',
    'Rooftop infinity pool with sunken lounge — leisure above the skyline',
  ];

  readonly pricingTiers = [
    {
      label: '3 bed',
      detail: 'From ₹3.50 Cr',
      note: 'Thoughtfully planned residences',
    },
    {
      label: '4.5 bed',
      detail: 'From ₹4.84 Cr',
      note: 'Expansive family homes',
    },
  ];

  readonly paymentPlans = [
    {
      label: 'Time linked',
      detail: '30 : 35 : 35',
      note: 'Structured milestone payments',
    },
    {
      label: 'Bullet plan',
      detail: '30 : 20 : 30 : 20',
      note: 'Flexible instalment schedule',
    },
    {
      label: 'Construction linked',
      detail: 'Milestone-based',
      note: 'Pay as the project progresses',
    },
  ];

  readonly highlightPoints = [
    'Tallest tower in the vicinity — commanding views over Koregaon Park Annexe',
    'Well-connected to key IT hubs in a calm, green neighbourhood',
    'Premium podium with retail at ground level and curated lifestyle amenities',
    'Godrej Properties legacy — trusted developer with pan-India premium portfolio',
  ];

  readonly whyPoints = [
    'Godrej Properties — one of India’s most respected real estate brands',
    'Koregaon Park Annexe address — proximity to KP, Mundhwa & major IT corridors',
    'Tailored payment plans for effortless ownership',
  ];

  readonly launchNotes = [
    { label: 'Status', value: 'Now selling — selective inventory & launch benefits' },
    { label: 'Experience', value: 'Private preview at Koregaon Park Annexe' },
    { label: 'RERA', value: 'PM1260002400007' },
  ];

  readonly launchFootnote =
    'Launch benefits on selective inventory — connect with Garima Realty for current allocations and pricing.';

  readonly brandQuote = 'Design your own castle in the clouds.';
}
