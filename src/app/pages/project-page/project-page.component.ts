import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { WhatsAppButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';
import { PanchshilKharadiSectionComponent } from '../../components/panchshil-kharadi-section/panchshil-kharadi-section.component';
import { TheEverettSectionComponent } from '../../components/the-everett-section/the-everett-section.component';
import { GodrejSkylineSectionComponent } from '../../components/godrej-skyline-section/godrej-skyline-section.component';

const VALID_PROJECT_SLUGS = [
  'panchshil-mundhwa',
  'the-everett-lullanagar',
  'godrej-skyline-koregaon-park',
] as const;

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    WhatsAppButtonComponent,
    PanchshilKharadiSectionComponent,
    TheEverettSectionComponent,
    GodrejSkylineSectionComponent,
  ],
  templateUrl: './project-page.component.html',
})
export class ProjectPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly slug = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('slug') ?? '';
      if (!VALID_PROJECT_SLUGS.includes(slug as (typeof VALID_PROJECT_SLUGS)[number])) {
        void this.router.navigateByUrl('/');
        return;
      }
      this.slug.set(slug);
      this.doc.defaultView?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }
}
