import { Component } from '@angular/core';
import { ParticleBackgroundComponent } from '../particle-background/particle-background';

/**
 * Hero Component
 * Main hero section with interactive particle background
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleBackgroundComponent],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent {}
