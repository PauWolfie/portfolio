import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  inject,
  Input,
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
 * Reusable Particle Background Component
 * Creates an interactive particle network that reacts to cursor movement
 * Follows the design system color scheme and supports dark mode
 */
@Component({
  selector: 'app-particle-background',
  standalone: true,
  template: `
    <canvas #particleCanvas class="particle-canvas"></canvas>
    <div class="particle-gradient-overlay"></div>
  `,
  styles: [`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .particle-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .particle-gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        ellipse 80% 50% at 50% -20%,
        var(--color-accent-light) 0%,
        transparent 50%
      );
      opacity: 0.5;
    }
  `],
})
export class ParticleBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  /** Number of particles to render */
  @Input() particleCount = 60;
  
  /** Maximum distance for particle connections */
  @Input() connectionDistance = 100;
  
  /** Radius of mouse influence */
  @Input() mouseRadius = 120;

  /** Opacity multiplier for particles */
  @Input() opacity = 1;

  private ngZone = inject(NgZone);
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number = 0;
  private mouseX = 0;
  private mouseY = 0;
  private isMouseOver = false;
  private hostElement!: HTMLElement;

  // Theme colors (matching the design system)
  private colors = {
    light: {
      primary: 'rgba(99, 102, 241, 0.6)',
      secondary: 'rgba(129, 140, 248, 0.4)',
      tertiary: 'rgba(165, 180, 252, 0.3)',
    },
    dark: {
      primary: 'rgba(129, 140, 248, 0.6)',
      secondary: 'rgba(99, 102, 241, 0.4)',
      tertiary: 'rgba(79, 70, 229, 0.3)',
    },
  };

  private themeObserver?: MutationObserver;

  ngAfterViewInit(): void {
    this.hostElement = this.canvasRef.nativeElement.closest('section') || 
                       this.canvasRef.nativeElement.parentElement!;
    
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
    this.themeObserver?.disconnect();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const rect = this.hostElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
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
        alpha: (Math.random() * 0.5 + 0.3) * this.opacity,
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
    
    this.hostElement.addEventListener('mousemove', this.handleMouseMove);
    this.hostElement.addEventListener('mouseenter', this.handleMouseEnter);
    this.hostElement.addEventListener('mouseleave', this.handleMouseLeave);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleThemeChange);

    this.observeThemeChanges();
  }

  private removeEventListeners(): void {
    window.removeEventListener('resize', this.resizeCanvas);
    
    this.hostElement?.removeEventListener('mousemove', this.handleMouseMove);
    this.hostElement?.removeEventListener('mouseenter', this.handleMouseEnter);
    this.hostElement?.removeEventListener('mouseleave', this.handleMouseLeave);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.handleThemeChange);
  }

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
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      if (this.isMouseOver) {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouseRadius) {
          const force = (this.mouseRadius - distance) / this.mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.5;
          particle.vy -= Math.sin(angle) * force * 0.5;
        }
      }

      particle.vx *= 0.98;
      particle.vy *= 0.98;

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
          const alpha = (1 - distance / this.connectionDistance) * 0.3 * this.opacity;
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

    if (this.isMouseOver) {
      this.particles.forEach((particle) => {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouseRadius) {
          const alpha = (1 - distance / this.mouseRadius) * 0.5 * this.opacity;
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
