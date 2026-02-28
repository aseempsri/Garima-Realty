import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Achievement {
  text: string;
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
    ])
  ]
})
export class AchievementsSectionComponent {
  tagline = 'Success Measured by Trust & Performance';

  achievements: Achievement[] = [
    { text: 'Closed ₹ 150+ Cr Worth of Premium Deals' },
    { text: '50000 sq ft Commercial Spaces Leased' },
    { text: 'Strong Client Retention Rate of 70 %' },
    { text: 'Exclusive Mandates Across Prime Pune Locations' }
  ];

  getDelay(i: number): string {
    return `${200 + i * 150}ms`;
  }
}
