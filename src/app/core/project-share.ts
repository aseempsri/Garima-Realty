export interface ProjectShareProfile {
  slug: string;
  hashId: string;
  ogTitle: string;
  ogDescription: string;
  ogImagePath: string;
  headline: string;
  subtitle: string;
  location: string;
  configuration: string;
  priceLine: string;
  developer: string;
}

export const SITE_ORIGIN = 'https://www.garimarealty.com';

export const PROJECT_SHARE_PROFILES: Record<string, ProjectShareProfile> = {
  'the-everett-lullanagar': {
    slug: 'the-everett-lullanagar',
    hashId: 'the-everett-lullanagar',
    ogTitle: 'The Everett Lullanagar | Garima Realty',
    ogDescription:
      'The Everett by Tribeca — trophy 3, 4 & 5 bed residences in Lullanagar, Pune. Private elevator, double-height living, ~70,000 sq.ft. amenities. From ₹4 Cr TCO.',
    ogImagePath: '/assets/theEverett/balcony-deck-og.jpg',
    headline: 'The Everett · Lullanagar',
    subtitle: 'Trophy ultra-premium · Launching',
    location: 'Lullanagar, Pune',
    configuration: '3, 4 & 5 BHK · Tribeca',
    priceLine: 'From ₹4 Cr TCO',
    developer: 'Tribeca',
  },
  'panchshil-mundhwa': {
    slug: 'panchshil-mundhwa',
    hashId: 'panchshil-mundhwa',
    ogTitle: 'Panchshil Mundhwa | Garima Realty',
    ogDescription:
      'Panchshil Mundhwa — ultra-luxury 3.5 & 4.5 BHK on 6.5 acres near Koregaon Park, Pune. Low-density development, 369 exclusive residences. From ₹4.25 Cr.',
    ogImagePath: '/assets/panchshilKharadi/57%20av.webp',
    headline: 'Panchshil Mundhwa',
    subtitle: 'Ultra-luxury residences · Launch',
    location: 'Mundhwa, Pune',
    configuration: '3.5 & 4.5 BHK · Panchshil',
    priceLine: 'From ₹4.25 Cr (all inclusive)',
    developer: 'Panchshil',
  },
};

/** Fresh query param so WhatsApp/Facebook re-scrape link previews instead of using cache. */
export function shareCacheBustToken(): number {
  return Date.now();
}

export function projectShareUrl(
  slug: string,
  origin = SITE_ORIGIN,
  cacheBust: number = shareCacheBustToken()
): string {
  const base = `${origin.replace(/\/$/, '')}/p/${slug}/`;
  return `${base}?v=${cacheBust}`;
}

export function projectShareImageUrl(profile: ProjectShareProfile, origin = SITE_ORIGIN): string {
  return `${origin.replace(/\/$/, '')}${profile.ogImagePath}`;
}

/** Public site URL for share links — WhatsApp cannot preview localhost. */
export function resolveShareOrigin(): string {
  if (typeof window === 'undefined') {
    return SITE_ORIGIN;
  }
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return SITE_ORIGIN;
  }
  return window.location.origin;
}

/** Asset origin for fetching images (local dev serves assets from localhost). */
export function resolveAssetOrigin(): string {
  if (typeof window === 'undefined') {
    return SITE_ORIGIN;
  }
  return window.location.origin;
}

export function formatProjectShareMessage(
  profile: ProjectShareProfile,
  origin?: string,
  cacheBust?: number
): string {
  const shareOrigin = origin ?? resolveShareOrigin();
  const version = cacheBust ?? shareCacheBustToken();
  const url = projectShareUrl(profile.slug, shareOrigin, version);

  return [
    'Garima Realty',
    '──────────────',
    `🏠 ${profile.headline}`,
    profile.subtitle,
    '',
    `📍 ${profile.location}`,
    `🛏️ ${profile.configuration}`,
    `💰 ${profile.priceLine}`,
    '',
    '──────────────',
    'View this project',
    url,
    '',
    'Tap the link to open this exact project on our site.',
  ].join('\n');
}

export interface WhatsAppShareOptions {
  imageUrl?: string;
  imageFilename?: string;
}

/**
 * WhatsApp share: text + public link (link preview image from og tags on live site).
 * On localhost, also tries native share with one attached image so preview works while developing.
 */
export async function shareProjectViaWhatsApp(
  message: string,
  options: WhatsAppShareOptions = {}
): Promise<void> {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocal && options.imageUrl && typeof navigator !== 'undefined' && navigator.share) {
    try {
      const res = await fetch(options.imageUrl);
      if (res.ok) {
        const blob = await res.blob();
        const file = new File([blob], options.imageFilename ?? 'project.jpg', {
          type: blob.type || 'image/jpeg',
        });
        const payload: ShareData = { text: message, files: [file] };
        if (navigator.canShare?.(payload)) {
          await navigator.share(payload);
          return;
        }
      }
    } catch {
      /* fall through to wa.me */
    }
  }

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
