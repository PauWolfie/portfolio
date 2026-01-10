import { Component, AfterViewInit, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';

declare const lucide: any;

/**
 * Credentials Component
 * Education and certifications section
 */
@Component({
  selector: 'app-credentials',
  standalone: true,
  templateUrl: './credentials.html',
  styleUrls: ['./credentials.scss'],
})
export class CredentialsComponent implements AfterViewInit {
  constructor(public languageService: LanguageService) {}

  protected readonly education = computed(() => this.languageService.t().credentials.education);
  protected readonly certifications = computed(() => this.languageService.t().credentials.certifications);

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 100);
    }
  }
}
