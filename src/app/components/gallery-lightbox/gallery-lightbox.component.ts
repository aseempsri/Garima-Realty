import { Component, effect, HostListener, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export interface GalleryLightboxSlide {
  src: string;
  headline: string;
  caption: string;
}

@Component({
  selector: 'app-gallery-lightbox',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './gallery-lightbox.component.html',
  styleUrl: './gallery-lightbox.component.css',
})
export class GalleryLightboxComponent {
  readonly open = input.required<boolean>();
  readonly slides = input.required<GalleryLightboxSlide[]>();
  readonly index = input.required<number>();
  readonly contextLabel = input('');
  readonly altSuffix = input('');

  readonly closed = output<void>();
  readonly previous = output<void>();
  readonly next = output<void>();

  constructor() {
    effect(() => {
      if (typeof document === 'undefined') {
        return;
      }
      document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closed.emit();
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous.emit();
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next.emit();
    }
  }

  currentSlide(): GalleryLightboxSlide {
    return this.slides()[this.index()] ?? this.slides()[0];
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }
}
