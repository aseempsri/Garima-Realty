import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@/lib/utils';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css'
})
export class AccordionItemComponent {
  @Input() value: string = '';
  @Input() className: string = '';
  
  isOpen: boolean = false;

  get classes(): string {
    return cn("border-b", this.className);
  }
}
