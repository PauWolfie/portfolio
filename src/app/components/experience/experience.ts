import { Component, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';

/**
 * Experience Component
 * Work experience section with vertical timeline
 * Placeholder mode - wireframe visualization
 */
@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.html',
  styleUrls: ['./experience.scss'],
})
export class ExperienceComponent {
  constructor(public languageService: LanguageService) {}

  protected readonly experiences = computed(() => {
    const t = this.languageService.t().experience.items;
    return [
      {
        id: 1,
        role: t[0].role,
        company: t[0].company,
        period: `${t[0].period} - ${this.languageService.t().experience.present}`,
        description: t[0].description,
      },
      {
        id: 2,
        role: t[1].role,
        company: t[1].company,
        period: t[1].period,
        description: t[1].description,
      },
      {
        id: 3,
        role: t[2].role,
        company: t[2].company,
        period: t[2].period,
        description: t[2].description,
      },
    ];
  });
}
