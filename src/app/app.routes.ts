import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RentalListingPageComponent } from './pages/rental-listing/rental-listing-page.component';
import { RentalIndexPageComponent } from './pages/rental-index/rental-index-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rent', component: RentalIndexPageComponent },
  { path: 'rent/:slug', component: RentalListingPageComponent },
  { path: '**', component: NotFoundComponent }
];
