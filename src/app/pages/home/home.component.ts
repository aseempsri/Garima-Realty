import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { PresenceSectionComponent } from '../../components/presence-section/presence-section.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { WarehouseSectionComponent } from '../../components/warehouse-section/warehouse-section.component';
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
}
