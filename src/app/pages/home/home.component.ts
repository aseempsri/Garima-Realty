import { afterNextRender, Component, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { PresenceSectionComponent } from '../../components/presence-section/presence-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { WarehouseSectionComponent } from '../../components/warehouse-section/warehouse-section.component';
import { PanchshilKharadiSectionComponent } from '../../components/panchshil-kharadi-section/panchshil-kharadi-section.component';
import { JhamtaniAdSectionComponent } from '../../components/jhamtani-ad-section/jhamtani-ad-section.component';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section.component';
import { FeaturedPortfolioSectionComponent } from '../../components/featured-portfolio-section/featured-portfolio-section.component';
import { WhyPuneSectionComponent } from '../../components/why-pune-section/why-pune-section.component';
import { WhyChooseSectionComponent } from '../../components/why-choose-section/why-choose-section.component';
import { FoundersSectionComponent } from '../../components/founders-section/founders-section.component';
import { AchievementsSectionComponent } from '../../components/achievements-section/achievements-section.component';
import { TestimonialsSectionComponent } from '../../components/testimonials-section/testimonials-section.component';
import { FAQSectionComponent } from '../../components/faq-section/faq-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { WhatsAppButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    PresenceSectionComponent,
    ServicesSectionComponent,
    WarehouseSectionComponent,
    PanchshilKharadiSectionComponent,
    JhamtaniAdSectionComponent,
    ProjectsSectionComponent,
    FeaturedPortfolioSectionComponent,
    WhyPuneSectionComponent,
    WhyChooseSectionComponent,
    FoundersSectionComponent,
    AchievementsSectionComponent,
    TestimonialsSectionComponent,
    FAQSectionComponent,
    ContactSectionComponent,
    FooterComponent,
    WhatsAppButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.scheduleScrollToHash());

    afterNextRender(() => {
      this.scheduleScrollToHash();
      this.doc.defaultView?.addEventListener('hashchange', () => this.scrollToHashIfPresent());
    });
  }

  /** Mobile in-app browsers often skip native hash scroll after SPA boot; retry after layout settles. */
  private scheduleScrollToHash(): void {
    const win = this.doc.defaultView;
    if (!win) {
      return;
    }
    const delays = [0, 50, 150, 400, 800];
    for (const ms of delays) {
      win.setTimeout(() => this.scrollToHashIfPresent(), ms);
    }
  }

  private scrollToHashIfPresent(): void {
    const hash = this.doc.defaultView?.location.hash ?? '';
    if (!hash.startsWith('#') || hash.length < 2) {
      return;
    }
    const id = decodeURIComponent(hash.slice(1).split('?')[0]);
    const el = this.doc.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
}
