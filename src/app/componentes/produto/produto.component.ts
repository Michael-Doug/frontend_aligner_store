import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../core/api.models';
import { CartService } from '../../core/cart.service';
import { CatalogService } from '../../core/catalog.service';

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe],
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  private readonly catalog = inject(CatalogService);
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);

  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.catalog.listProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Não foi possível carregar os produtos agora.');
      },
    });
  }

  add(product: Product): void {
    this.cart.add(product);
    this.router.navigate(['/Carrinho']);
  }
}
