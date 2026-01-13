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
  singleImage?: string;
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
      {
        id: 2,
        title: t[1].title,
        category: t[1].category,
        description: t[1].description,
        technologies: ['Python', 'Machine Learning', 'Langchain', 'Google Cloud', 'Vertex AI'],
        images: {
          desktop: 'assets/imgs/placeholder_desktop.png',
          tablet: 'assets/imgs/placeholder_tablet.png',
          smartphone: 'assets/imgs/placeholder_smartphone.png',
        },
        singleImage: 'assets/imgs/RAG.png',
        liveUrl: 'https://repositori.udl.cat/items/2491f3e9-aa59-482e-a015-582d73bdae97',
        repoUrl: 'https://github.com/PauWolfie/RAG-system',
      },
      {
        id: 3,
        title: t[2].title,
        category: t[2].category,
        description: t[2].description,
        technologies: [
          'Java',
          'Springboot',
          'Google Cloud',
          'Docker',
          'Artifact Registry',
          'Compute Engine',
        ],
        images: {
          desktop: 'assets/imgs/placeholder_desktop.png',
          tablet: 'assets/imgs/placeholder_tablet.png',
          smartphone: 'assets/imgs/placeholder_smartphone.png',
        },
        singleImage: 'assets/imgs/API.png',
        liveUrl: 'https://repositori.udl.cat/items/818baa19-4024-41be-b84b-b8bfc24f0127',
        repoUrl: 'https://api.mychef-cloud.com/',
      },
    ];
  });

  setActiveProject(id: number): void {
    this.activeProject = id;
  }

  resetActiveProject(): void {
    this.activeProject = null;
  }
}
