import { Component, signal, HostListener } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

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

  protected readonly navLinks = [
    { label: 'Inici', href: '#inici' },
    { label: 'Tecnologies', href: '#tecnologies' },
    { label: 'Projectes', href: '#projectes' },
    { label: 'Experiència', href: '#experiencia' },
    { label: 'Contacte', href: '#contacte' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
