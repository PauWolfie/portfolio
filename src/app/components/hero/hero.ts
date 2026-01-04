import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { ParticleBackgroundComponent } from '../particle-background/particle-background';
import { LanguageService } from '../../services/language.service';

/**
 * Hero Component
 * Main hero section with interactive particle background and typewriter effect
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleBackgroundComponent],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  constructor(protected readonly languageService: LanguageService) {
    effect(() => {
      // Restart typewriter when language changes
      this.languageService.currentLang(); // dependency
      this.currentPhraseIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
      this.startTypewriter();
    });
  }

  /** Current displayed text */
  displayedText = signal<string>('');
  
  /** Show cursor */
  showCursor = signal<boolean>(true);

  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typewriterTimeout: ReturnType<typeof setTimeout> | null = null;
  private cursorInterval: ReturnType<typeof setInterval> | null = null;

  /** Typing speed in milliseconds */
  private readonly typeSpeed = 50;
  /** Deleting speed in milliseconds */
  private readonly deleteSpeed = 30;
  /** Pause before starting to delete */
  private readonly pauseBeforeDelete = 2000;
  /** Pause before typing next phrase */
  private readonly pauseBeforeType = 500;

  ngOnInit(): void {
    this.startTypewriter();
    this.startCursorBlink();
  }

  ngOnDestroy(): void {
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
    }
    if (this.cursorInterval) {
      clearInterval(this.cursorInterval);
    }
  }

  private startCursorBlink(): void {
    this.cursorInterval = setInterval(() => {
      this.showCursor.update(v => !v);
    }, 530);
  }

  private startTypewriter(): void {
    const phrases = this.languageService.t().hero.phrases;
    const currentPhrase = phrases[this.currentPhraseIndex];

    if (this.isDeleting) {
      // Deleting characters
      if (this.currentCharIndex > 0) {
        this.currentCharIndex--;
        this.displayedText.set(currentPhrase.substring(0, this.currentCharIndex));
        this.typewriterTimeout = setTimeout(() => this.startTypewriter(), this.deleteSpeed);
      } else {
        // Finished deleting, move to next phrase
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % phrases.length;
        this.typewriterTimeout = setTimeout(() => this.startTypewriter(), this.pauseBeforeType);
      }
    } else {
      // Typing characters
      if (this.currentCharIndex < currentPhrase.length) {
        this.currentCharIndex++;
        this.displayedText.set(currentPhrase.substring(0, this.currentCharIndex));
        this.typewriterTimeout = setTimeout(() => this.startTypewriter(), this.typeSpeed);
      } else {
        // Finished typing, wait then start deleting
        this.isDeleting = true;
        this.typewriterTimeout = setTimeout(() => this.startTypewriter(), this.pauseBeforeDelete);
      }
    }
  }
}
