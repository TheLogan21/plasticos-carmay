# Plásticos Carmay — Plataforma Web Industrial

Landing page empresarial para **Plásticos Carmay**, empresa especializada en la extrusión, sellado e impresión de soluciones plásticas para los sectores camaronero, comercial e industrial. En proceso de certificación **ISO 22000**.

---

## 🛠️ Stack Tecnológico

| Capa           | Tecnología                                                                       |
| -------------- | -------------------------------------------------------------------------------- |
| **Framework**  | [Angular v21+](https://angular.dev/) — Standalone Components, Signals            |
| **Estilos**    | [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI v5](https://daisyui.com/) |
| **Temas**      | `night` (oscuro por defecto) / `corporate` (claro)                               |
| **Serverless** | [Vercel Functions](https://vercel.com/docs/functions) — Node.js                  |
| **Correo**     | [Resend](https://resend.com/) — API transaccional                                |

---

## 📐 Arquitectura del Proyecto

El proyecto sigue una estructura **Feature-Based** (orientada a funcionalidades):

```
src/app/
├── core/
│   ├── data/           → catalog.data.ts    (catálogo estático tipado)
│   ├── interfaces/     → product.interface.ts
│   └── services/       → theme.service.ts | quote.service.ts
├── shared/
│   └── ui/             → product-card | product-modal
├── layout/             → header | footer
└── features/
    └── home/           → hero-swiper | about-us | catalog-grid | contact-form

api/
└── send.ts             → Serverless function (Resend + seguridad)
```

---

## ✨ Funcionalidades

- **Hero Swiper** — Carrusel automático con imágenes de maquinaria de extrusión real. Rotación cada 5 s.
- **Catálogo Dinámico** — Grid responsivo de 3 sectores (Camaronero, Comercial, Industrial) con modal de especificaciones por producto.
- **Sistema de Cotización** — Pre-llenado automático del formulario cuando el usuario llega desde el modal del catálogo, via `QuoteService`.
- **Cambio de Tema** — Toggle Dark/Light en el header, persistido via `ThemeService` con Signals de Angular.
- **Navbar Sticky** — Transparente en el tope, con fondo y sombra al hacer scroll.

---

## 🔒 Seguridad del Formulario

El formulario de cotización cuenta con **5 capas de protección** apiladas:

| #   | Capa                       | Descripción                                                                                                                                                                    |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Honeypot**               | Campo `_trap` invisible. Si un bot lo rellena, el envío se descarta silenciosamente.                                                                                           |
| 2   | **Validación client-side** | Angular Reactive Forms con `Validators.required`, `Validators.email`, `Validators.min`, `minLength`. El botón de envío queda deshabilitado hasta que el formulario sea válido. |
| 3   | **Validación server-side** | La función serverless valida presencia, formato de email y que la cantidad sea un número positivo.                                                                             |
| 4   | **Límites de longitud**    | Cada campo tiene un tope máximo de caracteres (empresa ≤ 120, ciudad ≤ 80, correo ≤ 254…) para prevenir payloads masivos.                                                      |
| 5   | **Sanitización HTML**      | Todos los inputs pasan por `escapeHtml()` antes de insertarse en la plantilla del correo, previniendo inyección de etiquetas o scripts (`XSS`).                                |

---

## 📧 Configuración del Servicio de Correo (Resend)

Las cotizaciones enviadas por el formulario llegan a `Aventas@plasticoscarmay.com` mediante la función serverless `api/send.ts`.

### Requisitos para producción

1. **Verificar el dominio** `plasticoscarmay.com` en [resend.com/domains](https://resend.com/domains) añadiendo los registros DNS:
   - `TXT` → `resend._domainkey` (DKIM)
   - `MX` → `send` (feedback SES)
   - `TXT` → `send` → `v=spf1 ...` (SPF)

2. **Variables de entorno** a configurar en Vercel/Netlify:

   | Variable            | Valor                                        |
   | ------------------- | -------------------------------------------- |
   | `RESEND_API_KEY`    | Tu clave de API de Resend                    |
   | `RESEND_FROM_EMAIL` | `Plásticos Carmay <web@plasticoscarmay.com>` |

---

## 🚀 Inicio Rápido

### Requisitos previos

- Node.js (versión LTS)
- npm ≥ 10

### Instalación

```bash
npm install
```

### Servidor de desarrollo

```bash
ng serve
```

Navega a `http://localhost:4200`.

### Build de producción

```bash
ng build
```

_Desarrollado con Angular 21, Tailwind CSS v4 y daisyUI v5. Despliegue recomendado en [Vercel](https://vercel.com)._
