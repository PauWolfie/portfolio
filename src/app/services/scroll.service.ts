import { Injectable, signal, computed } from '@angular/core';

/**
 * ScrollService
 * Manages scroll state and provides scroll progress for animations
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  /** Current scroll position in pixels */
  readonly scrollY = signal(0);

  /** Scroll threshold for the profile image animation (in pixels) */
  private readonly animationThreshold = 300;

  /**
   * Progress of the profile image animation from 0 to 1
   * 0 = image is in hero position
   * 1 = image is in navbar position
   */
  readonly profileAnimationProgress = computed(() => {
    const progress = Math.min(this.scrollY() / this.animationThreshold, 1);
    return progress;
  });

  /** Whether the profile image should be visible in the navbar */
  readonly showNavbarProfile = computed(() => this.profileAnimationProgress() >= 1);

  /** Whether the profile image animation is in progress */
  readonly isAnimating = computed(() => {
    const progress = this.profileAnimationProgress();
    return progress > 0 && progress < 1;
  });

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => this.updateScroll(), { passive: true });
      this.updateScroll();
    }
  }

  private updateScroll(): void {
    this.scrollY.set(window.scrollY);
  }
}
