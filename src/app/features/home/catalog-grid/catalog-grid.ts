import { Component, signal, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ProductCardComponent } from '../../../shared/ui/product-card/product-card';
import { ProductModalComponent } from '../../../shared/ui/product-modal/product-modal';
import { CATALOG_DATA } from '../../../core/data/catalog.data';
import { ProductCategory } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-catalog-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductModalComponent],
  templateUrl: './catalog-grid.html',
})
export class CatalogGridComponent {
  @ViewChild('productModal') productModal!: ProductModalComponent;

  readonly categories = CATALOG_DATA;
  readonly selectedCategory = signal<ProductCategory | null>(null);

  openModal(category: ProductCategory): void {
    this.selectedCategory.set(category);
    // Allow Angular to render the modal with new data before opening
    setTimeout(() => this.productModal.open(), 0);
  }

  onModalClosed(): void {
    this.selectedCategory.set(null);
  }
}
