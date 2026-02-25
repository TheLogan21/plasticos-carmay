import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { empresa, ciudad, producto, cantidad, unidadMedida, correo, _trap } = req.body;

  // ─── Honeypot: si tiene valor, es un bot ───────────────────────────────────
  if (_trap) {
    return res.status(200).json({ ok: true }); // respuesta silenciosa
  }

  // ─── Validación mínima server-side ────────────────────────────────────────
  if (!empresa || !ciudad || !producto || !cantidad || !correo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // ─── Configuración de Resend ───────────────────────────────────────────────
  const apiKey = process.env['RESEND_API_KEY'];
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY no configurada en el entorno' });
  }

  const resend = new Resend(apiKey);

  // NOTA: El campo `from` debe usar un dominio verificado en Resend
  // para poder enviar a destinatarios externos (plasticoscarmay.com).
  // Mientras no tengas dominio verificado, solo funciona enviando a tu
  // propio correo de cuenta Resend. Para producción, verifica:
  // https://resend.com/domains → añade plasticoscarmay.com
  const FROM_ADDRESS =
    process.env['RESEND_FROM_EMAIL'] ?? 'Plásticos Carmay <web@plasticoscarmay.com>';

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: ['Aventas@plasticoscarmay.com'],
    replyTo: correo, // El equipo responde directamente al cliente
    subject: `📦 Nueva Cotización — ${empresa} | ${producto}`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
      <body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:24px;">
        <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">
          <!-- Encabezado -->
          <div style="background:#1a1a2e;padding:28px 32px;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">
              📦 Nueva Solicitud de Cotización
            </h1>
            <p style="color:#a0aec0;margin:6px 0 0;font-size:13px;">Recibida a través del formulario web de Plásticos Carmay</p>
          </div>

          <!-- Cuerpo -->
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:10px 0;color:#718096;font-weight:600;width:40%;border-bottom:1px solid #edf2f7">Empresa / Contacto</td>
                <td style="padding:10px 0;color:#2d3748;border-bottom:1px solid #edf2f7"><strong>${empresa}</strong></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#718096;font-weight:600;border-bottom:1px solid #edf2f7">Ciudad</td>
                <td style="padding:10px 0;color:#2d3748;border-bottom:1px solid #edf2f7">${ciudad}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#718096;font-weight:600;border-bottom:1px solid #edf2f7">Producto de Interés</td>
                <td style="padding:10px 0;color:#2d3748;border-bottom:1px solid #edf2f7"><strong>${producto}</strong></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#718096;font-weight:600;border-bottom:1px solid #edf2f7">Cantidad</td>
                <td style="padding:10px 0;color:#2d3748;border-bottom:1px solid #edf2f7">${cantidad} ${unidadMedida}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#718096;font-weight:600;">Correo del Cliente</td>
                <td style="padding:10px 0;"><a href="mailto:${correo}" style="color:#6366f1;text-decoration:none;">${correo}</a></td>
              </tr>
            </table>
          </div>

          <!-- CTA -->
          <div style="background:#f7fafc;padding:20px 32px;border-top:1px solid #edf2f7;">
            <a href="mailto:${correo}"
               style="display:inline-block;background:#6366f1;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
              ✉️ Responder al Cliente
            </a>
            <p style="color:#a0aec0;font-size:11px;margin:12px 0 0;">
              Este correo fue enviado automáticamente por el sitio web de Plásticos Carmay.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  });

  if (error) {
    console.error('[Resend Error]', error);
    return res.status(500).json({ error: 'Error al enviar el correo', details: error });
  }

  return res.status(200).json({ ok: true });
}
