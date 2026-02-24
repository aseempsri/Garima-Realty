import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

interface Reason {
  iconType: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-why-pune-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './why-pune-section.component.html',
  styleUrls: ['./why-pune-section.component.css'],
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
export class WhyPuneSectionComponent {
  reasons: Reason[] = [
    { iconType: 'cpu', title: 'IT Ecosystem Boom', desc: 'Hinjewadi, Kharadi & Magarpatta driving massive demand for premium housing.' },
    { iconType: 'train', title: 'Metro Expansion', desc: 'Pune Metro transforming connectivity and property values across corridors.' },
    { iconType: 'trending-up', title: '10-15% Annual Growth', desc: 'Consistent property appreciation outperforming most asset classes.' },
    { iconType: 'building', title: 'Infrastructure Surge', desc: 'Ring road, airport expansion & smart city projects fueling growth.' },
  ];

  getDelay(i: number): string {
    return `${200 + i * 100}ms`;
  }
}
