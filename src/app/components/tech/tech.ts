import { Component, AfterViewInit } from '@angular/core';

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
  protected readonly categories = [
    {
      title: 'Desenvolupament Frontend',
      icon: 'palette',
      items: [
        { label: 'Core', techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'] },
        { label: 'Frameworks', techs: ['Angular (v16 a v18+)', 'Standalone Components', 'RxJS'] },
        { label: 'Arquitectura', techs: ['PWA', 'Disseny Responsive', 'Gestió d\'estat'] },
        { label: 'Estils', techs: ['SASS/SCSS', 'Preprocessadors CSS'] },
      ],
    },
    {
      title: 'Desenvolupament Backend',
      icon: 'server',
      items: [
        { label: 'Llenguatges', techs: ['Java', 'C#'] },
        { label: 'Frameworks', techs: ['Spring Boot', 'Spring Security', 'ASP.NET'] },
        { label: 'Arquitectura', techs: ['Hexagonal', 'REST APIs', 'WebSockets (IoT)'] },
        { label: 'Integracions', techs: ['Salesforce', 'OAuth 2.0', 'JWT'] },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'cloud',
      items: [
        { label: 'GCP', techs: ['Compute Engine', 'Cloud Functions', 'BigQuery', 'Artifact Registry'] },
        { label: 'Firebase', techs: ['Hosting', 'Firestore DB'] },
        { label: 'Contenidors', techs: ['Docker', 'Linux Embedded'] },
        { label: 'CI/CD', techs: ['Git Flow', 'Gestió de branques'] },
      ],
    },
    {
      title: 'IA & Dades',
      icon: 'brain',
      items: [
        { label: 'IA', techs: ['RAG (Retrieval-Augmented Generation)', 'Chatbots'] },
        { label: 'Visió per Computador', techs: ['Reconeixement d\'imatges'] },
        { label: 'Bases de Dades', techs: ['NoSQL (Firestore)', 'BigQuery'] },
      ],
    },
    {
      title: 'Qualitat & Seguretat',
      icon: 'shield-check',
      items: [
        { label: 'Seguretat', techs: ['OAuth 2.0', 'JWT dinàmics', 'Auditoria'] },
        { label: 'Testing', techs: ['JUnit', 'Mockito', 'E2E'] },
        { label: 'Optimització', techs: ['Refactoring', 'Performance Tuning'] },
      ],
    },
  ];

  protected readonly strengths = [
    {
      icon: 'refresh-cw',
      title: 'Migració i Modernització',
      description: 'Angular v16 a v18, CSS a SCSS. Maduresa tècnica en actualització de projectes.',
    },
    {
      icon: 'building-2',
      title: 'Arquitectura Sòlida',
      description: 'Hexagonal, MVC, codi desacoblat i mantenible per a entorns corporatius.',
    },
    {
      icon: 'sparkles',
      title: 'Integració d\'IA',
      description: 'Experiència pràctica integrant LLMs i Chatbots en aplicacions empresarials.',
    },
  ];

  // For the marquee animation
  protected readonly marqueeItems = [
    'Angular', 'TypeScript', 'Java', 'Spring Boot', 'Docker',
    'GCP', 'Firebase', 'RxJS', 'SCSS', 'Git',
  ];

  ngAfterViewInit() {
    // Initialize Lucide icons after view is ready
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 100);
    }
  }
}
