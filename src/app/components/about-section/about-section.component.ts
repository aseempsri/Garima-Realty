import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollIntoViewDirective } from '../../directives/scroll-into-view.directive';

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, ScrollIntoViewDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
  animations: [
    trigger('fadeInLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-40px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('800ms'))
    ]),
    trigger('fadeInRight', [
      state('hidden', style({ opacity: 0, transform: 'translateX(40px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('800ms 200ms'))
    ]),
    trigger('fadeInUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('500ms'))
    ])
  ]
})
export class AboutSectionComponent implements OnInit {
  stats: Stat[] = [
    { value: '15+', label: 'Years Experience' },
    { value: 'RERA', label: 'Registered' },
    { value: '4+', label: 'Cities' },
    { value: '500+', label: 'Happy Clients' }
  ];

  isInView = false;

  ngOnInit(): void {}

  onInViewChange(inView: boolean): void {
    if (inView && !this.isInView) {
      this.isInView = true;
    }
  }

  getStatDelay(index: number): string {
    return `${400 + index * 100}ms`;
  }
}
