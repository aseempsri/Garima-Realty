import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';
import { cn } from '@/lib/utils';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() collapsible: boolean = true;
  @Input() className: string = '';
  
  openValue: string | null = null;
  openValues: string[] = [];

  @ContentChildren(AccordionItemComponent) items!: QueryList<AccordionItemComponent>;

  toggle(value: string): void {
    if (this.type === 'single') {
      this.openValue = this.openValue === value && this.collapsible ? null : value;
      this.items.forEach(item => {
        item.isOpen = item.value === this.openValue;
      });
    } else {
      const index = this.openValues.indexOf(value);
      if (index > -1) {
        this.openValues.splice(index, 1);
      } else {
        this.openValues.push(value);
      }
      this.items.forEach(item => {
        item.isOpen = this.openValues.includes(item.value);
      });
    }
  }

  get classes(): string {
    return cn("", this.className);
  }
}
