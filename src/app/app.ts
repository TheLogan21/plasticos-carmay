import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { HeaderComponent } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';
import { HeroSwiperComponent } from './features/home/hero-swiper/hero-swiper';
import { AboutUsComponent } from './features/home/about-us/about-us';
import { CatalogGridComponent } from './features/home/catalog-grid/catalog-grid';
import { ContactFormComponent } from './features/home/contact-form/contact-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroSwiperComponent,
    AboutUsComponent,
    CatalogGridComponent,
    ContactFormComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.init();
  }
}
