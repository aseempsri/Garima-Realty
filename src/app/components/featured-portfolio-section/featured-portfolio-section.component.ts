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
  private isScrolling = false; // Prevent multiple scrolls
  private isAdvancing = false; // Prevent multiple advances

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
    if (!this.listingsContainer?.nativeElement || this.isScrolling) return;
    
    this.isScrolling = true;
    
    // Use setTimeout to ensure DOM is updated after Angular change detection
    setTimeout(() => {
      const container = this.listingsContainer.nativeElement;
      if (!container) {
        this.isScrolling = false;
        return;
      }
      
      // Find the active card by data-index attribute (most reliable)
      const activeCard = container.querySelector(`.listing-box[data-index="${this.currentIndex}"]`) as HTMLElement;
      
      if (activeCard) {
        const containerHeight = container.clientHeight;
        const cardHeight = activeCard.offsetHeight;
        const cardOffsetTop = activeCard.offsetTop;
        const cardOffsetBottom = cardOffsetTop + cardHeight;
        
        // Get current scroll position
        const scrollTop = container.scrollTop;
        const scrollBottom = scrollTop + containerHeight;
        
        // Check if card is already visible (with some padding)
        const padding = 50;
        const isCardVisible = (cardOffsetTop >= scrollTop - padding) && (cardOffsetBottom <= scrollBottom + padding);
        
        if (!isCardVisible) {
          // Calculate scroll position to center the card
          const targetScrollTop = cardOffsetTop - (containerHeight / 2) + (cardHeight / 2);
          
          container.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
          
          // Reset scrolling flag after scroll completes
          setTimeout(() => {
            this.isScrolling = false;
          }, 600);
        } else {
          this.isScrolling = false;
        }
      } else {
        this.isScrolling = false;
      }
    }, 300);
  }

  startAutoSlide(): void {
    this.stopAutoSlide(); // Ensure no duplicate intervals
    this.autoSlideInterval = setInterval(() => {
      if (!this.isScrolling && !this.isAdvancing) {
        this.advanceToNext();
      }
    }, 6000); // Increased to 6 seconds for better control
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private advanceToNext(): void {
    if (this.isAdvancing) return;
    this.isAdvancing = true;
    
    const nextIndex = (this.currentIndex + 1) % this.listings.length;
    this.updateIndex(nextIndex);
    
    setTimeout(() => {
      this.isAdvancing = false;
    }, 1000);
  }

  next(): void {
    if (this.isAdvancing) return;
    this.isAdvancing = true;
    
    const nextIndex = (this.currentIndex + 1) % this.listings.length;
    this.updateIndex(nextIndex);
    
    setTimeout(() => {
      this.isAdvancing = false;
    }, 1000);
  }

  previous(): void {
    if (this.isAdvancing) return;
    this.isAdvancing = true;
    
    const prevIndex = (this.currentIndex - 1 + this.listings.length) % this.listings.length;
    this.updateIndex(prevIndex);
    
    setTimeout(() => {
      this.isAdvancing = false;
    }, 1000);
  }

  private updateIndex(newIndex: number): void {
    // Ensure index is valid
    if (newIndex < 0 || newIndex >= this.listings.length) {
      newIndex = 0;
    }
    
    this.currentIndex = newIndex;
    this.selectedListing = this.listings[this.currentIndex];
    this.cdr.detectChanges(); // Force change detection
    
    // Scroll after a short delay to ensure DOM is updated
    setTimeout(() => {
      this.scrollToActiveCard();
    }, 100);
  }

  selectListing(listing: FeaturedListing, index: number): void {
    if (this.isAdvancing) return;
    this.isAdvancing = true;
    
    // Ensure index is valid
    const validIndex = Math.max(0, Math.min(index, this.listings.length - 1));
    this.updateIndex(validIndex);
    
    this.stopAutoSlide();
    this.startAutoSlide();
    
    setTimeout(() => {
      this.isAdvancing = false;
    }, 1000);
  }

  goToSlide(index: number): void {
    if (this.isAdvancing) return;
    this.isAdvancing = true;
    
    // Ensure index is valid
    const validIndex = Math.max(0, Math.min(index, this.listings.length - 1));
    this.updateIndex(validIndex);
    
    this.stopAutoSlide();
    this.startAutoSlide();
    
    setTimeout(() => {
      this.isAdvancing = false;
    }, 1000);
  }
}
