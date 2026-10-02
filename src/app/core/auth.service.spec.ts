import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Session } from './api.models';
import { environment } from '../../environments/environment';

const session: Session = {
  token: 'token-de-teste',
  user: { id: 1, email: 'joana@example.com', role: 'customer', customer_id: 7 },
};

describe('AuthService', () => {
  let auth: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    auth = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('começa deslogado', () => {
    expect(auth.isLoggedIn()).toBeFalse();
    expect(auth.token).toBeNull();
  });

  it('guarda a sessão depois do login', () => {
    auth.login('joana@example.com', 'senha-de-teste').subscribe();
    http.expectOne(`${environment.apiUrl}/auth/login`).flush(session);

    expect(auth.isLoggedIn()).toBeTrue();
    expect(auth.token).toBe('token-de-teste');
    expect(auth.user()?.customer_id).toBe(7);
  });

  it('recupera a sessão salva ao recarregar', () => {
    localStorage.setItem('aligner-store:session', JSON.stringify(session));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const recarregado = TestBed.inject(AuthService);

    expect(recarregado.isLoggedIn()).toBeTrue();
    expect(recarregado.token).toBe('token-de-teste');
    TestBed.inject(HttpTestingController).verify();
  });

  it('não quebra com sessão corrompida no storage', () => {
    localStorage.setItem('aligner-store:session', 'isto não é json');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    expect(TestBed.inject(AuthService).isLoggedIn()).toBeFalse();
    TestBed.inject(HttpTestingController).verify();
  });

  it('logout limpa a sessão e o storage', () => {
    auth.login('joana@example.com', 'senha-de-teste').subscribe();
    http.expectOne(`${environment.apiUrl}/auth/login`).flush(session);

    auth.logout();

    expect(auth.isLoggedIn()).toBeFalse();
    expect(localStorage.getItem('aligner-store:session')).toBeNull();
  });
});
