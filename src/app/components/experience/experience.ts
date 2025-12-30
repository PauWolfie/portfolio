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
      role: '[Rol 1]',
      company: '[Empresa 1]',
      period: '2023 - Present',
      description: '[Descripció de les tasques i responsabilitats]',
    },
    {
      id: 2,
      role: '[Rol 2]',
      company: '[Empresa 2]',
      period: '2021 - 2023',
      description: '[Descripció de les tasques i responsabilitats]',
    },
    {
      id: 3,
      role: '[Rol 3]',
      company: '[Empresa 3]',
      period: '2019 - 2021',
      description: '[Descripció de les tasques i responsabilitats]',
    },
  ];
}
