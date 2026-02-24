import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      state('void', style({ opacity: 0, transform: 'translateX(-30px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      state('void', style({ opacity: 0, transform: 'translateX(30px)' })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ContactSectionComponent {
  form = {
    name: '',
    phone: '',
    city: '',
    interest: ''
  };

  onSubmit(): void {
    // Handle form submission
    alert('Enquiry Received! Our team will reach out to you within 24 hours.');
    this.form = { name: '', phone: '', city: '', interest: '' };
  }

  getFormDelay(): string {
    return '200ms';
  }

  getContactDelay(): string {
    return '300ms';
  }
}
