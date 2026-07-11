import { Component, ElementRef, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface NavLink {
  label: string;
  href?: string;
  dropdown?: boolean;
}

interface ProjectLink {
  label: string;
  slug: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = false;
  pastHero = false;
  mobileOpen = false;
  projectsOpen = false;
  mobileProjectsOpen = false;

  navLinks: NavLink[] = [
    { label: 'About', href: '/#about' },
    { label: 'Presence', href: '/#presence' },
    { label: 'Services', href: '/#services' },
    { label: 'Projects', dropdown: true },
    { label: 'Founders', href: '/#founders' },
    { label: 'Contact', href: '/#contact' },
  ];

  projectLinks: ProjectLink[] = [
    { label: 'Panchshil Mundhwa', slug: 'panchshil-mundhwa' },
    { label: 'The Everett Lullanagar', slug: 'the-everett-lullanagar' },
    { label: 'Godrej Skyline Koregaon Park Annexe', slug: 'godrej-skyline-koregaon-park' },
  ];

  private readonly host = inject(ElementRef<HTMLElement>);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 50;
    this.pastHero = window.scrollY >= window.innerHeight - 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.projectsOpen && !this.host.nativeElement.contains(event.target as Node)) {
      this.projectsOpen = false;
    }
  }

  ngOnInit(): void {
    this.onWindowScroll();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    if (!this.mobileOpen) {
      this.mobileProjectsOpen = false;
    }
  }

  closeMobile(): void {
    this.mobileOpen = false;
    this.mobileProjectsOpen = false;
  }

  toggleProjects(): void {
    this.projectsOpen = !this.projectsOpen;
  }

  toggleMobileProjects(): void {
    this.mobileProjectsOpen = !this.mobileProjectsOpen;
  }

  scrollToTop(): void {
    this.closeMobile();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
}
