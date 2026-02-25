import { Component, input, output } from '@angular/core';
import { ProductCategory } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  readonly category = input.required<ProductCategory>();
  readonly selected = output<ProductCategory>();

  onSelect(): void {
    this.selected.emit(this.category());
  }
}
