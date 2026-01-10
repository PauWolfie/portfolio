import { Component, AfterViewInit, OnDestroy, computed, ViewChild, ElementRef, NgZone } from '@angular/core';
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
export class TechComponent implements AfterViewInit, OnDestroy {
  @ViewChild('marqueeTrack') marqueeTrack!: ElementRef<HTMLDivElement>;

  // Marquee animation state
  private position = 0;
  private currentSpeed = 0;
  private targetSpeed = 2.5;
  private readonly maxSpeed = 2.5;
  private readonly acceleration = 0.1; // How fast it speeds up/slows down
  private animationId: number | null = null;
  private trackWidth = 0;

  constructor(public languageService: LanguageService, private ngZone: NgZone) {}

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

    // Start marquee animation outside Angular zone for performance
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => this.initMarquee(), 200);
    });
  }

  private initMarquee(): void {
    if (!this.marqueeTrack?.nativeElement) return;

    const track = this.marqueeTrack.nativeElement;
    // Get half of track width (since we duplicate items for seamless loop)
    this.trackWidth = track.scrollWidth / 2;
    this.currentSpeed = this.maxSpeed;
    this.targetSpeed = this.maxSpeed;
    this.animate();
  }

  private animate = (): void => {
    // Gradually adjust current speed towards target speed
    if (this.currentSpeed < this.targetSpeed) {
      this.currentSpeed = Math.min(this.currentSpeed + this.acceleration, this.targetSpeed);
    } else if (this.currentSpeed > this.targetSpeed) {
      this.currentSpeed = Math.max(this.currentSpeed - this.acceleration, this.targetSpeed);
    }

    // Update position
    this.position -= this.currentSpeed;

    // Reset position for seamless loop
    if (Math.abs(this.position) >= this.trackWidth) {
      this.position = 0;
    }

    // Apply transform
    if (this.marqueeTrack?.nativeElement) {
      this.marqueeTrack.nativeElement.style.transform = `translateX(${this.position}px)`;
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  // Called when mouse enters the marquee
  onMarqueeMouseEnter(): void {
    this.targetSpeed = 0; // Start slowing down
  }

  // Called when mouse leaves the marquee
  onMarqueeMouseLeave(): void {
    this.targetSpeed = this.maxSpeed; // Start speeding up
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
