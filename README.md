# Plásticos Carmay - Plataforma Web Industrial

## 🏭 Descripción del Proyecto

Plásticos Carmay es una empresa líder especializada en la **extrusión, sellado e impresión** de soluciones plásticas de alta calidad. Esta plataforma digital ha sido diseñada para reflejar su capacidad industrial, su compromiso con la inocuidad alimentaria (en proceso de certificación **ISO 22000**) y para optimizar el proceso de cotización B2B.

## 🛠️ Stack Tecnológico

- **Frontend:** [Angular v21+](https://angular.dev/) (Arquitectura Standalone).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) & [daisyUI v5](https://daisyui.com/).
- **Estado y Reactividad:** [Angular Signals](https://angular.dev/guide/signals) para una lógica de UI moderna y eficiente.
- **Temas:** Cambio dinámico entre modo oscuro (`night`) y modo claro (`corporate`).
- **Backend:** [Vercel Serverless Functions](https://vercel.com/docs/functions) (Node.js).
- **Servicio de Correo:** [Resend](https://resend.com/) para envíos transaccionales de alta confiabilidad.

## 📐 Arquitectura

El proyecto sigue una estructura **Feature-Based (Orientada a Funcionalidades)** para asegurar escalabilidad:

- `src/app/core/`: Interfaces, servicios globales (Theme, Quote) y datos estáticos.
- `src/app/shared/`: Componentes de UI reutilizables (Tarjetas de producto, Modales).
- `src/app/layout/`: Elementos globales de estructura (Header, Footer).
- `src/app/features/home/`: Secciones principales de la Landing Page (Hero, Nosotros, Catálogo, Formulario).

## ✨ Características Principales

- **Hero Swiper Dinámico:** Carrusel interactivo con imágenes técnicas de maquinaria de extrusión de alta precisión.
- **Catálogo industrial:** Explorador de categorías alimentado por una base de datos tipada.
- **Sistema de Cotización Inteligente:** Pre-llenado automático de productos desde el catálogo hacia el formulario.
- **UI/UX Moderna:** Diseño responsivo, efectos de glassmorphism y tipografía optimizada.
- **Seguridad Antispam:** Implementación de Honeypot visualmente oculto en el formulario de contacto.

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js (Versión LTS recomendada)
- npm o yarn

### Instalación

```bash
npm install
```

### Servidor de Desarrollo

```bash
npm start
```

Navega a `http://localhost:4200`.

### Construcción para Producción

```bash
npm run build
```

## 🔒 Configuración de Seguridad y Backend

El formulario de contacto utiliza una función Serverless ubicada en `/api/send.ts`. Para habilitar el envío de correos:

1. Obtén una API Key en [Resend.com](https://resend.com).
2. Configura la variable de entorno `RESEND_API_KEY` en tu plataforma de despliegue (Vercel/Netlify).
3. La función está configurada para redirigir las consultas a `Aventas@plasticoscarmay.com`.

## 📞 Contacto Comercial

- **WhatsApp:** +593 962794119
- **Correos:** Aventas@plasticoscarmay.com, vventas@plasticoscarmay.com
- **Ubicación:** C. Ricardo Planas Villegas 137, Guayaquil 090610, Ecuador.

---

_Desarrollado con enfoque en rendimiento industrial y excelencia web._
