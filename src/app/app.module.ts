import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { QuemSomosComponent } from './componentes/quem-somos/quem-somos.component';
import { FormsModule } from '@angular/forms';
import { OndeEstamosComponent } from './componentes/onde-estamos/onde-estamos.component';
import { LoginComponent } from './componentes/login/login.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { HomeComponent } from './componentes/home/home.component';
import { ProdutoComponent } from './componentes/produto/produto.component';
import { HttpClientModule } from '@angular/common/http';
import { SucessoComponent } from './componentes/sucesso/sucesso.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    QuemSomosComponent,
    OndeEstamosComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    ProdutoComponent,
    SucessoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
