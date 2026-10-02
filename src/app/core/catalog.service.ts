import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Payment, Product, Store } from './api.models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);

  listProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  listStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${environment.apiUrl}/stores`);
  }

  listPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.apiUrl}/payments`);
  }
}
