import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

/**
 * Theme Service
 * Manages theme state with browser auto-detection and manual override
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';

  // Current theme preference (light, dark, or system)
  readonly themePreference = signal<Theme>(this.getStoredTheme());

  // Actual resolved theme (light or dark)
  readonly resolvedTheme = signal<'light' | 'dark'>(this.getResolvedTheme());

  constructor() {
    // Apply theme on initialization
    this.applyTheme();

    // React to theme changes
    effect(() => {
      const preference = this.themePreference();
      this.applyTheme();
      this.storeTheme(preference);
    });

    // Listen for system theme changes
    this.listenToSystemThemeChanges();
  }

  /**
   * Toggle between light and dark modes
   */
  toggleTheme(): void {
    const current = this.resolvedTheme();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.themePreference.set(newTheme);
  }

  /**
   * Set specific theme preference
   */
  setTheme(theme: Theme): void {
    this.themePreference.set(theme);
  }

  private getStoredTheme(): Theme {
    if (typeof localStorage === 'undefined') return 'system';
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return (stored as Theme) || 'system';
  }

  private storeTheme(theme: Theme): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  private getResolvedTheme(): 'light' | 'dark' {
    const preference = this.themePreference();

    if (preference === 'system') {
      return this.getSystemTheme();
    }

    return preference;
  }

  private getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private applyTheme(): void {
    if (typeof document === 'undefined') return;

    const preference = this.themePreference();
    const resolved = this.getResolvedTheme();
    this.resolvedTheme.set(resolved);

    const root = document.documentElement;

    if (preference === 'system') {
      // Remove manual override, let CSS media query handle it
      root.removeAttribute('data-theme');
    } else {
      // Apply manual theme override
      root.setAttribute('data-theme', preference);
    }
  }

  private listenToSystemThemeChanges(): void {
    if (typeof window === 'undefined') return;

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        // Only update if using system preference
        if (this.themePreference() === 'system') {
          this.resolvedTheme.set(this.getSystemTheme());
        }
      });
  }
}
