import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@/lib/utils';

@Component({
  selector: 'app-accordion-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-content.component.html',
  styleUrl: './accordion-content.component.css'
})
export class AccordionContentComponent {
  @Input() className: string = '';
  @Input() isOpen: boolean = false;

  get classes(): string {
    return cn("pb-4 pt-0 overflow-hidden text-sm transition-all", this.className);
  }
}
