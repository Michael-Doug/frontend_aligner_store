import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticatedUser, Session } from './api.models';

const STORAGE_KEY = 'aligner-store:session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly session = signal<Session | null>(this.restore());

  readonly user = computed<AuthenticatedUser | null>(() => this.session()?.user ?? null);
  readonly isLoggedIn = computed(() => this.session() !== null);

  get token(): string | null {
    return this.session()?.token ?? null;
  }

  login(email: string, password: string): Observable<Session> {
    return this.http
      .post<Session>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap((session) => this.store(session)));
  }

  signup(email: string, password: string): Observable<Session> {
    return this.http
      .post<Session>(`${environment.apiUrl}/auth/signup`, { user: { email, password } })
      .pipe(tap((session) => this.store(session)));
  }

  logout(): void {
    this.session.set(null);
    this.safely(() => localStorage.removeItem(STORAGE_KEY));
  }

  private store(session: Session): void {
    this.session.set(session);
    this.safely(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(session)));
  }

  private restore(): Session | null {
    let raw: string | null = null;
    this.safely(() => {
      raw = localStorage.getItem(STORAGE_KEY);
    });
    if (!raw) return null;

    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  }

  // Navegação anônima e storage bloqueado não podem derrubar a aplicação.
  private safely(action: () => void): void {
    try {
      action();
    } catch {
      // sem persistência: a sessão vive só enquanto a aba estiver aberta
    }
  }
}
