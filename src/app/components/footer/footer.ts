import { Component, AfterViewInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

declare const lucide: any;

/**
 * Footer Component
 * Site footer with social links and copyright
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent implements AfterViewInit {
  protected readonly currentYear = new Date().getFullYear();

  constructor(protected readonly languageService: LanguageService) {}

  protected readonly socialLinks = [
    { name: 'GitHub', href: 'https://github.com/PauWolfie', icon: 'github' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pau-llobet-67767226a/', icon: 'linkedin' },
  ];

  ngAfterViewInit(): void {
    // Initialize Lucide icons after view is ready
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 100);
    }
  }
}
