import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-warehouse-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './warehouse-section.component.html',
  styleUrls: ['./warehouse-section.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition(':enter', [
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WarehouseSectionComponent {
  description = 'Garima Realty also specializes in warehouse development solutions, where we work closely with landowners and investors to plan and develop custom-built warehouses and logistics spaces.';
}
