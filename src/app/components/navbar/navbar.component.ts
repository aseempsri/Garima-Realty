import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = false;
  mobileOpen = false;

  navLinks: NavLink[] = [
    { label: "About", href: "#about" },
    { label: "Presence", href: "#presence" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Founders", href: "#founders" },
    { label: "Contact", href: "#contact" },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  ngOnInit(): void {
    this.onWindowScroll();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }
}
