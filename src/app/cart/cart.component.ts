import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Payment } from '../core/api.models';
import { AuthService } from '../core/auth.service';
import { CartService } from '../core/cart.service';
import { CatalogService } from '../core/catalog.service';
import { OrderService } from '../core/order.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  private readonly catalog = inject(CatalogService);
  private readonly orders = inject(OrderService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);

  protected readonly payments = signal<Payment[]>([]);
  protected readonly selectedPaymentId = signal<number | null>(null);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly submitting = signal(false);

  ngOnInit(): void {
    this.catalog.listPayments().subscribe({
      next: (payments) => {
        this.payments.set(payments);
        if (payments.length) this.selectedPaymentId.set(payments[0].id);
      },
      error: () => this.errorMessage.set('Não foi possível carregar as formas de pagamento.'),
    });
  }

  checkout(): void {
    const paymentId = this.selectedPaymentId();
    const storeId = this.cart.items()[0]?.product.store_id;

    if (!paymentId || !storeId) {
      this.errorMessage.set('Escolha uma forma de pagamento para continuar.');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    this.orders.checkout(this.cart.items(), storeId, paymentId).subscribe({
      next: () => {
        this.cart.clear();
        this.router.navigate(['/Sucesso'], { queryParams: { origem: 'pedido' } });
      },
      error: (response) => {
        this.submitting.set(false);
        this.errorMessage.set(
          response.status === 403
            ? 'Sua conta ainda não está ligada a um cadastro de cliente.'
            : 'Não foi possível fechar o pedido. Tente de novo.',
        );
      },
    });
  }

  protected get customerEmail(): string {
    return this.auth.user()?.email ?? '';
  }
}
