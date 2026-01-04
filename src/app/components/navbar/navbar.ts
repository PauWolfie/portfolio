import { Component, signal, HostListener, computed } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { LanguageService } from '../../services/language.service';

/**
 * Navbar Component
 * Sticky navigation with blur effect on scroll
 * Links: Inici, Sobre mi, Tecnologies, Projectes, Experiència, Contacte
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  protected readonly isScrolled = signal(false);
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly isLangMenuOpen = signal(false);

  protected readonly languages = [
    { code: 'ca', label: 'Català', flag: 'assets/flags/ca.svg' }, // Assuming no flags yet, just text is fine
    { code: 'es', label: 'Castellano', flag: 'assets/flags/es.svg' },
    { code: 'en', label: 'English', flag: 'assets/flags/en.svg' },
  ] as const;

  protected readonly navLinks = computed(() => [
    { label: this.languageService.t().navbar.home, href: '#inici' },
    { label: this.languageService.t().navbar.technologies, href: '#tecnologies' },
    { label: this.languageService.t().navbar.projects, href: '#projectes' },
    { label: this.languageService.t().navbar.experience, href: '#experiencia' },
    { label: this.languageService.t().navbar.contact, href: '#contacte' },
  ]);

  constructor(protected readonly languageService: LanguageService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar__lang-wrapper')) {
      this.isLangMenuOpen.set(false);
    }
  }

  protected toggleLangMenu(): void {
    this.isLangMenuOpen.update((v) => !v);
  }

  protected changeLanguage(lang: 'ca' | 'es' | 'en'): void {
    this.languageService.setLanguage(lang);
    this.isLangMenuOpen.set(false);
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
