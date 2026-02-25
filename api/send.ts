import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { empresa, ciudad, producto, cantidad, unidadMedida, correo, _trap } = req.body;

  // Honeypot check
  if (_trap) {
    return res.status(200).json({ success: true, message: 'Bot detected (honeypot)' });
  }

  const RESEND_API_KEY = process.env['RESEND_API_KEY'];

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Mail service configuration missing (RESEND_API_KEY)' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Cotizaciones - Carmay <onboarding@resend.dev>', // Cambiar a un dominio verificado en producción
        to: ['Aventas@plasticoscarmay.com'],
        subject: `Nueva Cotización: ${empresa}`,
        html: `
          <h1>Nueva Solicitud de Cotización</h1>
          <p><strong>Empresa/Contacto:</strong> ${empresa}</p>
          <p><strong>Ciudad:</strong> ${ciudad}</p>
          <p><strong>Producto:</strong> ${producto || 'No especificado'}</p>
          <p><strong>Cantidad:</strong> ${cantidad} ${unidadMedida}</p>
          <p><strong>Email de Contacto:</strong> ${correo}</p>
        `,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await response.json();
      return res.status(500).json({ error: 'Failed to send email', details: error });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err });
  }
}
