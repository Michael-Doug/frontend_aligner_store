import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente } from './cliente';

@Injectable({ providedIn: 'root' })
export class CadastroService {
  private readonly http = inject(HttpClient);

  create(dados: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.apiUrl}/customers`, { customer: dados });
  }
}
