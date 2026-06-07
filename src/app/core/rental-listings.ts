export interface RentalListingContact {
  name: string;
  role: string;
  phone: string;
  image: string;
}

export interface RentalListing {
  slug: string;
  listingNumber: number;
  ogTitle: string;
  ogDescription: string;
  coverImagePath: string;
  headline: string;
  subtitle: string;
  tagline: string;
  location: string;
  configuration: string;
  carpetArea: string;
  facing: string;
  parking: string;
  rentLine: string;
  highlights: string[];
  images: string[];
  contacts: RentalListingContact[];
  email: string;
}

export const RENTAL_LISTINGS: Record<string, RentalListing> = {
  'konark-vista-1': {
    slug: 'konark-vista-1',
    listingNumber: 1,
    ogTitle: 'Konark Vista — 3.5 bed for Rent | Garima Realty',
    ogDescription:
      'Konark Vista — premium 3.5 bed residence for rent. 1,850 sq.ft., east-west facing, 2 car parking. Enquire with Garima Realty.',
    coverImagePath: '/assets/rentals/konark-vista-1/cover.jpg',
    headline: 'Konark Vista',
    subtitle: '3.5 bed premium residence',
    tagline: 'Experience luxury. Experience Vista.',
    location: 'Pune',
    configuration: '3.5 bed',
    carpetArea: '1,850 sq.ft.',
    facing: 'East–West facing',
    parking: '2 car parking',
    rentLine: 'Available for rent — enquire for terms',
    highlights: [
      'Spacious living with premium marble flooring and modern finishes',
      'Large balcony with expansive city views',
      'Well-appointed bedrooms with ample natural light',
      'Premium residence in a landmark development',
    ],
    images: [
      '/assets/rentals/konark-vista-1/cover.jpg',
      '/assets/rentals/konark-vista-1/01-living.jpg',
      '/assets/rentals/konark-vista-1/02.jpg',
      '/assets/rentals/konark-vista-1/03.jpg',
      '/assets/rentals/konark-vista-1/04.jpg',
      '/assets/rentals/konark-vista-1/05.jpg',
      '/assets/rentals/konark-vista-1/06.jpg',
      '/assets/rentals/konark-vista-1/07-balcony-view.jpg',
    ],
    contacts: [
      {
        name: 'Garima Shrivastava',
        role: 'Founder & CEO',
        phone: '9130084709',
        image: 'assets/Garima.png',
      },
      {
        name: 'Rohit Pol',
        role: 'Co-Founder',
        phone: '9766562128',
        image: 'assets/Rohit.png',
      },
    ],
    email: 'garimarealty@gmail.com',
  },
};

export function getRentalListing(slug: string): RentalListing | undefined {
  return RENTAL_LISTINGS[slug];
}

export function getAllRentalListings(): RentalListing[] {
  return Object.values(RENTAL_LISTINGS).sort((a, b) => a.listingNumber - b.listingNumber);
}
