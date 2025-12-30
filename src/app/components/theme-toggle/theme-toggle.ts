import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

/**
 * Theme Toggle Component
 * Modern switch to toggle between light and dark modes
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.scss'],
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
