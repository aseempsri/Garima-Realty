import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { getAllSaleListings, SaleListing } from '../../core/sale-listings';
import { isSaleIndexUnlocked, unlockSaleIndex } from '../../core/sale-access';

@Component({
  selector: 'app-sale-index-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sale-index-page.component.html',
  styleUrls: ['./sale-index-page.component.css'],
})
export class SaleIndexPageComponent implements OnInit {
  readonly unlocked = signal(false);
  readonly passwordError = signal(false);
  passwordInput = '';
  listings: SaleListing[] = [];

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
  ) {}

  ngOnInit(): void {
    this.listings = getAllSaleListings();
    this.unlocked.set(isSaleIndexUnlocked());

    this.title.setTitle('Sale Listings | Garima Realty');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  submitPassword(): void {
    const ok = unlockSaleIndex(this.passwordInput);
    if (ok) {
      this.unlocked.set(true);
      this.passwordError.set(false);
      this.passwordInput = '';
      return;
    }
    this.passwordError.set(true);
  }

  coverSrc(listing: SaleListing): string {
    return listing.coverImagePath.replace(/^\//, '');
  }
}
