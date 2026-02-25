import { Injectable } from '@angular/core';

/** Campos que admite el formulario de cotización. */
export interface QuotePayload {
  empresa: string;
  ciudad: string;
  producto: string;
  cantidad: number;
  unidadMedida: string;
  correo: string;
  telefono: string;
}

// ─── Límites de longitud por campo ─────────────────────────────────────────────
const FIELD_LIMITS: Record<string, number> = {
  empresa: 120,
  ciudad: 80,
  producto: 120,
  unidadMedida: 20,
  correo: 254, // máximo RFC 5321
  telefono: 20,
};

// ─── Endpoint de Web3Forms ──────────────────────────────────────────────────────
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Escapa caracteres especiales HTML para prevenir inyección de código
 * en el subject / mensaje que se envía por correo.
 */
function escapeHtml(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  return raw
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/** Valida formato básico de correo electrónico (RFC simple). */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** Valida que la cantidad sea un número positivo dentro de rangos razonables. */
function isValidNumber(value: unknown): boolean {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 && n < 10_000_000;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  /**
   * Envía la solicitud de cotización a Web3Forms.
   * Lanza un `Error` descriptivo si la validación falla o el envío no es exitoso.
   *
   * @param payload  Datos validados provenientes del formulario reactivo.
   * @param accessKey  Access Key de Web3Forms leída desde las variables de entorno.
   */
  async sendQuote(payload: QuotePayload, accessKey: string): Promise<void> {
    // ── 1. Honeypot se evalúa en el componente antes de llamar este método ──────

    // ── 2. Validación de presencia ────────────────────────────────────────────────
    const { empresa, ciudad, producto, cantidad, unidadMedida, correo, telefono } = payload;
    if (!empresa || !ciudad || !producto || !cantidad || !correo || !telefono) {
      throw new Error('Faltan campos obligatorios.');
    }

    // 3. Validación de tipos y formatos ─────────────────────────────────────────
    if (!isValidEmail(correo)) {
      throw new Error('Correo electrónico no válido.');
    }
    if (!isValidNumber(cantidad)) {
      throw new Error('Cantidad no válida.');
    }

    // ── 4. Límites de longitud ─────────────────────────────────────────────────────
    for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
      const val = (payload as unknown as Record<string, unknown>)[field];
      if (typeof val === 'string' && val.length > limit) {
        throw new Error(`El campo '${field}' supera el límite de ${limit} caracteres.`);
      }
    }

    // ── 5. Sanitización HTML ───────────────────────────────────────────────────────
    const safe = {
      empresa: escapeHtml(empresa),
      ciudad: escapeHtml(ciudad),
      producto: escapeHtml(producto),
      cantidad: Number(cantidad),
      unidadMedida: escapeHtml(unidadMedida),
      correo: escapeHtml(correo),
      telefono: escapeHtml(telefono),
    };

    // ── 6. Construcción del payload para Web3Forms ─────────────────────────────
    //   Campos reservados: access_key, subject, from_name, replyto, botcheck.
    //   El resto de campos se muestran como tabla en el cuerpo del correo.
    //   El destinatario es el email registrado con la access_key en web3forms.com.
    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('subject', `📦 Nueva Cotización — ${safe.empresa} | ${safe.producto}`);
    formData.append('from_name', 'Sitio Web Plásticos Carmay');
    formData.append('replyto', correo.trim()); // correo del cliente para responder
    formData.append('Empresa / Contacto', safe.empresa);
    formData.append('Ciudad', safe.ciudad);
    formData.append('Producto de Interés', safe.producto);
    formData.append('Cantidad', `${safe.cantidad} ${safe.unidadMedida}`);
    formData.append('Teléfono del cliente', safe.telefono);
    formData.append('Correo del cliente', safe.correo);

    // ── 7. Envío ────────────────────────────────────────────────────────────────────
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok || json['success'] === false) {
      console.error('[Web3Forms Error]', json);
      throw new Error(json['message'] ?? 'Error al enviar el formulario.');
    }
  }
}
