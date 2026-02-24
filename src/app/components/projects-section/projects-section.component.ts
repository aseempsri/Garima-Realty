import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Project {
  name: string;
  location: string;
  price: string;
  type: string;
  tag: string;
  highlights: string[];
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css'],
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
export class ProjectsSectionComponent {
  projects: Project[] = [
    {
      name: 'Casa Elanza',
      location: 'Koregaon Park Annexe, Pune',
      price: '₹18 Cr',
      type: '5BHK Luxury Homes',
      tag: 'Ultra Premium',
      highlights: ['Private Terrace', 'Italian Marble', 'Smart Home'],
    },
    {
      name: 'Trump World Trade Center',
      location: 'Koregaon Park, Pune',
      price: '₹8 Cr',
      type: 'Commercial & Investment',
      tag: 'Investment',
      highlights: ['Global Brand', 'High ROI', 'A-Grade Offices'],
    },
    {
      name: 'Bavdhan Land Parcel',
      location: 'Bavdhan, Pune',
      price: '₹175 Cr',
      type: '8 Acres — Development Land',
      tag: 'Exclusive',
      highlights: ['Prime Location', 'Development Ready', 'Strong Returns'],
    },
  ];

  getDelay(i: number): string {
    return `${200 + i * 150}ms`;
  }
}
