# Garima Realty - Angular Application

This is the Angular conversion of the Garima Realty website, originally built with React + Vite.

## Project Structure

- **Components**: All page sections and UI components are in `src/app/components/`
- **Pages**: Main pages (Home, NotFound) are in `src/app/pages/`
- **Directives**: Custom directives (scroll detection) are in `src/app/directives/`
- **Styles**: Global styles and Tailwind configuration in `src/styles.css` and `tailwind.config.js`

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Assets**
   - Copy the following image files to `src/assets/`:
     - `logo-full.jpg` - Full logo for navbar and footer
     - `logo-gr.jpg` - GR logo for hero section
     - `hero-pune.jpg` - Hero background image
   - These images are referenced in:
     - NavbarComponent
     - FooterComponent
     - HeroSectionComponent

3. **Run Development Server**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:4200`

4. **Build for Production**
   ```bash
   npm run build
   ```

## Key Features

- ✅ Fully converted from React to Angular (standalone components)
- ✅ Tailwind CSS styling maintained
- ✅ Angular Animations (replacing framer-motion)
- ✅ Responsive design
- ✅ Scroll-triggered animations using IntersectionObserver
- ✅ Form handling with Angular Forms
- ✅ Routing configured

## Components

### Page Sections
- NavbarComponent - Navigation with mobile menu
- HeroSectionComponent - Hero section with call-to-action
- AboutSectionComponent - About section with stats
- PresenceSectionComponent - Multi-city presence
- ServicesSectionComponent - Services grid
- ProjectsSectionComponent - Featured properties
- WhyPuneSectionComponent - Investment reasons
- WhyChooseSectionComponent - Trust factors
- FoundersSectionComponent - Founders' profiles
- TestimonialsSectionComponent - Client testimonials carousel
- FAQSectionComponent - Accordion FAQ
- ContactSectionComponent - Contact form
- FooterComponent - Footer with links
- WhatsAppButtonComponent - Floating WhatsApp button

### UI Components
- ButtonComponent - Reusable button with variants
- BadgeComponent - Badge component
- InputComponent - Form input with validation
- AccordionComponent - Accordion for FAQ

## Technologies Used

- Angular 21
- TypeScript
- Tailwind CSS
- Lucide Angular (icons)
- Angular Animations
- RxJS

## Notes

- All animations use Angular's animation API instead of framer-motion
- Components use standalone architecture (Angular 21)
- Path aliases configured (`@/*` maps to `src/*`)
- Tailwind CSS configuration matches original design system
