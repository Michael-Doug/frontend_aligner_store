import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order, OrderItem } from './api.models';
import { CartLine } from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);

  // O pedido nasce vazio e cada item é somado pelo backend; o total nunca vem daqui.
  checkout(lines: CartLine[], storeId: number, paymentId: number): Observable<Order> {
    return this.http
      .post<Order>(`${environment.apiUrl}/orders`, {
        order: { store_id: storeId, payment_id: paymentId },
      })
      .pipe(
        switchMap((order) =>
          forkJoin(lines.map((line) => this.addItem(order.id, line))).pipe(
            switchMap(() => this.http.get<Order>(`${environment.apiUrl}/orders/${order.id}`)),
          ),
        ),
      );
  }

  private addItem(orderId: number, line: CartLine): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${environment.apiUrl}/order_items`, {
      order_item: { order_id: orderId, product_id: line.product.id, quantity: line.quantity },
    });
  }
}
