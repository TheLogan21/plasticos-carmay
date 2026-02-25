# Blueprint y Checklist de Desarrollo: Plásticos Carmay

**Stack Técnico:** Angular v21+ (Standalone), Tailwind CSS, daisyUI, Signals.
**Enfoque:** Mobile-First, Arquitectura Orientada a Funcionalidades (Feature-Based), Inocuidad Industrial (ISO 22000).

---

## 1. Configuración Inicial y Estructura Base

- [ ] Inicializar proyecto Angular v21+ configurado sin NgModules (Standalone).
- [ ] Instalar e inicializar Tailwind CSS.
- [ ] Instalar daisyUI y configurar el `tailwind.config.js` con los temas 'dark' (por defecto, basado en el azul oscuro del logo) y 'light'.
- [ ] Crear la estructura de carpetas estricta:
  - `src/app/core/` (interfaces, services, data)
  - `src/app/shared/` (ui, utils)
  - `src/app/layout/` (header, footer)
  - `src/app/features/home/` (hero, about-us, catalog, contact)
- [ ] Asegurar que TODO componente generado tenga separados sus archivos `.ts` y `.html`. Prohibido el uso de `template: \`...\`` para bloques grandes.
- [ ] Mover las fotos reales de la fábrica a `./public/assets/factory/` y el logo a `./public/assets/logo/`.

## 2. Capa Core: Servicios y Datos

- [ ] **Theme Service:** Crear `src/app/core/services/theme.service.ts`.
  - [ ] Implementar un Signal para manejar el estado (`dark` | `light`).
  - [ ] Crear el método `toggleTheme()` que mute el atributo `data-theme` en el `<html>`.
- [ ] **Interfaces de Catálogo:** Crear `product.interface.ts`.
  - [ ] Definir propiedades obligatorias: `id`, `name`, `category`, `imageSrc`, `description`, `measurements` (array de strings), `hasPerforation` (opcional), `colorOptions` (opcional).
- [ ] **Base de Datos Estática:** Crear `src/app/core/data/catalog.json`.
  - [ ] Poblar con los productos del PDF: Fundas para camarón, alimentos, hielo, comerciales (camiseta, boutique), y basureros (incluyendo MOPELIGROEK) e industriales/vivero.

## 3. Componentes Compartidos (Shared UI)

- [ ] **Product Card (`shared/ui/product-card`):**
  - [ ] Maquetar tarjeta con imagen de stock (`object-cover`).
  - [ ] Aplicar overlay `bg-gradient-to-t from-black/80 to-transparent`.
  - [ ] Colocar título, descripción breve y botón "Ver Especificaciones".
- [ ] **Product Modal (`shared/ui/product-modal`):**
  - [ ] Implementar `<dialog>` de daisyUI (`modal`, `modal-box`).
  - [ ] Conectar un Signal de entrada (Input Signal) para recibir el objeto del producto seleccionado.
  - [ ] Mostrar desglose: Imagen, título, y lista iterativa (`@for`) con las medidas.
  - [ ] Añadir botón de acción "Cotizar Todo este Sector" que redirija al formulario.

## 4. Construcción del Layout (Estructura Global)

- [ ] **Header (`layout/header`):**
  - [ ] Navbar sticky. Transparente en el tope, fondo sólido con scroll.
  - [ ] Integrar logo de Carmay.
  - [ ] Botón toggle para el tema (Dark/Light mode).
  - [ ] Botón táctico "Llamar ahora" visible en móvil (`href="tel:+593962794119"`).
- [ ] **Footer (`layout/footer`):**
  - [ ] Reafirmar "En proceso de certificación ISO 22000".
  - [ ] Datos de contacto, correos corporativos y dirección (`C. Ricardo Planas Villegas 137`).

## 5. Landing Page (Features / Secciones)

- [ ] **Hero Section (`features/home/hero-swiper`):**
  - [ ] Implementar Swiper minimizado (máximo 3-4 imágenes de stock industriales de alta calidad).
  - [ ] Aplicar capa oscura (overlay) para asegurar legibilidad.
  - [ ] Insertar Copy principal enfocado en extrusión, sellado y estándares normativos.
  - [ ] Integrar _Trust Badge_ visual de ISO 22000.
  - [ ] Añadir CTAs: "Cotizar Pedido" y "Ver Catálogo".
- [ ] **Quiénes Somos / Proceso (`features/home/about-us`):**
  - [ ] Maquetar estructura de Timeline o Cards horizontales.
  - [ ] Insertar imagen `image_8c71fd.jpg` (Extrusión) + Texto de Visión.
  - [ ] Insertar imagen `image_8c721d.jpg` (Sellado/Corte) + Texto de Misión.
  - [ ] Insertar imagen `image_8c7239.jpg` (Producto Terminado) + Texto sobre logística y entrega oportuna.
- [ ] **Catálogo Dinámico (`features/home/catalog-grid`):**
  - [ ] Crear Grid responsive (`grid-cols-1 md:grid-cols-3`).
  - [ ] Iterar (`@for`) sobre el JSON importado, renderizando el componente `Product Card` para cada categoría.
- [ ] **Formulario de Cotización (`features/home/contact-form`):**
  - [ ] Construir layout de dos columnas (Desktop) / apilado (Mobile).
  - [ ] **Signal Forms / Validaciones:**
    - [ ] `empresa`: `Validators.required`, `Validators.minLength(3)`.
    - [ ] `ciudad`: `Validators.required`, sin números.
    - [ ] `cantidad`: `Validators.required`, `Validators.min(1)`.
    - [ ] `unidadMedida`: Radio buttons obligatorios (Millares o Kilos).
    - [ ] `correo`: `Validators.required`, `Validators.email`.
  - [ ] Bloquear botón de envío (`btn-disabled`) si el formulario es inválido.

## 6. Seguridad y Despliegue (Tu campo de especialidad)

- [ ] Implementar un Honeypot visualmente oculto en el formulario.
- [ ] _(Próximo paso backend)_ Descartar Web3Forms. Preparar función Serverless (Edge function) para conectarse a una API transaccional real (ej. Resend) y enviar a `vventas@plasticoscarmay.com` cuidando la reputación del dominio.
