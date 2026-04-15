import type { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cesped',
    name: 'Césped',
    icon: 'Leaf',
    image: '/cesped-esmeralda.jpg',
    description: 'Césped natural en rollos de la mejor calidad',
  },
  {
    id: 'riego',
    name: 'Riego Automático',
    icon: 'Droplets',
    image: '/riego-automatico.jpg',
    description: 'Sistemas de riego profesionales para tu jardín',
  },
  {
    id: 'plantas',
    name: 'Plantas',
    icon: 'Flower2',
    image: '/planta-ornamental.jpg',
    description: 'Plantas ornamentales y de interior',
  },
  {
    id: 'decoracion',
    name: 'Decoración',
    icon: 'Gem',
    image: '/piedras-decorativas.jpg',
    description: 'Piedras y elementos decorativos',
  },
  {
    id: 'piscina',
    name: 'Piscina',
    icon: 'Waves',
    image: '/bomba-piscina.jpg',
    description: 'Equipos y accesorios para piscinas',
  },
];

export const products: Product[] = [
  // Césped
  {
    id: 'cesped-esmeralda',
    name: 'Césped Esmeralda',
    description: 'Césped premium de color verde intenso, ideal para jardines con mucha exposición solar. Resistente y de rápido crecimiento.',
    price: 31000,
    originalPrice: 35000,
    image: '/cesped-esmeralda.jpg',
    category: 'cesped',
    rating: 5,
    reviews: 128,
    inStock: true,
    badge: 'Más Vendido',
    features: ['Alta resistencia al pisoteo', 'Color verde intenso todo el año', 'Ideal para zonas soleadas'],
  },
  {
    id: 'cesped-siempreverde',
    name: 'Césped Siempre Verde',
    description: 'Variedad resistente que mantiene su color durante todo el año. Perfecto para climas variados.',
    price: 25000,
    image: '/cesped-siempreverde.jpg',
    category: 'cesped',
    rating: 4,
    reviews: 89,
    inStock: true,
    features: ['Resistente a sequías', 'Bajo mantenimiento', 'Adaptable a diferentes suelos'],
  },
  {
    id: 'cesped-kavaju',
    name: 'Césped Kavaju',
    description: 'Excelente opción para zonas con sombra parcial. Textura fina y apariencia elegante.',
    price: 25000,
    image: '/cesped-kavaju.jpg',
    category: 'cesped',
    rating: 4,
    reviews: 67,
    inStock: true,
    features: ['Ideal para zonas sombreadas', 'Textura fina y suave', 'Crecimiento moderado'],
  },
  {
    id: 'mani-forrajero',
    name: 'Maní Forrajero',
    description: 'Planta tapizante perfecta para cubrir grandes áreas. Resistente y de fácil mantenimiento.',
    price: 30000,
    originalPrice: 35000,
    image: '/mani-forrajero.jpg',
    category: 'cesped',
    rating: 5,
    reviews: 45,
    inStock: true,
    badge: 'Oferta',
    features: ['Cubre rápidamente el suelo', 'Fija nitrógeno en el suelo', 'Resistente a pisoteo'],
  },
  // Riego
  {
    id: 'kit-riego-basico',
    name: 'Kit Riego Automático Básico',
    description: 'Sistema completo de riego automático para jardines pequeños y medianos. Fácil instalación.',
    price: 350000,
    originalPrice: 420000,
    image: '/riego-automatico.jpg',
    category: 'riego',
    rating: 5,
    reviews: 234,
    inStock: true,
    badge: 'Popular',
    features: ['Programador digital incluido', 'Cobertura hasta 100m²', 'Aspersores ajustables'],
  },
  {
    id: 'aspersor-rotativo',
    name: 'Aspersor Rotativo Rain Bird',
    description: 'Aspersor profesional de alto rendimiento para grandes áreas. Alcance ajustable.',
    price: 85000,
    image: '/riego-automatico.jpg',
    category: 'riego',
    rating: 4,
    reviews: 78,
    inStock: true,
    features: ['Alcance 5-10 metros', 'Ángulo ajustable', 'Alta durabilidad'],
  },
  // Plantas
  {
    id: 'planta-ornamental-1',
    name: 'Planta Ornamental Premium',
    description: 'Planta de interior de hojas exuberantes. Perfecta para decorar espacios interiores.',
    price: 95000,
    image: '/planta-ornamental.jpg',
    category: 'plantas',
    rating: 5,
    reviews: 156,
    inStock: true,
    features: ['Fácil cuidado', 'Purifica el aire', 'Maceta decorativa incluida'],
  },
  // Decoración
  {
    id: 'piedras-blancas',
    name: 'Piedras Decorativas Blancas',
    description: 'Piedras blancas de mármol para decorar jardines, caminos y macetas.',
    price: 15000,
    image: '/piedras-decorativas.jpg',
    category: 'decoracion',
    rating: 4,
    reviews: 203,
    inStock: true,
    features: ['Bolsa de 20kg', 'Tamaño mixto', 'Resistente a la intemperie'],
  },
  // Piscina
  {
    id: 'bomba-filtrado',
    name: 'Bomba de Filtrado para Piscina',
    description: 'Sistema completo de bomba y filtro para mantener el agua de tu piscina cristalina.',
    price: 310000,
    originalPrice: 380000,
    image: '/bomba-piscina.jpg',
    category: 'piscina',
    rating: 5,
    reviews: 89,
    inStock: true,
    badge: 'Recomendado',
    features: ['Capacidad 1HP', 'Filtro de arena incluido', 'Bajo consumo energético'],
  },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.badge);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
  }).format(price);
};
