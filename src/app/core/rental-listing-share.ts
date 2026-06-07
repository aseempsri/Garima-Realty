import { RentalListing } from './rental-listings';
import { SITE_ORIGIN, shareCacheBustToken } from './project-share';

/** Public share URL (static OG page) — separate from the Angular listing route. */
export function rentalListingShareUrl(slug: string, origin = SITE_ORIGIN, cacheBust = shareCacheBustToken()): string {
  return `${origin.replace(/\/$/, '')}/r/${slug}/?v=${cacheBust}`;
}

/** @deprecated Use rentalListingShareUrl for sharing; kept as alias. */
export function rentalListingUrl(slug: string, origin = SITE_ORIGIN, cacheBust = shareCacheBustToken()): string {
  return rentalListingShareUrl(slug, origin, cacheBust);
}

export function rentalListingPageUrl(slug: string, origin = SITE_ORIGIN): string {
  return `${origin.replace(/\/$/, '')}/rent/${slug}`;
}

export function rentalListingImageUrl(listing: RentalListing, origin = SITE_ORIGIN): string {
  return `${origin.replace(/\/$/, '')}${listing.coverImagePath}`;
}

export function formatRentalListingShareMessage(
  listing: RentalListing,
  origin?: string,
  cacheBust?: number
): string {
  const shareOrigin = origin ?? SITE_ORIGIN;
  const version = cacheBust ?? shareCacheBustToken();
  const url = rentalListingUrl(listing.slug, shareOrigin, version);

  return [
    'Garima Realty · For Rent',
    '──────────────',
    `🏠 ${listing.headline}`,
    listing.subtitle,
    '',
    `📍 ${listing.location}`,
    `🛏️ ${listing.configuration} · ${listing.carpetArea}`,
    `🚗 ${listing.parking}`,
    `💰 ${listing.rentLine}`,
    '',
    '──────────────',
    'View this listing',
    url,
    '',
    'Tap the link to see photos and full details.',
  ].join('\n');
}

export async function shareRentalListingViaWhatsApp(message: string): Promise<void> {
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
