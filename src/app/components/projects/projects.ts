import { Component } from '@angular/core';
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
      category: 'Progressive Web App',
      description: 'Grindrack és una aplicació de gestió integral del rendiment físic que combina el seguiment de l\'evolució antropomètrica amb un registre tècnic d\'entrenaments, permetent analitzar històrics de volum, sèries i repeticions. L\'aplicació es diferencia per la integració de tecnologia d\'Intel·ligència Artificial en el seu mòdul nutricional, utilitzant reconeixement d\'imatge i processament de llenguatge natural per automatitzar l\'extracció i càlcul de calories i macronutrients a l\'instant.',
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

  setActiveProject(id: number): void {
    this.activeProject = id;
  }

  resetActiveProject(): void {
    this.activeProject = null;
  }
}
