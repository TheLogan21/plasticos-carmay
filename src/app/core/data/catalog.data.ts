import type { ProductCategory } from '../interfaces/product.interface';

export const CATALOG_DATA: ProductCategory[] = [
  {
    id: 'camaronero',
    category: 'Sector Camaronero / Alimenticio',
    imageSrc: 'assets/pañal.png',
    description:
      'Soluciones de empaque para la industria alimentaria bajo estándares de inocuidad ISO 22000.',
    products: [
      {
        name: 'Fundas para Camarón',
        details: 'Con Impresión, Sin Impresión, Pigmentadas, Pañales, Mandiles, Con Fuelle.',
        measurements: ['Medidas a convenir según requerimiento'],
      },
      {
        name: 'Fundas para Alimentos (Rollos)',
        details: 'Diferentes colores a elección para identificación de producto.',
        measurements: ['Medidas a convenir'],
      },
      {
        name: 'Fundas para Hielo',
        details: 'Cuatro formatos estándar de la industria.',
        measurements: ['Pequeña 6"×15"', 'Mediana 10"×18"', 'Grande 12"×22"', 'Jumbo 14"×23.5"'],
      },
    ],
  },
  {
    id: 'comercial',
    category: 'Sector Comercial / Uso General',
    imageSrc: 'https://proplastic.ec/wp-content/uploads/2023/02/1-1.png.webp',
    description:
      'Bolsas resistentes y versátiles para todo tipo de comercio minorista y distribución general.',
    products: [
      {
        name: 'Fundas Tipo Camiseta',
        details: 'Estándar para retail, supermercados y comercio en general.',
        measurements: ['Pequeña 6"×15"', 'Mediana 10"×18"', 'Grande 12"×22"', 'Jumbo 14"×23.5"'],
      },
      {
        name: 'Fundas Tipo Boutique',
        details: 'Acabado premium con mayor resistencia y presentación superior.',
        measurements: ['Pequeña 6"×15"', 'Mediana 10"×18"', 'Grande 12"×22"', 'Jumbo 14"×23.5"'],
      },
    ],
  },
  {
    id: 'industrial',
    category: 'Sector Industrial y Especializado',
    imageSrc:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    description:
      'Empaques técnicos de alto calibre para gestión de residuos y agricultura especializada.',
    products: [
      {
        name: 'Fundas para Basura',
        details: 'Alta resistencia. Incluye línea MOPELIGROEK para bioseguridad hospitalaria.',
        measurements: [
          'Mega Industrial 38"×55"',
          'Super Industrial 36"×40"',
          'Especial 23"×28"',
          'Industrial 30"×36"',
          'Multiuso Baño 18"×22"',
        ],
      },
      {
        name: 'Fundas para Vivero',
        details: 'Con Perforaciones o Sin Perforación según cultivo.',
        measurements: ['3"×10"', '5"×20"', '12"×22"', '14"×23.5"'],
      },
    ],
  },
];
