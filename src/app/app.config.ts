import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  LucideAngularModule,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  X,
  Menu,
  Building2,
  TrendingUp,
  BarChart3,
  Handshake,
  Landmark,
  FileCheck2,
  Globe,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Train,
  Building,
  Cpu,
  Instagram,
  Trophy,
  Award,
  Check,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Phone,
        Mail,
        MapPin,
        ChevronDown,
        X,
        Menu,
        Building2,
        TrendingUp,
        BarChart3,
        Handshake,
        Landmark,
        FileCheck2,
        Globe,
        Quote,
        ChevronLeft,
        ChevronRight,
        MessageCircle,
        CheckCircle2,
        Train,
        Building,
        Cpu,
        Instagram,
        Trophy,
        Award,
        Check,
      })
    ),
  ],
};
