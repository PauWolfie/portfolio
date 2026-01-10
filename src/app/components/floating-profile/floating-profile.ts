import { Component, computed, inject, AfterViewInit, OnDestroy, signal, HostListener } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

/**
 * Floating Profile Component
 * A profile image that animates from the hero section to the navbar on scroll
 * Uses scroll-based interpolation for smooth resize and position animation
 */
@Component({
  selector: 'app-floating-profile',
  standalone: true,
  template: `
    <div 
      class="floating-profile"
      [style.top.px]="currentTop()"
      [style.left.px]="currentLeft()"
      [style.width.px]="currentSize()"
      [style.height.px]="currentSize()"
    >
      <img 
        src="assets/imgs/profileImgTransparent.png" 
        alt="Pau Llobet" 
        class="floating-profile__img"
      />
    </div>
  `,
  styles: [`
    .floating-profile {
      position: fixed;
      z-index: 1000;
      pointer-events: none;
      will-change: top, left, width, height;
    }

    .floating-profile__img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      background-color: var(--color-bg);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      transition: background-color var(--transition-theme);
    }
  `]
})
export class FloatingProfileComponent implements AfterViewInit, OnDestroy {
  private scrollService = inject(ScrollService);

  // Responsive positions - will be calculated
  private heroTop = signal(0);
  private heroLeft = signal(0);
  private heroSize = signal(160);

  // Navbar position and size (ending point)
  private navbarTop = signal(0);
  private navbarLeft = signal(0);
  private readonly navbarSize = 40;

  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    // Calculate positions after view is ready
    setTimeout(() => this.calculatePositions(), 100);
    
    // Listen for resize
    if (typeof window !== 'undefined' && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.calculatePositions());
      this.resizeObserver.observe(document.body);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculatePositions();
  }

  private calculatePositions(): void {
    // Find the hero placeholder
    const heroPlaceholder = document.querySelector('.hero__profile-placeholder');
    const navbarPlaceholder = document.querySelector('.navbar__logo-placeholder');
    
    if (heroPlaceholder) {
      const rect = heroPlaceholder.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Get the absolute position (accounting for current scroll)
      this.heroTop.set(rect.top + scrollY);
      this.heroLeft.set(rect.left);
      this.heroSize.set(rect.width);
    }

    if (navbarPlaceholder) {
      const rect = navbarPlaceholder.getBoundingClientRect();
      this.navbarTop.set(rect.top);
      this.navbarLeft.set(rect.left);
    }
  }

  // Calculate current values based on scroll progress
  readonly progress = computed(() => this.scrollService.profileAnimationProgress());

  readonly currentTop = computed(() => {
    const p = this.progress();
    const scrollY = this.scrollService.scrollY();
    
    // Hero position needs to be adjusted for scroll (it's absolute in document)
    // Navbar position is fixed
    const heroTopAbsolute = this.heroTop() - scrollY;
    const navTop = this.navbarTop();
    
    return heroTopAbsolute + (navTop - heroTopAbsolute) * p;
  });

  readonly currentLeft = computed(() => {
    const p = this.progress();
    return this.heroLeft() + (this.navbarLeft() - this.heroLeft()) * p;
  });

  readonly currentSize = computed(() => {
    const p = this.progress();
    return this.heroSize() + (this.navbarSize - this.heroSize()) * p;
  });
}
