import { SaleListing } from './sale-listings';
import { SITE_ORIGIN, shareCacheBustToken } from './project-share';

/** Public share URL (static OG page) — separate from the Angular listing route. */
export function saleListingShareUrl(slug: string, origin = SITE_ORIGIN, cacheBust = shareCacheBustToken()): string {
  return `${origin.replace(/\/$/, '')}/s/${slug}/?v=${cacheBust}`;
}

export function saleListingUrl(slug: string, origin = SITE_ORIGIN, cacheBust = shareCacheBustToken()): string {
  return saleListingShareUrl(slug, origin, cacheBust);
}

export function saleListingPageUrl(slug: string, origin = SITE_ORIGIN): string {
  return `${origin.replace(/\/$/, '')}/sale/${slug}`;
}

export function saleListingImageUrl(listing: SaleListing, origin = SITE_ORIGIN): string {
  return `${origin.replace(/\/$/, '')}${listing.coverImagePath}`;
}

export function formatSaleListingShareMessage(
  listing: SaleListing,
  origin?: string,
  cacheBust?: number
): string {
  const shareOrigin = origin ?? SITE_ORIGIN;
  const version = cacheBust ?? shareCacheBustToken();
  const url = saleListingUrl(listing.slug, shareOrigin, version);

  return [
    'Garima Realty · For Sale',
    '──────────────',
    `🏠 ${listing.headline}`,
    listing.subtitle,
    '',
    `📍 ${listing.location}`,
    `🛏️ ${listing.configuration} · ${listing.carpetArea}`,
    `🚗 ${listing.parking}`,
    `💰 ${listing.saleLine}`,
    '',
    '──────────────',
    'View this listing',
    url,
    '',
    'Tap the link to see photos and full details.',
  ].join('\n');
}

export async function shareSaleListingViaWhatsApp(message: string): Promise<void> {
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
