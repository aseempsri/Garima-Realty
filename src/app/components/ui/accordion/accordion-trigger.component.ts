import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cn } from '@/lib/utils';

@Component({
  selector: 'app-accordion-trigger',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './accordion-trigger.component.html',
  styleUrl: './accordion-trigger.component.css'
})
export class AccordionTriggerComponent {
  @Input() className: string = '';
  @Input() isOpen: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }

  get classes(): string {
    return cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
      this.isOpen ? "[&>svg]:rotate-180" : "",
      this.className
    );
  }
}
