import { Component } from '@angular/core';
import { Pedido } from '../produto/pedido';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto/produto.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  dados: Pedido = {
    total_value: 0,
    store_id: 1,
    payment_id: 3,
    customer_id: 1
  }

  constructor(
    private service: ProdutoService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  createOrder() {
    this.service.create(this.dados).subscribe(() => {
      this.router.navigate(['/Produto'])
    }, error => console.error(error))
  }
}
