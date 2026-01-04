import { Component, HostListener } from '@angular/core';
import { ParticleBackgroundComponent } from '../particle-background/particle-background';

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

  protected readonly projects: Project[] = [
    {
      id: 1,
      title: 'Grindrack',
      category: 'Web App',
      description: 'Plataforma innovadora amb un disseny modern i funcionalitats avançades. Desenvolupada amb les últimes tecnologies per oferir una experiència d\'usuari excepcional.',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Node.js'],
      images: {
        desktop: 'assets/imgs/Grindrack_desktop.png',
        tablet: 'assets/imgs/Grindrack_tablet.png',
        smartphone: 'assets/imgs/Grindrack_smartphone.png',
      },
      liveUrl: '#',
      repoUrl: '#',
    },
    // Añade más proyectos aquí cuando los tengas
  ];

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const cards = document.querySelectorAll('.projects__card');
    cards.forEach((card) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
    });
  }

  setActiveProject(id: number): void {
    this.activeProject = id;
  }

  resetActiveProject(): void {
    this.activeProject = null;
  }
}
