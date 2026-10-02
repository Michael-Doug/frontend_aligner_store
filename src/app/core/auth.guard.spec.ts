import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

function run(url: string) {
  return TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot),
  );
}

describe('authGuard', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => localStorage.clear());

  it('manda para o login guardando a rota pedida', () => {
    const resultado = run('/Carrinho');

    expect(resultado instanceof UrlTree).toBeTrue();
    expect(TestBed.inject(Router).serializeUrl(resultado as UrlTree))
      .toBe('/Login?redirect=%2FCarrinho');
  });

  it('deixa passar quem está logado', () => {
    localStorage.setItem(
      'aligner-store:session',
      JSON.stringify({ token: 't', user: { id: 1, email: 'a@b.com', role: 'customer', customer_id: 1 } }),
    );
    TestBed.inject(AuthService);

    expect(run('/Carrinho')).toBeTrue();
  });
});
