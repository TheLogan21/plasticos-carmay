import { Component, OnInit, OnDestroy, signal } from '@angular/core';

interface HeroSlide {
  img: string;
  alt: string;
}

@Component({
  selector: 'app-hero-swiper',
  standalone: true,
  imports: [],
  templateUrl: './hero-swiper.html',
})
export class HeroSwiperComponent implements OnInit, OnDestroy {
  readonly slides: HeroSlide[] = [
    {
      img: 'https://www.walterpack.com/wp-content/uploads/2025/02/maquina-de-extrusion-de-piezas-de-plastico-1024x683.jpg',
      alt: 'Maquinaria de extrusión de piezas de plástico',
    },
    {
      img: 'https://www.rotolia.com/blog/wp-content/uploads/2024/07/extrusion-del-plastico.jpg.webp',
      alt: 'Proceso de extrusión del plástico industrial',
    },
  ];

  currentIndex = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.currentIndex.update((i) => (i + 1) % this.slides.length);
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  scrollToContact(): void {
    document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' });
  }
}
