import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SaleListingPageComponent } from './pages/sale-listing/sale-listing-page.component';
import { SaleIndexPageComponent } from './pages/sale-index/sale-index-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sale', component: SaleIndexPageComponent },
  { path: 'sale/:slug', component: SaleListingPageComponent },
  { path: '**', component: NotFoundComponent }
];
