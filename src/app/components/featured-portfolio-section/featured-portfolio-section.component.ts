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

  constructor(private cdr: ChangeDetectorRef) {}

  listings: FeaturedListing[] = [
    // Trump Towers - Images 1 & 2
    {
      id: 1,
      name: 'Trump Towers',
      location: 'Kalyani Nagar, Pune',
      configuration: '5.5 BHK',
      price: '₹15 Cr onwards',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 1.jpg'
    },
    {
      id: 2,
      name: 'Trump Towers',
      location: 'Kalyani Nagar, Pune',
      configuration: '5.5 BHK',
      price: '₹15 Cr onwards',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 2.jpg'
    },
    // Yoo Villas - Images 3 & 4
    {
      id: 3,
      name: 'Yoo Villas',
      location: 'Kharadi, Pune',
      configuration: '4.5 BHK',
      price: '₹13 Cr onwards',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 3.jpg'
    },
    {
      id: 4,
      name: 'Yoo Villas',
      location: 'Kharadi, Pune',
      configuration: '4.5 BHK',
      price: '₹13 Cr onwards',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 4.jpg'
    },
    // Yoo Pune - Image 5
    {
      id: 5,
      name: 'Yoo Pune',
      location: 'Magarpatta, Pune',
      configuration: '4.5 BHK & 5.5 BHK',
      price: '₹12 Cr onwards',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 5.jpg'
    },
    // Total Environment - Images 6 & 7
    {
      id: 6,
      name: 'Total Environment',
      location: 'Sopan Baug, Pune',
      configuration: '3.5 BHK & 4.5 BHK',
      price: '₹7 Cr - ₹15 Cr',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 6.jpeg'
    },
    {
      id: 7,
      name: 'Total Environment',
      location: 'Sopan Baug, Pune',
      configuration: '3.5 BHK & 4.5 BHK',
      price: '₹7 Cr - ₹15 Cr',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 7.jpeg'
    },
    // Trump World Centre - Image 8
    {
      id: 8,
      name: 'Trump World Centre',
      location: 'Mundhwa, Pune',
      configuration: 'Commercial',
      price: '₹7 Cr onwards',
      category: 'Commercial',
      date: 'Recent',
      image: 'assets/image 8.jpeg'
    },
    // Amar Westview - Image 9
    {
      id: 9,
      name: 'Amar Westview',
      location: 'Koregaon Park, Pune',
      configuration: 'Residential',
      price: '₹15 Cr onwards',
      category: 'Residential',
      date: 'Recent',
      image: 'assets/image 9.jpeg'
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
    
    // Use setTimeout to ensure DOM is updated after Angular change detection
    setTimeout(() => {
      const container = this.listingsContainer.nativeElement;
      if (!container) return;
      
      // Find the active card by matching the current index
      const listingBoxes = container.querySelectorAll('.listing-box');
      const activeCard = listingBoxes[this.currentIndex] as HTMLElement;
      
      if (activeCard) {
        const containerHeight = container.clientHeight;
        const cardHeight = activeCard.offsetHeight;
        const cardOffsetTop = activeCard.offsetTop;
        const cardOffsetBottom = cardOffsetTop + cardHeight;
        
        // Get current scroll position
        const scrollTop = container.scrollTop;
        const scrollBottom = scrollTop + containerHeight;
        
        // Check if card is already visible
        const isCardVisible = cardOffsetTop >= scrollTop && cardOffsetBottom <= scrollBottom;
        
        if (!isCardVisible) {
          // Calculate scroll position to center the card
          const targetScrollTop = cardOffsetTop - (containerHeight / 2) + (cardHeight / 2);
          
          container.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
        }
      }
    }, 100);
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
    this.cdr.detectChanges(); // Force change detection
    this.scrollToActiveCard();
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.listings.length) % this.listings.length;
    this.selectedListing = this.listings[this.currentIndex];
    this.cdr.detectChanges(); // Force change detection
    this.scrollToActiveCard();
  }

  selectListing(listing: FeaturedListing, index: number): void {
    this.currentIndex = index;
    this.selectedListing = listing;
    this.cdr.detectChanges(); // Force change detection
    this.stopAutoSlide();
    this.startAutoSlide();
    this.scrollToActiveCard();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.selectedListing = this.listings[index];
    this.cdr.detectChanges(); // Force change detection
    this.stopAutoSlide();
    this.startAutoSlide();
    this.scrollToActiveCard();
  }
}
