import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-sucesso',
  imports: [RouterLink],
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.css'],
})
export class SucessoComponent {
  private readonly params = inject(ActivatedRoute).queryParamMap;

  protected readonly fromOrder = toSignal(
    this.params.pipe(map((params) => params.get('origem') === 'pedido')),
    { initialValue: false },
  );
}
