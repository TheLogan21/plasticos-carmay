import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  readonly preselectedProduct = signal<string>('');

  setProduct(name: string): void {
    this.preselectedProduct.set(name);
  }

  clear(): void {
    this.preselectedProduct.set('');
  }
}
