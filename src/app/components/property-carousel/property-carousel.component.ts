import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-property-carousel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './property-carousel.component.html',
  styleUrls: ['./property-carousel.component.css'],
  animations: [
    trigger('slide', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class PropertyCarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private autoSlideInterval?: any;
  private touchStartX = 0;
  private touchEndX = 0;
  imageLoadErrors: Set<number> = new Set();

  propertyImages: string[] = [
    // Property images - all .jpg files from assets folder
    'assets/IMG-20260225-WA0000.jpg',
    'assets/IMG-20260225-WA0001.jpg',
    'assets/IMG-20260225-WA0002.jpg',
    'assets/IMG-20260225-WA0003.jpg',
    'assets/IMG-20260225-WA0004.jpg',
    'assets/IMG-20260225-WA0005.jpg',
    'assets/IMG-20260225-WA0006.jpg',
    'assets/IMG-20260225-WA0007.jpg',
    'assets/IMG-20260225-WA0008.jpg',
    'assets/IMG-20260225-WA0009.jpg',
    'assets/IMG-20260225-WA0010.jpg',
    'assets/IMG-20260225-WA0011.jpg',
    'assets/IMG-20260225-WA0012.jpg',
    'assets/IMG-20260225-WA0013.jpg',
    'assets/IMG-20260225-WA0014.jpg',
    'assets/IMG-20260225-WA0020.jpg',
    'assets/IMG-20260225-WA0021.jpg',
    'assets/IMG-20260225-WA0022.jpg'
  ];

  onImageError(index: number, event: Event): void {
    this.imageLoadErrors.add(index);
    const img = event.target as HTMLImageElement;
    // Try alternative extension
    const currentSrc = img.src;
    if (currentSrc.endsWith('.jpg')) {
      img.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.endsWith('.png')) {
      img.src = currentSrc.replace('.png', '.jpg');
    }
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 5000); // Auto-advance every 5 seconds
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.propertyImages.length;
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.propertyImages.length) % this.propertyImages.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.previous();
      }
    }
  }
}
