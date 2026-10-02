import { Injectable, computed, signal } from '@angular/core';
import { Product } from './api.models';

export interface CartLine {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly lines = signal<CartLine[]>([]);

  readonly items = this.lines.asReadonly();
  readonly count = computed(() => this.lines().reduce((total, line) => total + line.quantity, 0));
  readonly total = computed(() =>
    this.lines().reduce((total, line) => total + Number(line.product.price) * line.quantity, 0),
  );

  subtotal(line: CartLine): number {
    return Number(line.product.price) * line.quantity;
  }

  add(product: Product): void {
    this.lines.update((lines) => {
      const existing = lines.find((line) => line.product.id === product.id);
      if (!existing) return [...lines, { product, quantity: 1 }];

      return lines.map((line) =>
        line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
      );
    });
  }

  remove(productId: number): void {
    this.lines.update((lines) => lines.filter((line) => line.product.id !== productId));
  }

  clear(): void {
    this.lines.set([]);
  }
}
