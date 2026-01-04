import { Component, AfterViewInit, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';

declare const lucide: any;

/**
 * Tech Component
 * Technology stack section with categories and strengths
 */
@Component({
  selector: 'app-tech',
  standalone: true,
  templateUrl: './tech.html',
  styleUrls: ['./tech.scss'],
})
export class TechComponent {
  constructor(public languageService: LanguageService) {}

  protected readonly categories = computed(() => {
    const t = this.languageService.t().tech.categories;
    return [
      {
        title: t.frontend.title,
        icon: 'palette',
        items: t.frontend.items,
      },
      {
        title: t.backend.title,
        icon: 'server',
        items: t.backend.items,
      },
      {
        title: t.cloud.title,
        icon: 'cloud',
        items: t.cloud.items,
      },
      {
        title: t.ai.title,
        icon: 'brain',
        items: t.ai.items,
      },
      {
        title: t.quality.title,
        icon: 'shield-check',
        items: t.quality.items,
      },
    ];
  });

  protected readonly strengths = computed(() => {
    const t = this.languageService.t().tech.strengths.items;
    return [
      {
        icon: 'refresh-cw',
        title: t[0].title,
        description: t[0].description,
      },
      {
        icon: 'building-2',
        title: t[1].title,
        description: t[1].description,
      },
      {
        icon: 'sparkles',
        title: t[2].title,
        description: t[2].description,
      },
    ];
  });

  // For the marquee animation - using Devicon classes
  protected readonly marqueeItems = [
    { name: 'Angular', icon: 'devicon-angular-plain' },
    { name: 'React', icon: 'devicon-react-original' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'Spring', icon: 'devicon-spring-original' },
    { name: 'C#', icon: 'devicon-csharp-plain' },
    { name: 'Docker', icon: 'devicon-docker-plain' },
    { name: 'GCP', icon: 'devicon-googlecloud-plain' },
    { name: 'Firebase', icon: 'devicon-firebase-plain' },
    { name: 'Git', icon: 'devicon-git-plain' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-original' },
    { name: 'SASS', icon: 'devicon-sass-original' },
    { name: 'HTML5', icon: 'devicon-html5-plain' },
    { name: 'CSS3', icon: 'devicon-css3-plain' },
    { name: 'RxJS', icon: 'devicon-rxjs-plain' },
    { name: 'Python', icon: 'devicon-python-plain' },
    { name: 'Jupyter', icon: 'devicon-jupyter-plain' },
    { name: 'Linux', icon: 'devicon-linux-plain' },
    { name: '.NET/ASP.NET', icon: 'devicon-dotnetcore-plain' },
    { name: 'SQL', icon: 'devicon-mysql-plain' },
    { name: 'Figma', icon: 'devicon-figma-plain' },
    { name: 'MCP Server', icon: 'devicon-bash-plain' },
  ];

  ngAfterViewInit() {
    // Initialize Lucide icons after view is ready
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 100);
    }
  }
}
