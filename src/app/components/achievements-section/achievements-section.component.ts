import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Achievement {
  metric: string;
  description: string;
  icon?: string;
}

@Component({
  selector: 'app-achievements-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './achievements-section.component.html',
  styleUrls: ['./achievements-section.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInUpDelay', [
      state('void', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('highlight', [
      state('normal', style({ transform: 'scale(1)', filter: 'brightness(1)' })),
      state('highlighted', style({ transform: 'scale(1.1)', filter: 'brightness(1.3)' })),
      transition('normal => highlighted', [
        animate('600ms ease-out', style({ transform: 'scale(1.15)', filter: 'brightness(1.5)' })),
        animate('400ms ease-in', style({ transform: 'scale(1.1)', filter: 'brightness(1.3)' }))
      ]),
      transition('highlighted => normal', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class AchievementsSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('achievementsSection', { static: false }) sectionRef!: ElementRef;
  
  tagline = 'Success Measured by Trust & Performance';
  highlightedIndexes: Set<number> = new Set();
  private observer?: IntersectionObserver;
  private isInView = false;
  private animationInterval?: any;

  constructor(private cdr: ChangeDetectorRef) {}

  achievements: Achievement[] = [
    { 
      metric: '₹ 150+ Cr',
      description: 'Worth of Premium Deals Closed',
      icon: 'trending-up'
    },
    { 
      metric: '50,000 sq ft',
      description: 'Commercial Spaces Leased',
      icon: 'building'
    },
    { 
      metric: '70%',
      description: 'Client Retention Rate',
      icon: 'check-circle2'
    },
    { 
      metric: 'Prime Pune',
      description: 'Exclusive Mandates Across Locations',
      icon: 'map-pin'
    }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 30% of section is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isInView) {
          this.isInView = true;
          this.startContinuousAnimation();
        } else if (!entry.isIntersecting && this.isInView) {
          this.isInView = false;
          this.stopContinuousAnimation();
        }
      });
    }, options);

    // Observe the section element
    setTimeout(() => {
      const section = document.getElementById('achievements');
      if (section) {
        this.observer?.observe(section);
      }
    }, 100);
  }

  private startContinuousAnimation(): void {
    let currentIndex = 0;
    const highlightDuration = 1500; // How long each metric stays highlighted
    const delayBetweenMetrics = 400; // Delay before next metric highlights
    
    const animateNext = () => {
      if (!this.isInView) return;
      
      // Clear previous highlight
      this.highlightedIndexes.clear();
      this.cdr.detectChanges();
      
      // Highlight current metric
      setTimeout(() => {
        if (!this.isInView) return;
        this.highlightedIndexes.add(currentIndex);
        this.cdr.detectChanges();
        
        // Remove highlight after duration
        setTimeout(() => {
          if (!this.isInView) return;
          this.highlightedIndexes.delete(currentIndex);
          this.cdr.detectChanges();
          
          // Move to next metric
          currentIndex = (currentIndex + 1) % this.achievements.length;
          
          // Continue loop
          setTimeout(animateNext, delayBetweenMetrics);
        }, highlightDuration);
      }, 100);
    };
    
    // Start the animation loop
    animateNext();
  }

  private stopContinuousAnimation(): void {
    this.highlightedIndexes.clear();
    this.cdr.detectChanges();
  }

  isHighlighted(index: number): string {
    return this.highlightedIndexes.has(index) ? 'highlighted' : 'normal';
  }

  getDelay(i: number): string {
    return `${200 + i * 150}ms`;
  }
}
