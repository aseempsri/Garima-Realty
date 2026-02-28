import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface FeaturedListing {
  id: number;
  name: string;
  location: string;
  configuration: string;
  price: string;
  category: string;
  date: string; // Format: "MMM YYYY" or "Recent"
  image: string;
}

@Component({
  selector: 'app-featured-portfolio-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './featured-portfolio-section.component.html',
  styleUrls: ['./featured-portfolio-section.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class FeaturedPortfolioSectionComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('listingsContainer', { static: false }) listingsContainer!: ElementRef;
  currentIndex = 0;
  private autoSlideInterval?: any;
  selectedListing: FeaturedListing | null = null;

  listings: FeaturedListing[] = [
    // Existing featured properties
    {
      id: 1,
      name: 'Casa Elanza',
      location: 'Koregaon Park Annexe, Pune',
      configuration: '5BHK Luxury Homes',
      price: '₹18 Cr',
      category: 'Ultra Premium',
      date: 'Recent',
      image: 'assets/IMG-20260225-WA0000.jpg'
    },
    {
      id: 2,
      name: 'Trump World Trade Center',
      location: 'Koregaon Park, Pune',
      configuration: 'Commercial & Investment',
      price: '₹8 Cr',
      category: 'Investment',
      date: 'Recent',
      image: 'assets/IMG-20260225-WA0001.jpg'
    },
    {
      id: 3,
      name: 'Bavdhan Land Parcel',
      location: 'Bavdhan, Pune',
      configuration: '8 Acres — Development Land',
      price: '₹175 Cr',
      category: 'Exclusive',
      date: 'Recent',
      image: 'assets/IMG-20260225-WA0002.jpg'
    },
    // New listings - Luxury Resale Homes — West Pune
    {
      id: 4,
      name: 'Amar Landmark',
      location: 'West Pune',
      configuration: '4.5 BHK',
      price: '₹11 Cr',
      category: 'Luxury Resale',
      date: 'Jan 2025',
      image: 'assets/IMG-20260225-WA0003.jpg'
    },
    {
      id: 5,
      name: 'Supreme Amadore',
      location: 'West Pune',
      configuration: '4.5 BHK',
      price: '₹7.5 Cr',
      category: 'Luxury Resale',
      date: 'Dec 2024',
      image: 'assets/IMG-20260225-WA0004.jpg'
    },
    {
      id: 6,
      name: 'Kumar Sanctum',
      location: 'West Pune',
      configuration: '4 Apts',
      price: '₹15 Cr',
      category: 'Luxury Resale',
      date: 'Nov 2024',
      image: 'assets/IMG-20260225-WA0005.jpg'
    },
    // East Pune & Boat Club Road
    {
      id: 7,
      name: 'Supreme Adimaa',
      location: 'East Pune & Boat Club Road',
      configuration: '5.5 BHK',
      price: '₹19 Cr',
      category: 'Premium',
      date: 'Oct 2024',
      image: 'assets/IMG-20260225-WA0006.jpg'
    },
    {
      id: 8,
      name: 'Ajmera Aria',
      location: 'East Pune & Boat Club Road',
      configuration: '4.5 BHK',
      price: '₹16 Cr',
      category: 'Premium',
      date: 'Sep 2024',
      image: 'assets/IMG-20260225-WA0007.jpg'
    },
    {
      id: 9,
      name: 'Windermere Duplex',
      location: 'East Pune & Boat Club Road',
      configuration: 'Duplex',
      price: '₹8.99 Cr',
      category: 'Premium',
      date: 'Aug 2024',
      image: 'assets/IMG-20260225-WA0008.jpg'
    },
    // Bungalows & Plots
    {
      id: 10,
      name: 'Forest Trails',
      location: 'Pune',
      configuration: '4 BHK',
      price: '₹4.75 Cr',
      category: 'Bungalow',
      date: 'Jul 2024',
      image: 'assets/IMG-20260225-WA0009.jpg'
    },
    {
      id: 11,
      name: 'Bhugaon 1 Acre Plot',
      location: 'Bhugaon, Pune',
      configuration: '1 Acre Plot',
      price: '₹6 Cr',
      category: 'Plot',
      date: 'Jun 2024',
      image: 'assets/IMG-20260225-WA0010.jpg'
    }
  ];

  ngOnInit(): void {
    // Select first listing by default
    this.selectedListing = this.listings[0];
    this.currentIndex = 0;
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    // Scroll to active card after view initializes
    setTimeout(() => {
      this.scrollToActiveCard();
    }, 100);
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  private scrollToActiveCard(): void {
    if (!this.listingsContainer) return;
    
    const container = this.listingsContainer.nativeElement;
    const activeCard = container.querySelector(`.listing-box.active`);
    
    if (activeCard) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      
      // Calculate scroll position to center the card
      const scrollTop = container.scrollTop;
      const cardOffsetTop = (activeCard as HTMLElement).offsetTop;
      const cardHeight = cardRect.height;
      const containerHeight = containerRect.height;
      
      // Center the card in the viewport
      const targetScrollTop = cardOffsetTop - (containerHeight / 2) + (cardHeight / 2);
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.listings.length;
    this.selectedListing = this.listings[this.currentIndex];
    this.scrollToActiveCard();
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.listings.length) % this.listings.length;
    this.selectedListing = this.listings[this.currentIndex];
    this.scrollToActiveCard();
  }

  selectListing(listing: FeaturedListing, index: number): void {
    this.currentIndex = index;
    this.selectedListing = listing;
    this.stopAutoSlide();
    this.startAutoSlide();
    this.scrollToActiveCard();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.selectedListing = this.listings[index];
    this.stopAutoSlide();
    this.startAutoSlide();
    this.scrollToActiveCard();
  }
}
