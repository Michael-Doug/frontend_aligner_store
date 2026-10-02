import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { CatalogService } from '../../core/catalog.service';
import { Store } from '../../core/api.models';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  private readonly service = inject(CadastroService);
  private readonly catalog = inject(CatalogService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly stores = signal<Store[]>([]);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly submitting = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    address: [''],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    store_id: [0, Validators.min(1)],
  });

  ngOnInit(): void {
    this.catalog.listStores().subscribe({
      next: (stores) => {
        this.stores.set(stores);
        if (stores.length) this.form.controls.store_id.setValue(stores[0].id);
      },
      error: () => this.errorMessage.set('Não foi possível carregar as lojas.'),
    });
  }

  // Cria o cliente e já abre a conta de acesso: o backend amarra as duas pelo e-mail.
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const { password, ...customer } = this.form.getRawValue();

    this.service
      .create(customer)
      .pipe(switchMap(() => this.auth.signup(customer.email, password)))
      .subscribe({
        next: () => this.router.navigate(['/Sucesso']),
        error: (response) => {
          this.submitting.set(false);
          this.errorMessage.set(this.describe(response));
        },
      });
  }

  private describe(response: { status?: number; error?: { errors?: Record<string, string[]> } }): string {
    const errors = response.error?.errors;
    if (errors?.['cpf']) return 'Este CPF já está cadastrado.';
    if (errors?.['email']) return 'Este e-mail já está cadastrado.';
    if (response.status === 0) return 'Não foi possível falar com o servidor.';

    return 'Não foi possível concluir o cadastro. Confira os dados e tente de novo.';
  }
}
