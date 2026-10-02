import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { Session } from './api.models';
import { environment } from '../../environments/environment';

const session: Session = {
  token: 'token-de-teste',
  user: { id: 1, email: 'joana@example.com', role: 'customer', customer_id: 7 },
};

describe('authInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let auth: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
  });

  afterEach(() => {
    backend.verify();
    localStorage.clear();
  });

  it('não manda Authorization quando não há sessão', () => {
    http.get('/qualquer').subscribe();

    expect(backend.expectOne('/qualquer').request.headers.has('Authorization')).toBeFalse();
  });

  it('manda o Bearer depois do login', () => {
    auth.login('joana@example.com', 'senha-de-teste').subscribe();
    backend.expectOne(`${environment.apiUrl}/auth/login`).flush(session);

    http.get('/protegido').subscribe();

    expect(backend.expectOne('/protegido').request.headers.get('Authorization'))
      .toBe('Bearer token-de-teste');
  });

  it('para de mandar o Bearer depois do logout', () => {
    auth.login('joana@example.com', 'senha-de-teste').subscribe();
    backend.expectOne(`${environment.apiUrl}/auth/login`).flush(session);
    auth.logout();

    http.get('/protegido').subscribe();

    expect(backend.expectOne('/protegido').request.headers.has('Authorization')).toBeFalse();
  });
});
