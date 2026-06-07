export interface SaleListingContact {
  name: string;
  role: string;
  phone: string;
  image: string;
}

export interface SaleListing {
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
  saleLine: string;
  highlights: string[];
  images: string[];
  contacts: SaleListingContact[];
  email: string;
}

export const SALE_LISTINGS: Record<string, SaleListing> = {
  'konark-vista-1': {
    slug: 'konark-vista-1',
    listingNumber: 1,
    ogTitle: 'Konark Vista — 3.5 bed for Sale | Garima Realty',
    ogDescription:
      'Konark Vista — premium 3.5 bed residence for sale. 1,850 sq.ft., east-west facing, 2 car parking. Enquire with Garima Realty.',
    coverImagePath: '/assets/sales/konark-vista-1/cover.jpg',
    headline: 'Konark Vista',
    subtitle: '3.5 bed premium residence',
    tagline: 'Experience luxury. Experience Vista.',
    location: 'Pune',
    configuration: '3.5 bed',
    carpetArea: '1,850 sq.ft.',
    facing: 'East–West facing',
    parking: '2 car parking',
    saleLine: 'Available for sale — enquire for price',
    highlights: [
      'Spacious living with premium marble flooring and modern finishes',
      'Large balcony with expansive city views',
      'Well-appointed bedrooms with ample natural light',
      'Premium residence in a landmark development',
    ],
    images: [
      '/assets/sales/konark-vista-1/cover.jpg',
      '/assets/sales/konark-vista-1/01-living.jpg',
      '/assets/sales/konark-vista-1/02.jpg',
      '/assets/sales/konark-vista-1/03.jpg',
      '/assets/sales/konark-vista-1/04.jpg',
      '/assets/sales/konark-vista-1/05.jpg',
      '/assets/sales/konark-vista-1/06.jpg',
      '/assets/sales/konark-vista-1/07-balcony-view.jpg',
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

export function getSaleListing(slug: string): SaleListing | undefined {
  return SALE_LISTINGS[slug];
}

export function getAllSaleListings(): SaleListing[] {
  return Object.values(SALE_LISTINGS).sort((a, b) => a.listingNumber - b.listingNumber);
}
