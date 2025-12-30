import { Component, signal } from '@angular/core';

/**
 * Contact Component
 * Contact form section with visual validation
 * Placeholder mode - wireframe visualization
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class ContactComponent {
  protected readonly formData = signal({
    name: '',
    email: '',
    message: '',
  });
}
