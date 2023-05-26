import { Component, OnInit } from '@angular/core';
import { Pedido } from './pedido';
import { ProdutoService } from './produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

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
