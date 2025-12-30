import { Component } from '@angular/core';

/**
 * Projects Component
 * Project showcase section with grid cards
 * Placeholder mode - wireframe visualization
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class ProjectsComponent {
  protected readonly projects = [
    { id: 1, title: 'Projecte 1', category: 'Web App' },
    { id: 2, title: 'Projecte 2', category: 'Mobile' },
    { id: 3, title: 'Projecte 3', category: 'UI/UX' },
    { id: 4, title: 'Projecte 4', category: 'Web App' },
  ];
}
