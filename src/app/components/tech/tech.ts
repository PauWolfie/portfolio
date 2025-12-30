import { Component } from '@angular/core';

/**
 * Tech Component
 * Technology stack section with marquee/grid layout
 * Placeholder mode - wireframe visualization
 */
@Component({
  selector: 'app-tech',
  standalone: true,
  templateUrl: './tech.html',
  styleUrls: ['./tech.scss'],
})
export class TechComponent {
  protected readonly technologies = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'SCSS',
    'HTML5',
    'CSS3',
    'RxJS',
    'Node.js',
    'Git',
    'Figma',
  ];
}
