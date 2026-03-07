import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

interface JhamtaniProject {
  id: number;
  name: string;
  type: string;
  configuration: string;
  price: string;
  location: string;
  image: string;
}

@Component({
  selector: 'app-jhamtani-ad-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jhamtani-ad-section.component.html',
  styleUrls: ['./jhamtani-ad-section.component.css'],
  animations: [
    trigger('fadeUp', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class JhamtaniAdSectionComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private autoSlideInterval?: ReturnType<typeof setInterval>;

  logoPath = 'assets/j_logo.png';

  projects: JhamtaniProject[] = [
    {
      id: 1,
      name: 'Bizcore',
      type: 'Pre leased Studios',
      configuration: 'Studio',
      price: '₹45 Lacs onwards',
      location: 'Mundhwa',
      image: 'assets/image 1_1.jpg'
    },
    {
      id: 2,
      name: 'Bizcore',
      type: 'Pre leased Studios',
      configuration: 'Studio',
      price: '₹45 Lacs onwards',
      location: 'Mundhwa',
      image: 'assets/image 1_2.jpg'
    },
    {
      id: 3,
      name: 'Ace Villas',
      type: 'Villa',
      configuration: '4.5 BHK',
      price: '₹10 Cr onwards',
      location: 'Mundhwa',
      image: 'assets/image 1_3.jpg'
    },
    {
      id: 4,
      name: 'Ace Villas',
      type: 'Villa',
      configuration: '4.5 BHK',
      price: '₹10 Cr onwards',
      location: 'Mundhwa',
      image: 'assets/image 1_4.jpg'
    },
    {
      id: 5,
      name: 'Spacebiz',
      type: 'Commercial',
      configuration: 'Offices',
      price: '₹15 Cr onwards',
      location: 'Baner',
      image: 'assets/image 1_5.jpg'
    }
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 4500);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
