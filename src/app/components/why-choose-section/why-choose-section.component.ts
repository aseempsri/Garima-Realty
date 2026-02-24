import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-why-choose-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './why-choose-section.component.html',
  styleUrls: ['./why-choose-section.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      state('void', style({ opacity: 0, transform: 'translateX(-20px)' })),
      transition(':enter', [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class WhyChooseSectionComponent {
  reasons = [
    'Verified RERA Projects Only',
    'Strong Developer Network',
    'Strategic Investment Approach',
    '100% Transparent Practices',
    'Personalized Advisory',
    '15+ Years Market Experience',
  ];

  getDelay(i: number): string {
    return `${200 + i * 80}ms`;
  }
}
