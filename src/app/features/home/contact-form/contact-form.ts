import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { QuoteService } from '../../../core/services/quote.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
})
export class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private quoteService = inject(QuoteService);

  readonly status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  form = this.fb.group({
    empresa: ['', [Validators.required, Validators.minLength(3)]],
    ciudad: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
    producto: [''],
    cantidad: [null as number | null, [Validators.required, Validators.min(1)]],
    unidadMedida: ['Millares', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    _trap: [''], // honeypot — campo oculto anti-spam
  });

  ngOnInit(): void {
    // Detectar si viene producto preseleccionado desde el modal
    const preselected = this.quoteService.preselectedProduct();
    if (preselected) {
      this.form.patchValue({ producto: preselected });
      this.quoteService.clear();
    }
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Honeypot check — si el campo _trap tiene valor, es un bot
    if (this.form.value._trap) return;

    this.status.set('sending');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form.value),
      });

      if (response.ok) {
        this.status.set('success');
        setTimeout(() => {
          this.status.set('idle');
          this.form.reset({ unidadMedida: 'Millares' });
        }, 3000);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      this.status.set('error');
      setTimeout(() => this.status.set('idle'), 4000);
    }
  }
}
