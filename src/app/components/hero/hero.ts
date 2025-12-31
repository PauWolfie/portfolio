import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  inject,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

/**
 * Hero Component
 * Main hero section with interactive particle background
 * Particles follow and react to cursor movement
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number = 0;
  private mouseX = 0;
  private mouseY = 0;
  private isMouseOver = false;

  // Theme colors (matching the design system)
  private colors = {
    light: {
      primary: 'rgba(99, 102, 241, 0.6)', // --color-accent
      secondary: 'rgba(129, 140, 248, 0.4)',
      tertiary: 'rgba(165, 180, 252, 0.3)',
    },
    dark: {
      primary: 'rgba(129, 140, 248, 0.6)', // --color-accent dark
      secondary: 'rgba(99, 102, 241, 0.4)',
      tertiary: 'rgba(79, 70, 229, 0.3)',
    },
  };

  private particleCount = 80;
  private connectionDistance = 120;
  private mouseRadius = 150;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initCanvas();
      this.createParticles();
      this.addEventListeners();
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.removeEventListeners();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    // Recreate particles on resize
    this.createParticles();
  };

  private createParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    this.particles = [];

    const isDark = this.isDarkMode();
    const colorSet = isDark ? this.colors.dark : this.colors.light;
    const colorOptions = [colorSet.primary, colorSet.secondary, colorSet.tertiary];

    for (let i = 0; i < this.particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;

      this.particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
  }

  private isDarkMode(): boolean {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme) {
      return theme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private addEventListeners(): void {
    window.addEventListener('resize', this.resizeCanvas);
    const section = this.canvasRef.nativeElement.parentElement;
    if (section) {
      section.addEventListener('mousemove', this.handleMouseMove);
      section.addEventListener('mouseenter', this.handleMouseEnter);
      section.addEventListener('mouseleave', this.handleMouseLeave);
    }

    // Listen for theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleThemeChange);
    
    // Observe data-theme attribute changes
    this.observeThemeChanges();
  }

  private removeEventListeners(): void {
    window.removeEventListener('resize', this.resizeCanvas);
    const section = this.canvasRef.nativeElement?.parentElement;
    if (section) {
      section.removeEventListener('mousemove', this.handleMouseMove);
      section.removeEventListener('mouseenter', this.handleMouseEnter);
      section.removeEventListener('mouseleave', this.handleMouseLeave);
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.handleThemeChange);
  }

  private themeObserver?: MutationObserver;

  private observeThemeChanges(): void {
    this.themeObserver = new MutationObserver(() => {
      this.updateParticleColors();
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  private updateParticleColors(): void {
    const isDark = this.isDarkMode();
    const colorSet = isDark ? this.colors.dark : this.colors.light;
    const colorOptions = [colorSet.primary, colorSet.secondary, colorSet.tertiary];

    this.particles.forEach((particle) => {
      particle.color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    });
  }

  private handleThemeChange = (): void => {
    this.updateParticleColors();
  };

  private handleMouseMove = (e: MouseEvent): void => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  };

  private handleMouseEnter = (): void => {
    this.isMouseOver = true;
  };

  private handleMouseLeave = (): void => {
    this.isMouseOver = false;
  };

  private animate = (): void => {
    this.ctx.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );

    this.updateParticles();
    this.drawConnections();
    this.drawParticles();

    this.animationId = requestAnimationFrame(this.animate);
  };

  private updateParticles(): void {
    const canvas = this.canvasRef.nativeElement;

    this.particles.forEach((particle) => {
      // Move particles
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges with smooth transition
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      // React to mouse
      if (this.isMouseOver) {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouseRadius) {
          const force = (this.mouseRadius - distance) / this.mouseRadius;
          const angle = Math.atan2(dy, dx);

          // Push particles away from cursor with smooth easing
          particle.vx -= Math.cos(angle) * force * 0.5;
          particle.vy -= Math.sin(angle) * force * 0.5;
        }
      }

      // Damping to slow down particles
      particle.vx *= 0.98;
      particle.vy *= 0.98;

      // Gently return to origin
      const dxOrigin = particle.originX - particle.x;
      const dyOrigin = particle.originY - particle.y;
      particle.vx += dxOrigin * 0.002;
      particle.vy += dyOrigin * 0.002;
    });
  }

  private drawParticles(): void {
    this.particles.forEach((particle) => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.alpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });
  }

  private drawConnections(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const alpha = (1 - distance / this.connectionDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = this.isDarkMode()
            ? `rgba(129, 140, 248, ${alpha})`
            : `rgba(99, 102, 241, ${alpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    // Draw connections to mouse
    if (this.isMouseOver) {
      this.particles.forEach((particle) => {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouseRadius) {
          const alpha = (1 - distance / this.mouseRadius) * 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(this.mouseX, this.mouseY);
          this.ctx.strokeStyle = this.isDarkMode()
            ? `rgba(129, 140, 248, ${alpha})`
            : `rgba(99, 102, 241, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    }
  }
}
