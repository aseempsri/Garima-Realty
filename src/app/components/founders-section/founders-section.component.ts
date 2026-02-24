import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Founder {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
}

@Component({
  selector: 'app-founders-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './founders-section.component.html',
  styleUrls: ['./founders-section.component.css'],
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
export class FoundersSectionComponent {
  founders: Founder[] = [
    {
      name: 'Garima Shrivastava',
      role: 'Founder & CEO',
      image: 'assets/Garima.png',
      bio: 'With over 15 years in luxury real estate, Garima brings deep market expertise and a client-first philosophy. Her vision transformed Garima Realty into Pune\'s most trusted property advisory.',
      expertise: ['Luxury Residential', 'Strategic Advisory', 'Developer Relations'],
    },
    {
      name: 'Rohit Pol',
      role: 'Co-Founder',
      image: 'assets/Rohit.png',
      bio: 'Rohit\'s financial acumen and strategic thinking drive the investment advisory arm of Garima Realty. His analytical approach ensures clients achieve optimal returns on every investment.',
      expertise: ['Investment Strategy', 'Commercial Real Estate', 'Financial Structuring'],
    },
  ];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  getDelay(i: number): string {
    return `${200 + i * 150}ms`;
  }
}
