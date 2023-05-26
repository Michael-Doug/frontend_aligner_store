import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})


export class CadastroService {

  private readonly API = 'http://localhost:3000/customers'

  constructor(private http: HttpClient) { }

  create(dados: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, dados)
  }
}
