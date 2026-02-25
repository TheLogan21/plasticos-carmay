import { Component, input, output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategory } from '../../../core/interfaces/product.interface';
import { QuoteService } from '../../../core/services/quote.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-modal.html',
})
export class ProductModalComponent {
  private quoteService = inject(QuoteService);

  @ViewChild('dialog') dialogEl!: ElementRef<HTMLDialogElement>;
  readonly product = input<ProductCategory | null>(null);
  readonly closed = output<void>();

  open(): void {
    this.dialogEl.nativeElement.showModal();
  }

  close(): void {
    this.dialogEl.nativeElement.close();
    this.closed.emit();
  }

  requestQuote(productName?: string): void {
    const name = productName ?? this.product()?.category ?? '';
    this.quoteService.setProduct(name);
    this.close();
    setTimeout(() => {
      document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}
