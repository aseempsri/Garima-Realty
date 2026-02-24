import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface FAQ {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FAQSectionComponent {
  faqs: FAQ[] = [
    {
      q: 'Is Garima Realty RERA certified?',
      a: 'Yes, we are fully RERA registered (MahaRERA No: A011262401115). All our recommended projects are RERA compliant, ensuring complete transparency and legal protection for our clients.',
    },
    {
      q: 'Do you assist with home loans?',
      a: 'Absolutely. We have tie-ups with leading banks and NBFCs to help you secure the best financing options. Our team handles the entire loan process from application to disbursement.',
    },
    {
      q: 'Which areas in Pune do you specialize in?',
      a: 'We have deep expertise in Koregaon Park, Koregaon Park Annexe, Bavdhan, Hinjewadi, Kharadi, Baner, Aundh, and other premium micro-markets across Pune.',
    },
    {
      q: 'Can NRIs invest through Garima Realty?',
      a: 'Yes, we provide comprehensive NRI assistance including property selection, legal documentation, power of attorney support, and virtual site tours. Many of our clients are based in the UAE, USA, and UK.',
    },
    {
      q: 'What types of properties do you deal in?',
      a: 'We specialize in luxury residential (3BHK to 5BHK premium apartments, villas, penthouses), commercial properties (office spaces, retail), and strategic land parcels for development.',
    },
  ];

  expandedIndex: number | null = null;

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }
}
