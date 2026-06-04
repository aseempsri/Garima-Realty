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

interface EverettCarouselSlide {
  src: string;
  headline: string;
  caption: string;
}

interface HeroVideoClip {
  src: string;
  startAt: number;
}

@Component({
  selector: 'app-the-everett-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GalleryLightboxComponent],
  templateUrl: './the-everett-section.component.html',
  styleUrls: ['./the-everett-section.component.css'],
})
export class TheEverettSectionComponent implements OnDestroy {
  readonly shareProfile = PROJECT_SHARE_PROFILES['the-everett-lullanagar'];

  /** Flythrough playlist: Deck → Night facade → Rooftop → Podium pool, then repeat. */
  readonly heroVideos: HeroVideoClip[] = [
    { src: 'assets/theEverett/deck.mp4', startAt: 4 },
    { src: 'assets/theEverett/night-facade.mp4', startAt: 4.5 },
    { src: 'assets/theEverett/rooftop.mp4', startAt: 4 },
    { src: 'assets/theEverett/swimming-pool.mp4', startAt: 0 },
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

  readonly carouselSlides: EverettCarouselSlide[] = [
    {
      src: 'assets/theEverett/building-exterior.jpg',
      headline: 'A defining landmark',
      caption:
        'Twin 29-storey towers on 3.63 acres — trophy architecture rising above Lullanagar’s green corridor.',
    },
    {
      src: 'assets/theEverett/lobby.jpg',
      headline: 'Grand arrival',
      caption:
        'A lobby conceived for trophy living — precision design, generous scale, and quiet luxury at every turn.',
    },
    {
      src: 'assets/theEverett/double-height-living.jpeg',
      headline: 'Bungalow-scale living',
      caption:
        'Double-height living & dining with floor-to-ceiling glass — bungalow-style openness within the sky.',
    },
    {
      src: 'assets/theEverett/balcony-deck.jpeg',
      headline: 'Expansive decks',
      caption:
        'Multiple large decks framing sunset views — private outdoor rooms for discerning homeowners.',
    },
    {
      src: 'assets/theEverett/terrace.jpeg',
      headline: 'Rooftop waterbody',
      caption:
        'Waterbody seating on the rooftop — a serene social space above the city skyline.',
    },
    {
      src: 'assets/theEverett/rooftop-pool.jpeg',
      headline: 'Podium pool',
      caption:
        'Swimming pool on the podium level — curated wellness and leisure at the heart of the development.',
    },
    {
      src: 'assets/theEverett/temple.jpg',
      headline: 'Sacred sanctum',
      caption:
        'Dedicated Ganesh temple within the development — Vastu-aligned living with spiritual grace.',
    },
    {
      src: 'assets/theEverett/entrance-facade.jpg',
      headline: 'Glass & light',
      caption:
        'A striking glass-facade arrival — where precision engineering meets architectural poetry.',
    },
  ];

  readonly carouselIndex = signal(0);
  readonly carouselPaused = signal(false);

  private copyResetTimer?: ReturnType<typeof setTimeout>;
  private carouselAutoTimer?: ReturnType<typeof setInterval>;
  private touchStartX = 0;
  private heroSeekPending = false;

  private readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('everettVideo');

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

  currentCarouselSlide(): EverettCarouselSlide {
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
      imageFilename: 'The-Everett-Lullanagar.jpg',
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
    'Private elevator access to select residences',
    'Double-height living & dining — bungalow-style openness in a high-rise',
    'Multiple large decks with sweeping open views',
    'Vastu-compliant layouts · dedicated Ganesh temple on-site',
  ];

  readonly pricingTiers = [
    {
      label: '3 bed',
      detail: '₹4 Cr All Inclusive',
      note: '~1,800 sq.ft.',
    },
    {
      label: '4 bed',
      detail: '₹4.75 Cr – ₹5.25 Cr All Inclusive',
      note: '~2,250 sq.ft.',
    },
    {
      label: '4 bed (Large)',
      detail: '₹5.35 Cr – ₹5.65 Cr All Inclusive',
      note: '~2,450 sq.ft.',
    },
    {
      label: '5 bed Duplex',
      detail: '₹6.3 Cr – ₹6.5 Cr All Inclusive',
      note: '~2,800 sq.ft.',
    },
    {
      label: '5 bed (Exclusive)',
      detail: '₹7.90 Cr – ₹8.2 Cr All Inclusive',
      note: '~3,300 sq.ft.',
    },
  ];

  readonly highlightPoints = [
    '3.63-acre premium development · two elegant 29-storey towers',
    'Six dedicated levels of parking',
    '~70,000 sq.ft. curated lifestyle amenities — wellness, leisure & social',
    '5, 4 & 3 bed residences with multiple master bedrooms & walk-in wardrobes',
  ];

  readonly apartmentSpecs = [
    { config: '3 bed', carpet: '~1,800 sq.ft.' },
    { config: '4 bed', carpet: '~2,250 sq.ft.' },
    { config: '4 bed (Large)', carpet: '~2,450 sq.ft.' },
    { config: '5 bed Duplex', carpet: '~2,800 sq.ft.' },
    { config: '5 bed (Exclusive)', carpet: '~3,300 sq.ft.' },
  ];

  readonly whyPoints = [
    'Tribeca legacy — creators of The Ark & Tribeca High Street, Pune’s defining addresses',
    'Trophy positioning for HNIs seeking scale, privacy & precision design',
    'Strategic Lullanagar location — near Little Italy & South Command Hospital',
  ];

  readonly launchNotes = [
    { label: 'Status', value: 'Launching — selective inventory access & launch benefits' },
    { label: 'Experience Centre', value: 'Private preview at Lullanagar' },
    { label: 'RERA', value: 'PM1261012600059' },
  ];

  readonly launchFootnote =
    'Launch benefits on selective inventory — connect with Garima Realty for current allocations and pricing.';

  readonly tribecaQuote = 'Quality is not expensive. It is priceless.';
}
