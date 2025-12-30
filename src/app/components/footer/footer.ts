import { Component } from '@angular/core';

/**
 * Footer Component
 * Site footer with social links and copyright
 * Placeholder mode - wireframe visualization
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly socialLinks = [
    { name: 'GitHub', href: '#', icon: 'github' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
  ];
}
