import { Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]',
  standalone: true
})
export class ScrollIntoViewDirective implements OnInit, OnDestroy {
  @Output() inView = new EventEmitter<boolean>();
  
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.inView.emit(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );
    
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
