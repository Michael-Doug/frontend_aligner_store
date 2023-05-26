import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OndeEstamosComponent } from './componentes/onde-estamos/onde-estamos.component';
import { QuemSomosComponent } from './componentes/quem-somos/quem-somos.component';
import { LoginComponent } from './componentes/login/login.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { HomeComponent } from './componentes/home/home.component';
import { ProdutoComponent } from './componentes/produto/produto.component';
import { SucessoComponent } from './componentes/sucesso/sucesso.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'OndeEstamos',
    component: OndeEstamosComponent
  },
  {
    path: 'QuemSomos',
    component: QuemSomosComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Cadastro',
    component: CadastroComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'Produto',
    component: ProdutoComponent
  },
  {
    path: 'Sucesso',
    component: SucessoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
