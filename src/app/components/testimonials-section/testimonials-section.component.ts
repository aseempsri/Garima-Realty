import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
      transition(':enter', [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class TestimonialsSectionComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Amit Deshmukh',
      role: 'Investor, Pune',
      quote: 'Garima Realty made my first luxury property investment seamless. Their market knowledge and transparency gave me complete confidence. My property has appreciated 18% in just 2 years.',
    },
    {
      name: 'Neha Kulkarni',
      role: 'NRI Client, Dubai',
      quote: 'As an NRI, buying property in India was daunting. The team handled everything — from site visits to documentation — with incredible professionalism. Truly a white-glove experience.',
    },
    {
      name: 'Rajesh Mehta',
      role: 'Business Owner, Mumbai',
      quote: 'Their strategic advice on commercial investment in Pune was spot-on. The ROI has exceeded my expectations. I now exclusively work with Garima Realty for all my real estate needs.',
    },
  ];

  activeIndex = 0;

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  get activeTestimonial(): Testimonial {
    return this.testimonials[this.activeIndex];
  }

}
