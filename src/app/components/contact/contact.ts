import { Component, signal } from '@angular/core';
import { ParticleBackgroundComponent } from '../particle-background/particle-background';
import { LanguageService } from '../../services/language.service';

/**
 * Contact Component
 * Contact form section with visual validation and particle background
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ParticleBackgroundComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class ContactComponent {
  protected readonly formData = signal({
    name: '',
    email: '',
    message: '',
  });

  constructor(protected readonly languageService: LanguageService) {}
}
