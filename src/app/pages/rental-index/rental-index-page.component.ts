import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { getAllRentalListings, RentalListing } from '../../core/rental-listings';
import { isRentalIndexUnlocked, unlockRentalIndex } from '../../core/rental-access';

@Component({
  selector: 'app-rental-index-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './rental-index-page.component.html',
  styleUrls: ['./rental-index-page.component.css'],
})
export class RentalIndexPageComponent implements OnInit {
  readonly unlocked = signal(false);
  readonly passwordError = signal(false);
  passwordInput = '';
  listings: RentalListing[] = [];

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
  ) {}

  ngOnInit(): void {
    this.listings = getAllRentalListings();
    this.unlocked.set(isRentalIndexUnlocked());

    this.title.setTitle('Rental Listings | Garima Realty');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  submitPassword(): void {
    const ok = unlockRentalIndex(this.passwordInput);
    if (ok) {
      this.unlocked.set(true);
      this.passwordError.set(false);
      this.passwordInput = '';
      return;
    }
    this.passwordError.set(true);
  }

  coverSrc(listing: RentalListing): string {
    return listing.coverImagePath.replace(/^\//, '');
  }
}
