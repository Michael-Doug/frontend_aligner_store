import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
    loadComponent: () => import('./componentes/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'QuemSomos',
    loadComponent: () =>
      import('./componentes/quem-somos/quem-somos.component').then((m) => m.QuemSomosComponent),
  },
  {
    path: 'OndeEstamos',
    loadComponent: () =>
      import('./componentes/onde-estamos/onde-estamos.component').then((m) => m.OndeEstamosComponent),
  },
  {
    path: 'Login',
    loadComponent: () => import('./componentes/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'Cadastro',
    loadComponent: () =>
      import('./componentes/cadastro/cadastro.component').then((m) => m.CadastroComponent),
  },
  {
    path: 'Produto',
    loadComponent: () =>
      import('./componentes/produto/produto.component').then((m) => m.ProdutoComponent),
  },
  {
    path: 'Carrinho',
    canActivate: [authGuard],
    loadComponent: () => import('./cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'Sucesso',
    loadComponent: () =>
      import('./componentes/sucesso/sucesso.component').then((m) => m.SucessoComponent),
  },
  { path: '**', redirectTo: 'Home' },
];
