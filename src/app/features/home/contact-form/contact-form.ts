import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from '../../../core/services/quote.service';
import { ContactService } from '../../../core/services/contact.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
})
export class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private quoteService = inject(QuoteService);
  private contactService = inject(ContactService);

  readonly status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  form = this.fb.group({
    empresa: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    ciudad: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/), Validators.maxLength(80)],
    ],
    producto: ['', [Validators.required, Validators.maxLength(120)]],
    cantidad: [null as number | null, [Validators.required, Validators.min(1)]],
    unidadMedida: ['Millares', Validators.required],
    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\+?[\d\s\-\(\)]{7,20}$/),
        Validators.maxLength(20),
      ],
    ],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    _trap: [''], // honeypot — campo oculto anti-spam
  });

  ngOnInit(): void {
    // Detectar si viene un producto preseleccionado desde el modal del catálogo
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
      const { empresa, ciudad, producto, cantidad, unidadMedida, telefono, correo } =
        this.form.value;

      await this.contactService.sendQuote(
        {
          empresa: empresa ?? '',
          ciudad: ciudad ?? '',
          producto: producto ?? '',
          cantidad: cantidad ?? 0,
          unidadMedida: unidadMedida ?? 'Millares',
          telefono: telefono ?? '',
          correo: correo ?? '',
        },
        environment.web3FormsAccessKey,
      );

      this.status.set('success');
      setTimeout(() => {
        this.status.set('idle');
        this.form.reset({ unidadMedida: 'Millares' });
      }, 3000);
    } catch (err) {
      console.error('[ContactForm]', err);
      this.status.set('error');
      setTimeout(() => this.status.set('idle'), 4000);
    }
  }
}
