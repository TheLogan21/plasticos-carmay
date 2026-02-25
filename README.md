# Plásticos Carmay — Plataforma Web Industrial

Landing page empresarial para **Plásticos Carmay**, empresa especializada en la extrusión, sellado e impresión de soluciones plásticas para los sectores camaronero, comercial e industrial. En proceso de certificación **ISO 22000**.

---

## 🛠️ Stack Tecnológico

| Capa          | Tecnología                                                                        |
| ------------- | --------------------------------------------------------------------------------- |
| **Framework** | [Angular v21+](https://angular.dev/) — Standalone Components, Signals             |
| **Estilos**   | [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI v5](https://daisyui.com/)  |
| **Temas**     | `night` (oscuro por defecto) / `corporate` (claro)                                |
| **Correo**    | [Web3Forms](https://web3forms.com/) — envío directo desde el cliente, sin backend |
| **Deploy**    | [Vercel](https://vercel.com/) — build automático desde GitHub                     |

---

## 📐 Arquitectura del Proyecto

El proyecto sigue una estructura **Feature-Based** (orientada a funcionalidades):

```
src/
├── environments/
│   ├── environment.ts              → variables de desarrollo (key pública de Web3Forms)
│   └── environment.production.ts  → generado en build-time por scripts/set-env.js
├── app/
│   ├── core/
│   │   ├── data/           → catalog.data.ts     (catálogo estático tipado)
│   │   ├── interfaces/     → product.interface.ts
│   │   └── services/       → theme.service.ts | quote.service.ts | contact.service.ts
│   ├── shared/
│   │   └── ui/             → product-card | product-modal
│   ├── layout/             → header | footer
│   └── features/
│       └── home/           → hero-swiper | about-us | catalog-grid | contact-form

scripts/
└── set-env.js              → pre-build: inyecta WEB3FORMS_ACCESS_KEY en environment.production.ts

vercel.json                 → build command con inyección de variables de entorno
```

> **Sin función serverless:** la migración de Resend a Web3Forms eliminó por completo la carpeta `api/`.
> El formulario envía directamente a `https://api.web3forms.com/submit` desde el navegador.

---

## ✨ Funcionalidades

- **Hero Swiper** — Carrusel automático con imágenes de maquinaria de extrusión real. Rotación cada 5 s.
- **Catálogo Dinámico** — Grid responsivo de 3 sectores (Camaronero, Comercial, Industrial) con modal de especificaciones por producto.
- **Sistema de Cotización** — Pre-llenado automático del formulario cuando el usuario llega desde el modal del catálogo, via `QuoteService`.
- **Cambio de Tema** — Toggle Dark/Light en el header, persistido via `ThemeService` con Signals de Angular.
- **Navbar Sticky** — Transparente en el tope, con fondo y sombra al hacer scroll.

---

## 🔒 Seguridad del Formulario

El formulario de cotización cuenta con **5 capas de protección** apiladas en `ContactService`:

| #   | Capa                       | Descripción                                                                                                                                                                        |
| --- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Honeypot**               | Campo `_trap` invisible. Si un bot lo rellena, el envío se descarta silenciosamente en el componente antes de llamar al servicio.                                                  |
| 2   | **Validación client-side** | Angular Reactive Forms con `Validators.required`, `Validators.email`, `Validators.min`, `minLength`, `maxLength`. El botón queda deshabilitado hasta que el formulario sea válido. |
| 3   | **Validación en servicio** | `ContactService` valida presencia de todos los campos, formato de email y que la cantidad sea un número positivo — antes de hacer la petición HTTP.                                |
| 4   | **Límites de longitud**    | Cada campo tiene un tope máximo de caracteres (empresa ≤ 120, ciudad ≤ 80, correo ≤ 254 RFC 5321…) para prevenir payloads masivos.                                                 |
| 5   | **Sanitización HTML**      | Todos los inputs pasan por `escapeHtml()` antes de insertarse en el `subject` y los campos del correo, previniendo XSS.                                                            |

---

## 📧 Configuración del Servicio de Correo (Web3Forms)

Las cotizaciones se envían directamente desde el navegador a la API de Web3Forms, que las reenvía al correo registrado con la access key.

### ¿Por qué Web3Forms?

- **Sin backend propio**: no requiere función serverless ni dominio verificado.
- **Sin SDK**: usa la `Fetch API` nativa del navegador con `FormData`.
- **Access key pública**: según la [documentación oficial](https://docs.web3forms.com/), la key solo permite _enviar_ formularios; nunca expone datos de la cuenta.

### Requisitos para producción (Vercel)

1. Crea tu access key gratuita en [web3forms.com](https://web3forms.com) con el correo destino.

2. En **Vercel → Project Settings → Environment Variables**, añade:

   | Variable               | Valor                      |
   | ---------------------- | -------------------------- |
   | `WEB3FORMS_ACCESS_KEY` | Tu access key de Web3Forms |

3. El script `scripts/set-env.js` la inyecta automáticamente en `environment.production.ts` antes del build de Angular.

### Desarrollo local

La key se guarda en `src/environments/environment.ts` (no en `.env`) ya que es una clave de solo-escritura segura para el cliente:

```typescript
export const environment = {
  production: false,
  web3FormsAccessKey: 'TU_ACCESS_KEY',
};
```

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

### Build de producción (igual que Vercel)

```bash
# 1. Inyectar la key desde la variable de entorno del sistema
$env:WEB3FORMS_ACCESS_KEY="tu-access-key"   # PowerShell
# export WEB3FORMS_ACCESS_KEY="tu-access-key"  # bash / zsh

# 2. Generar environment.production.ts e iniciar el build
node scripts/set-env.js && ng build --configuration production
```

---

_Desarrollado con Angular 21, Tailwind CSS v4 y daisyUI v5. Despliegue recomendado en [Vercel](https://vercel.com)._
