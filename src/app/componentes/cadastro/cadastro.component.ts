import { Component, OnInit } from '@angular/core';
import { CadastroService } from './cadastro.service';
import { Cliente } from './cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit{

  dados: Cliente = {

    name: "",
    address: "",
    email:"",
    phone: "",
    cpf: "",
    store_id: 1
  }

  constructor(
    private service: CadastroService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createClient() {
    this.service.create(this.dados).subscribe(() => {
      this.router.navigate(['/Sucesso'])
    }, error => console.error(error))
  }

}
