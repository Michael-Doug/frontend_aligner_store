import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido} from './pedido';

@Injectable({
  providedIn: 'root'
})


export class ProdutoService {

  private readonly API = 'http://localhost:3000/orders'

  constructor(private http: HttpClient) { }

  create(dados: Pedido): Observable<Pedido> {

    return this.http.post<Pedido>(this.API, dados)
  }
}
