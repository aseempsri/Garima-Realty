import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-presence-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './presence-section.component.html',
  styleUrls: ['./presence-section.component.css'],
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
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PresenceSectionComponent {
  cities = [
    {
      name: 'Pune',
      desc: 'Our home base. Deep expertise in Koregaon Park, Bavdhan, Hinjewadi, Kharadi & premium micro-markets.',
    },
    {
      name: 'Mumbai',
      desc: 'Strategic presence in India\'s financial capital covering premium residential and commercial segments.',
    },
    {
      name: 'Raipur',
      desc: 'Expanding into Central India\'s emerging real estate markets with high-growth investment opportunities.',
    },
    {
      name: 'UAE',
      desc: 'International advisory services for NRI investors and luxury property opportunities in the Gulf.',
    },
  ];

  getDelay(i: number): string {
    return `${200 + i * 100}ms`;
  }
}
