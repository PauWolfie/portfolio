import { Injectable, signal, effect, computed } from '@angular/core';

export type Language = 'ca' | 'en' | 'es';

export interface Translations {
  navbar: {
    home: string;
    technologies: string;
    projects: string;
    experience: string;
    contact: string;
    theme: string;
    language: string;
  };
  hero: {
    subtitle: string;
    phrases: string[];
    contact: string;
    viewProjects: string;
  };
  tech: {
    title: string;
    subtitle: string;
    categories: {
      frontend: { title: string; items: { label: string; techs: string[] }[] };
      backend: { title: string; items: { label: string; techs: string[] }[] };
      cloud: { title: string; items: { label: string; techs: string[] }[] };
      ai: { title: string; items: { label: string; techs: string[] }[] };
      quality: { title: string; items: { label: string; techs: string[] }[] };
    };
    strengths: {
      title: string;
      items: { title: string; description: string }[];
    };
  };
  projects: {
    title: string;
    subtitle: string;
    viewMore: string;
    sourceCode: string;
    items: {
      id: number;
      title: string;
      category: string;
      description: string;
    }[];
  };
  experience: {
    title: string;
    subtitle: string;
    present: string; // for 'Actualitat'
    items: {
      id: number;
      role: string;
      company: string;
      period: string; // Note: periods might need specific handling if they contain month names
      description: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    aboutMeTitle: string;
    aboutMeText: string;
    infoTitle: string;
    infoText: string;
    sendEmail: string;
    whatsapp: string;
  };
  credentials: {
    title: string;
    subtitle: string;
    education: {
      title: string;
      items: {
        id: number;
        degree: string;
        institution: string;
      }[];
    };
    certifications: {
      title: string;
      items: {
        id: number;
        name: string;
        issuer: string;
        link?: string;
      }[];
    };
  };
  footer: {
    copyright: string;
  };
}

const translationsCa: Translations = {
  // ... (keep existing CA translations)
  navbar: {
    home: 'Inici',
    technologies: 'Tecnologies',
    projects: 'Projectes',
    experience: 'Experiència',
    contact: 'Contacte',
    theme: 'Tema',
    language: 'Idioma',
  },
  hero: {
    subtitle: 'Enginyer Software',
    phrases: [
      'Creant solucions escalables i robustes',
      'Desenvolupant APIs eficients i segures',
      "Optimitzant rendiment i experiència d'usuari",
      'Dissenyant arquitectures netes i mantenibles',
      'Automatitzant processos i fluxos de treball',
      'Integrant sistemes i serveis al núvol',
      'Implementant tests i CI/CD pipelines',
    ],
    contact: 'Contacte',
    viewProjects: 'Veure projectes',
  },
  tech: {
    title: 'Tecnologies',
    subtitle: 'Les eines que utilitzo per crear experiències digitals',
    categories: {
      frontend: {
        title: 'Desenvolupament Frontend',
        items: [
          { label: 'Core', techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'] },
          {
            label: 'Frameworks',
            techs: ['Angular', 'React', 'Next.js', 'Standalone Components', 'RxJS'],
          },
          { label: 'Arquitectura', techs: ['PWA', 'Disseny Responsive', "Gestió d'estat"] },
          { label: 'Estils', techs: ['SASS/SCSS', 'Tailwind CSS', 'Preprocessadors CSS'] },
        ],
      },
      backend: {
        title: 'Desenvolupament Backend',
        items: [
          { label: 'Llenguatges', techs: ['Java', 'C#'] },
          { label: 'Frameworks', techs: ['Spring Boot', 'Spring Security', 'ASP.NET'] },
          { label: 'Arquitectura', techs: ['Hexagonal', 'MVC', 'REST APIs', 'WebSockets (IoT)'] },
          { label: 'Integracions', techs: ['Salesforce', 'OAuth 2.0', 'JWT'] },
        ],
      },
      cloud: {
        title: 'Cloud & DevOps',
        items: [
          {
            label: 'GCP',
            techs: ['Compute Engine', 'Cloud Functions', 'BigQuery', 'Artifact Registry'],
          },
          { label: 'Firebase', techs: ['Hosting', 'Firestore DB'] },
          { label: 'Contenidors', techs: ['Docker', 'Linux Embedded'] },
          { label: 'CI/CD', techs: ['Git Flow', 'Gestió de branques'] },
        ],
      },
      ai: {
        title: 'IA & Dades',
        items: [
          { label: 'IA', techs: ['RAG (Retrieval-Augmented Generation)', 'Chatbots'] },
          { label: 'Visió per Computador', techs: ["Reconeixement d'imatges"] },
          { label: 'Bases de Dades', techs: ['NoSQL (Firestore)', 'BigQuery'] },
        ],
      },
      quality: {
        title: 'Qualitat & Seguretat',
        items: [
          { label: 'Seguretat', techs: ['OAuth 2.0', 'JWT dinàmics', 'Auditoria'] },
          { label: 'Testing', techs: ['JUnit', 'Mockito', 'E2E'] },
          { label: 'Optimització', techs: ['Refactoring', 'Performance Tuning'] },
        ],
      },
    },
    strengths: {
      title: 'El meu enfocament',
      items: [
        {
          title: 'Migració i Modernització',
          description:
            'Angular v16 a v18, CSS a SCSS. Maduresa tècnica en actualització de projectes.',
        },
        {
          title: 'Arquitectura Sòlida',
          description: 'Hexagonal, MVC, codi desacoblat i mantenible per a entorns corporatius.',
        },
        {
          title: "Integració d'IA",
          description:
            'Experiència pràctica integrant LLMs i Chatbots en aplicacions empresarials.',
        },
      ],
    },
  },
  projects: {
    title: 'Projectes',
    subtitle: 'Una selecció dels meus treballs recents',
    viewMore: 'Veure més',
    sourceCode: 'Codi Font',
    items: [
      {
        id: 1,
        title: 'Grindrack',
        category: 'Progressive Web App',
        description:
          "Grindrack és una aplicació de gestió integral del rendiment físic que combina el seguiment de l'evolució antropomètrica amb un registre tècnic d'entrenaments, permetent analitzar històrics de volum, sèries i repeticions. L'aplicació es diferencia per la integració de tecnologia d'Intel·ligència Artificial en el seu mòdul nutricional, utilitzant reconeixement d'imatge i processament de llenguatge natural per automatitzar l'extracció i càlcul de calories i macronutrients a l'instant.",
      },
    ],
  },
  experience: {
    title: 'Experiència',
    subtitle: 'La meva trajectòria professional',
    present: 'Actualitat',
    items: [
      {
        id: 1,
        role: 'Enginyer I+D',
        company: 'Mychef Technologies',
        period: 'oct. 2023',
        description:
          'Desplegament i desenvolupament de Mychef Cloud. Disseny i implementació de diverses aplicacións de gestió interna.',
      },
      {
        id: 2,
        role: 'Full Stack Developer',
        company: 'Mychef Technologies',
        period: 'ene. 2023 - oct. 2023',
        description:
          'Creació de la plataforma cloud per la conexió dels diferents dispositius de Mychef.',
      },
      {
        id: 3,
        role: 'Frontend Developer',
        company: 'Mychef Technologies',
        period: 'ago. 2022 - ene. 2023',
        description:
          "Programador en pràctiques. Creació d'un sistema per al control de versions documental automàtic basat en aprovacions.",
      },
    ],
  },
  contact: {
    title: 'Contacte',
    subtitle: 'Tens un projecte en ment? Parlem!',
    aboutMeTitle: 'Sobre mi',
    aboutMeText:
      "Més enllà del codi, sóc un apassionat de l'esport, la nautura i la tranquilitat. M'encanta la cuina i experimentar amb noves receptes saludables. També disfruto del creixement personal, els videojocs i passar temps amb amics. Crec fermament en l'equilibri entre la vida professional i personal, i sempre busco maneres de millorar i créixer tant a nivell tècnic com personal.",
    infoTitle: 'Posem-nos en contacte!',
    infoText:
      'Estic disponible per a projectes, col·laboracions o simplement per parlar sobre tecnologia i desenvolupament web!',
    sendEmail: 'Enviar correu',
    whatsapp: 'WhatsApp',
  },
  credentials: {
    title: 'Formació i Certificacions',
    subtitle: 'La meva formació acadèmica i certificacions professionals',
    education: {
      title: 'Formació Acadèmica',
      items: [
        {
          id: 1,
          degree: 'Màster Oficial en Enginyeria Informàtica',
          institution: 'Universitat Autònoma de Barcelona',
        },
        {
          id: 2,
          degree: 'Grau en Enginyeria Informàtica',
          institution: 'Universitat Autònoma de Barcelona',
        },
      ],
    },
    certifications: {
      title: 'Certificacions',
      items: [
        {
          id: 1,
          name: 'Claude Code in Action',
          issuer: 'Anthropic',
          link: 'https://verify.skilljar.com/c/o7hz6vsq4tdn',
        },
        {
          id: 2,
          name: "Certificat B2 d'Anglès",
          issuer: 'Cambridge English',
          link: 'assets/docs/b2.pdf',
        },
      ],
    },
  },
  footer: {
    copyright: 'Tots els drets reservats.',
  },
};

const translationsEn: Translations = {
  // ... (keep existing EN translations)
  navbar: {
    home: 'Home',
    technologies: 'Technologies',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    theme: 'Theme',
    language: 'Language',
  },
  hero: {
    subtitle: 'Software Engineer',
    phrases: [
      'Creating scalable and robust solutions',
      'Developing efficient and secure APIs',
      'Optimizing performance and user experience',
      'Designing clean and maintainable architectures',
      'Automating processes and workflows',
      'Integrating cloud systems and services',
      'Implementing tests and CI/CD pipelines',
    ],
    contact: 'Contact',
    viewProjects: 'View Projects',
  },
  tech: {
    title: 'Technologies',
    subtitle: 'The tools I use to create digital experiences',
    categories: {
      frontend: {
        title: 'Frontend Development',
        items: [
          { label: 'Core', techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'] },
          {
            label: 'Frameworks',
            techs: ['Angular', 'React', 'Next.js', 'Standalone Components', 'RxJS'],
          },
          { label: 'Architecture', techs: ['PWA', 'Responsive Design', 'State Management'] },
          { label: 'Styles', techs: ['SASS/SCSS', 'Tailwind CSS', 'CSS Preprocessors'] },
        ],
      },
      backend: {
        title: 'Backend Development',
        items: [
          { label: 'Languages', techs: ['Java', 'C#'] },
          { label: 'Frameworks', techs: ['Spring Boot', 'Spring Security', 'ASP.NET'] },
          { label: 'Architecture', techs: ['Hexagonal', 'MVC', 'REST APIs', 'WebSockets (IoT)'] },
          { label: 'Integrations', techs: ['Salesforce', 'OAuth 2.0', 'JWT'] },
        ],
      },
      cloud: {
        title: 'Cloud & DevOps',
        items: [
          {
            label: 'GCP',
            techs: ['Compute Engine', 'Cloud Functions', 'BigQuery', 'Artifact Registry'],
          },
          { label: 'Firebase', techs: ['Hosting', 'Firestore DB'] },
          { label: 'Containers', techs: ['Docker', 'Linux Embedded'] },
          { label: 'CI/CD', techs: ['Git Flow', 'Branch Management'] },
        ],
      },
      ai: {
        title: 'AI & Data',
        items: [
          { label: 'AI', techs: ['RAG (Retrieval-Augmented Generation)', 'Chatbots'] },
          { label: 'Computer Vision', techs: ['Image Recognition'] },
          { label: 'Databases', techs: ['NoSQL (Firestore)', 'BigQuery'] },
        ],
      },
      quality: {
        title: 'Quality & Security',
        items: [
          { label: 'Security', techs: ['OAuth 2.0', 'Dynamic JWT', 'Auditing'] },
          { label: 'Testing', techs: ['JUnit', 'Mockito', 'E2E'] },
          { label: 'Optimization', techs: ['Refactoring', 'Performance Tuning'] },
        ],
      },
    },
    strengths: {
      title: 'My Approach',
      items: [
        {
          title: 'Migration & Modernization',
          description: 'Angular v16 to v18, CSS to SCSS. Technical maturity in project updates.',
        },
        {
          title: 'Solid Architecture',
          description:
            'Hexagonal, MVC, decoupled and maintainable code for corporate environments.',
        },
        {
          title: 'AI Integration',
          description:
            'Practical experience integrating LLMs and Chatbots in enterprise applications.',
        },
      ],
    },
  },
  projects: {
    title: 'Projects',
    subtitle: 'A selection of my recent work',
    viewMore: 'View More',
    sourceCode: 'Source Code',
    items: [
      {
        id: 1,
        title: 'Grindrack',
        category: 'Progressive Web App',
        description:
          'Grindrack is a comprehensive physical performance management app that combines anthropometric evolution tracking with a technical training log, allowing historical analysis of volume, sets, and repetitions. The app stands out for its integration of Artificial Intelligence technology in its nutritional module, using image recognition and natural language processing to automate the extraction and calculation of calories and macronutrients instantly.',
      },
    ],
  },
  experience: {
    title: 'Experience',
    subtitle: 'My professional journey',
    present: 'Present',
    items: [
      {
        id: 1,
        role: 'R&D Engineer',
        company: 'Mychef Technologies',
        period: 'Oct 2023',
        description:
          'Deployment and development of Mychef Cloud. Design and implementation of various internal management applications.',
      },
      {
        id: 2,
        role: 'Full Stack Developer',
        company: 'Mychef Technologies',
        period: 'Jan 2023 - Oct 2023',
        description: 'Creation of the cloud platform for connecting different Mychef devices.',
      },
      {
        id: 3,
        role: 'Frontend Developer',
        company: 'Mychef Technologies',
        period: 'Aug 2022 - Jan 2023',
        description:
          'Intern Programmer. Creation of an automatic document version control system based on approvals.',
      },
    ],
  },
  contact: {
    title: 'Contact',
    subtitle: "Have a project in mind? Let's talk!",
    aboutMeTitle: 'About Me',
    aboutMeText:
      "Beyond coding, I'm passionate about fitness and nutrition. I love training, learning about physical performance, and experimenting with healthy recipes. I also enjoy electronic music, video games, and spending time with friends. I firmly believe in work-life balance and I'm always looking for ways to improve and grow both technically and personally.",
    infoTitle: 'Get in Touch!',
    infoText:
      'I am available for projects, collaborations, or simply to chat about technology and web development!',
    sendEmail: 'Send Email',
    whatsapp: 'WhatsApp',
  },
  credentials: {
    title: 'Education & Certifications',
    subtitle: 'My academic background and professional certifications',
    education: {
      title: 'Academic Education',
      items: [
        {
          id: 1,
          degree: "Master's Degree in Computer Engineering",
          institution: 'Autonomous University of Barcelona',
        },
        {
          id: 2,
          degree: "Bachelor's Degree in Computer Engineering",
          institution: 'Autonomous University of Barcelona',
        },
      ],
    },
    certifications: {
      title: 'Certifications',
      items: [
        {
          id: 1,
          name: 'Claude Code Certificate',
          issuer: 'Anthropic',
          link: 'https://www.anthropic.com',
        },
        {
          id: 2,
          name: 'B2 English Certificate',
          issuer: 'Cambridge English',
          link: 'assets/docs/b2.pdf',
        },
      ],
    },
  },
  footer: {
    copyright: 'All rights reserved.',
  },
};

const translationsEs: Translations = {
  navbar: {
    home: 'Inicio',
    technologies: 'Tecnologías',
    projects: 'Proyectos',
    experience: 'Experiencia',
    contact: 'Contacto',
    theme: 'Tema',
    language: 'Idioma',
  },
  hero: {
    subtitle: 'Ingeniero de Software',
    phrases: [
      'Creando soluciones escalables y robustas',
      'Desarrollando APIs eficientes y seguras',
      'Optimizando el rendimiento y la experiencia de usuario',
      'Diseñando arquitecturas limpias y mantenibles',
      'Automatizando procesos y flujos de trabajo',
      'Integrando sistemas y servicios en la nube',
      'Implementando tests y pipelines de CI/CD',
    ],
    contact: 'Contacto',
    viewProjects: 'Ver proyectos',
  },
  tech: {
    title: 'Tecnologías',
    subtitle: 'Las herramientas que utilizo para crear experiencias digitales',
    categories: {
      frontend: {
        title: 'Desarrollo Frontend',
        items: [
          { label: 'Core', techs: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'] },
          {
            label: 'Frameworks',
            techs: ['Angular', 'React', 'Next.js', 'Standalone Components', 'RxJS'],
          },
          { label: 'Arquitectura', techs: ['PWA', 'Diseño Responsive', 'Gestión de estado'] },
          { label: 'Estilos', techs: ['SASS/SCSS', 'Tailwind CSS', 'Preprocesadores CSS'] },
        ],
      },
      backend: {
        title: 'Desarrollo Backend',
        items: [
          { label: 'Lenguajes', techs: ['Java', 'C#'] },
          { label: 'Frameworks', techs: ['Spring Boot', 'Spring Security', 'ASP.NET'] },
          { label: 'Arquitectura', techs: ['Hexagonal', 'MVC', 'REST APIs', 'WebSockets (IoT)'] },
          { label: 'Integraciones', techs: ['Salesforce', 'OAuth 2.0', 'JWT'] },
        ],
      },
      cloud: {
        title: 'Cloud & DevOps',
        items: [
          {
            label: 'GCP',
            techs: ['Compute Engine', 'Cloud Functions', 'BigQuery', 'Artifact Registry'],
          },
          { label: 'Firebase', techs: ['Hosting', 'Firestore DB'] },
          { label: 'Contenedores', techs: ['Docker', 'Linux Embedded'] },
          { label: 'CI/CD', techs: ['Git Flow', 'Gestión de ramas'] },
        ],
      },
      ai: {
        title: 'IA & Datos',
        items: [
          { label: 'IA', techs: ['RAG (Retrieval-Augmented Generation)', 'Chatbots'] },
          { label: 'Visión por Computador', techs: ['Reconocimiento de imágenes'] },
          { label: 'Bases de Datos', techs: ['NoSQL (Firestore)', 'BigQuery'] },
        ],
      },
      quality: {
        title: 'Calidad & Seguridad',
        items: [
          { label: 'Seguridad', techs: ['OAuth 2.0', 'JWT dinámicos', 'Auditoría'] },
          { label: 'Testing', techs: ['JUnit', 'Mockito', 'E2E'] },
          { label: 'Optimización', techs: ['Refactoring', 'Performance Tuning'] },
        ],
      },
    },
    strengths: {
      title: 'Mi enfoque',
      items: [
        {
          title: 'Migración y Modernización',
          description:
            'Angular v16 a v18, CSS a SCSS. Madurez técnica en actualización de proyectos.',
        },
        {
          title: 'Arquitectura Sólida',
          description:
            'Hexagonal, MVC, código desacoplado y mantenible para entornos corporativos.',
        },
        {
          title: 'Integración de IA',
          description:
            'Experiencia práctica integrando LLMs y Chatbots en aplicaciones empresariales.',
        },
      ],
    },
  },
  projects: {
    title: 'Proyectos',
    subtitle: 'Una selección de mis trabajos recientes',
    viewMore: 'Ver más',
    sourceCode: 'Código Fuente',
    items: [
      {
        id: 1,
        title: 'Grindrack',
        category: 'Progressive Web App',
        description:
          'Grindrack es una aplicación de gestión integral del rendimiento físico que combina el seguimiento de la evolución antropométrica con un registro técnico de entrenamientos, permitiendo analizar históricos de volumen, series y repeticiones. La aplicación se diferencia por la integración de tecnología de Inteligencia Artificial en su módulo nutricional, utilizando reconocimiento de imagen y procesamiento de lenguaje natural para automatizar la extracción y cálculo de calorías y macronutrientes al instante.',
      },
    ],
  },
  experience: {
    title: 'Experiencia',
    subtitle: 'Mi trayectoria profesional',
    present: 'Actualidad',
    items: [
      {
        id: 1,
        role: 'Ingeniero I+D',
        company: 'Mychef Technologies',
        period: 'oct. 2023',
        description:
          'Despliegue y desarrollo de Mychef Cloud. Diseño e implementación de diversas aplicaciones de gestión interna.',
      },
      {
        id: 2,
        role: 'Full Stack Developer',
        company: 'Mychef Technologies',
        period: 'ene. 2023 - oct. 2023',
        description:
          'Creación de la plataforma cloud para la conexión de los diferentes dispositivos de Mychef.',
      },
      {
        id: 3,
        role: 'Frontend Developer',
        company: 'Mychef Technologies',
        period: 'ago. 2022 - ene. 2023',
        description:
          'Programador en prácticas. Creación de un sistema para el control de versiones documental automático basado en aprobaciones.',
      },
    ],
  },
  contact: {
    title: 'Contacto',
    subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
    aboutMeTitle: 'Sobre mí',
    aboutMeText:
      'Más allá del código, soy un apasionado del fitness y la nutrición. Me encanta entrenar, aprender sobre rendimiento físico y experimentar con nuevas recetas saludables. También disfruto de la música electrónica, los videojuegos y pasar tiempo con amigos. Creo firmemente en el equilibrio entre la vida profesional y personal, y siempre busco maneras de mejorar y crecer tanto a nivel técnico como personal.',
    infoTitle: '¡Pongámonos en contacto!',
    infoText:
      'Estoy disponible para proyectos, colaboraciones o simplemente para hablar sobre tecnología y desarrollo web.',
    sendEmail: 'Enviar correo',
    whatsapp: 'WhatsApp',
  },
  credentials: {
    title: 'Formación y Certificaciones',
    subtitle: 'Mi formación académica y certificaciones profesionales',
    education: {
      title: 'Formación Académica',
      items: [
        {
          id: 1,
          degree: 'Máster Oficial en Ingeniería Informática',
          institution: 'Universidad Autónoma de Barcelona',
        },
        {
          id: 2,
          degree: 'Grado en Ingeniería Informática',
          institution: 'Universidad Autónoma de Barcelona',
        },
      ],
    },
    certifications: {
      title: 'Certificaciones',
      items: [
        {
          id: 1,
          name: 'Claude Code Certificate',
          issuer: 'Anthropic',
          link: 'https://www.anthropic.com',
        },
        {
          id: 2,
          name: 'Certificado B2 de Inglés',
          issuer: 'Cambridge English',
          link: 'assets/docs/b2.pdf',
        },
      ],
    },
  },
  footer: {
    copyright: 'Todos los derechos reservados.',
  },
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'portfolio-language';

  readonly currentLang = signal<Language>(this.getStoredLanguage());

  readonly t = computed(() => {
    switch (this.currentLang()) {
      case 'en':
        return translationsEn;
      case 'es':
        return translationsEs;
      default:
        return translationsCa;
    }
  });

  constructor() {
    effect(() => {
      this.storeLanguage(this.currentLang());
    });
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }

  private getStoredLanguage(): Language {
    if (typeof localStorage === 'undefined') return 'ca';
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return (stored as Language) || 'ca';
  }

  private storeLanguage(lang: Language): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, lang);
  }
}
