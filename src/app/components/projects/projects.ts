import { Component, computed } from '@angular/core';
import { ParticleBackgroundComponent } from '../particle-background/particle-background';
import { LanguageService } from '../../services/language.service';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  images: {
    desktop: string;
    tablet: string;
    smartphone: string;
  };
  liveUrl?: string;
  repoUrl?: string;
}

/**
 * Projects Component
 * Premium project showcase with responsive device mockups
 * Features staggered animations and interactive hover effects
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ParticleBackgroundComponent],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class ProjectsComponent {
  protected activeProject: number | null = null;

  constructor(protected readonly languageService: LanguageService) {}

  protected readonly projects = computed(() => {
    const t = this.languageService.t().projects.items;
    return [
      {
        id: 1,
        title: t[0].title,
        category: t[0].category,
        description: t[0].description,
        technologies: ['React', 'Tailwind CSS', 'Next.js', 'Firestore'],
        images: {
          desktop: 'assets/imgs/Grindrack_desktop.png',
          tablet: 'assets/imgs/Grindrack_tablet.png',
          smartphone: 'assets/imgs/Grindrack_smartphone.png',
        },
        liveUrl: 'https://grindrack.pauwolfie.dev/',
        repoUrl: 'https://github.com/PauWolfie/grindrack',
      },
      // Añade más proyectos aquí cuando los tengas
    ];
  });

  setActiveProject(id: number): void {
    this.activeProject = id;
  }

  resetActiveProject(): void {
    this.activeProject = null;
  }
}
