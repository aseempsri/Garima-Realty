import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Award {
  category: string;
  title: string;
  year: string;
}

interface Achievement {
  text: string;
}

@Component({
  selector: 'app-awards-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './awards-section.component.html',
  styleUrls: ['./awards-section.component.css'],
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
export class AwardsSectionComponent {
  tagline = 'Success Measured by Trust & Performance';

  awards: Award[] = [
    {
      category: 'Agency Excellence',
      title: 'Best Digital Agency',
      year: '2024'
    },
    {
      category: 'Industry Recognition',
      title: 'Top 50 Agencies India',
      year: '2024'
    },
    {
      category: 'Marketing Excellence',
      title: 'Marketing Excellence Award',
      year: '2024'
    },
    {
      category: 'Content Innovation',
      title: 'Content Innovation Award',
      year: '2024'
    }
  ];

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
