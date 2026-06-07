import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { getRentalListing, RentalListing } from '../../core/rental-listings';
import {
  formatRentalListingShareMessage,
  rentalListingImageUrl,
  rentalListingUrl,
  shareRentalListingViaWhatsApp,
} from '../../core/rental-listing-share';
import { SITE_ORIGIN, shareCacheBustToken } from '../../core/project-share';
import { GalleryLightboxComponent } from '../../components/gallery-lightbox/gallery-lightbox.component';

interface RentalGallerySlide {
  src: string;
  headline: string;
  caption: string;
}

@Component({
  selector: 'app-rental-listing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, GalleryLightboxComponent],
  templateUrl: './rental-listing-page.component.html',
  styleUrls: ['./rental-listing-page.component.css'],
})
export class RentalListingPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  listing: RentalListing | null = null;
  readonly carouselIndex = signal(0);
  readonly galleryExpanded = signal(false);
  readonly shareModalOpen = signal(false);
  readonly linkCopied = signal(false);
  private shareLinkVersion = 0;
  private copyResetTimer?: ReturnType<typeof setTimeout>;
  private touchStartX = 0;

  gallerySlides: RentalGallerySlide[] = [];

  @HostListener('document:keydown.escape')
  onDocumentEscape(): void {
    if (this.galleryExpanded()) {
      this.galleryExpanded.set(false);
      return;
    }
    if (this.shareModalOpen()) {
      this.closeShareModal();
    }
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      void this.router.navigateByUrl('/');
      return;
    }

    const listing = getRentalListing(slug);
    if (!listing) {
      void this.router.navigateByUrl('/');
      return;
    }

    this.listing = listing;
    this.gallerySlides = listing.images.map((src, index) => ({
      src,
      headline: index === 0 ? listing.headline : '',
      caption: index === 0 ? listing.subtitle : '',
    }));

    this.applyMetaTags(listing);
  }

  private applyMetaTags(listing: RentalListing): void {
    const imageUrl = rentalListingImageUrl(listing, SITE_ORIGIN);
    const pageUrl = `${SITE_ORIGIN}/r/${listing.slug}/`;

    this.title.setTitle(listing.ogTitle);
    this.meta.updateTag({ name: 'description', content: listing.ogDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Garima Realty' });
    this.meta.updateTag({ property: 'og:title', content: listing.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: listing.ogDescription });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: listing.ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: listing.ogDescription });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  currentSlide(): RentalGallerySlide {
    return this.gallerySlides[this.carouselIndex()] ?? this.gallerySlides[0];
  }

  advanceCarousel(delta: number): void {
    const total = this.gallerySlides.length;
    if (total === 0) {
      return;
    }
    this.carouselIndex.update((i) => (i + delta + total) % total);
  }

  onCarouselTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }

  onCarouselTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = endX - this.touchStartX;
    if (Math.abs(delta) < 40) {
      return;
    }
    this.advanceCarousel(delta < 0 ? 1 : -1);
  }

  openGallery(): void {
    this.galleryExpanded.set(true);
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

  shareMessagePlain(): string {
    if (!this.listing) {
      return '';
    }
    const version = this.shareLinkVersion || shareCacheBustToken();
    return formatRentalListingShareMessage(this.listing, SITE_ORIGIN, version);
  }

  sharePageUrl(): string {
    if (!this.listing) {
      return '';
    }
    const version = this.shareLinkVersion || shareCacheBustToken();
    return rentalListingUrl(this.listing.slug, SITE_ORIGIN, version);
  }

  twitterIntentText(): string {
    if (!this.listing) {
      return '';
    }
    return `${this.listing.headline} — ${this.listing.subtitle}`;
  }

  async shareViaWhatsApp(): Promise<void> {
    await shareRentalListingViaWhatsApp(this.shareMessagePlain());
    this.closeShareModal();
  }

  shareViaFacebook(): void {
    const u = encodeURIComponent(this.sharePageUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, '_blank', 'noopener,noreferrer');
  }

  shareViaTwitter(): void {
    const text = encodeURIComponent(this.twitterIntentText());
    const url = encodeURIComponent(this.sharePageUrl());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
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

  whatsAppContactLink(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `Hi, I am interested in the ${this.listing?.headline ?? 'rental'} listing on Garima Realty.`
    );
    return `https://wa.me/91${digits}?text=${text}`;
  }
}
