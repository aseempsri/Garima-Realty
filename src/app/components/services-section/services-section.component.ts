import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

interface Service {
  iconType: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css'],
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
export class ServicesSectionComponent {
  services: Service[] = [
    { iconType: 'building2', title: 'Premium Residential & Commercial', desc: 'Curated luxury properties across top micro-markets.' },
    { iconType: 'trending-up', title: 'Strategic Investment Advisory', desc: 'Data-driven insights for maximum portfolio growth.' },
    { iconType: 'bar-chart-3', title: 'High ROI Selection', desc: 'Properties with proven appreciation potential of 10-15% annually.' },
    { iconType: 'handshake', title: 'End-to-End Transaction Management', desc: 'Seamless buying experience from shortlisting to possession.' },
    { iconType: 'landmark', title: 'Home Loan & Financial Structuring', desc: 'Tie-ups with leading banks for optimal financing solutions.' },
    { iconType: 'file-check-2', title: 'Documentation & Compliance', desc: '100% RERA compliant with transparent legal processes.' },
    { iconType: 'globe', title: 'NRI & International Assistance', desc: 'Dedicated support for overseas investors with power of attorney.' },
  ];

  getDelay(i: number): string {
    return `${150 + i * 80}ms`;
  }
}
