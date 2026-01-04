import { Component } from '@angular/core';

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
  protected readonly experiences = [
    {
      id: 1,
      role: 'Enginyer I+D',
      company: 'Mychef Technologies',
      period: 'oct. 2023 - Actualitat',
      description: 'Desplegament i desenvolupament de Mychef Cloud. Disseny i implementació de diverses aplicacións de gestió interna.',
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Mychef Technologies',
      period: 'ene. 2023 - oct. 2023',
      description: 'Creació de la plataforma cloud per la conexió dels diferents dispositius de Mychef.',
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'Mychef Technologies',
      period: 'ago. 2022 - ene.2023',
      description: 'Programador en pràctiques. Creació d\'un sistema per al control de versions documental automàtic basat en aprovacions.',
    },
  ];
}
