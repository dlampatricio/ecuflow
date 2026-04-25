import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "PowerBank 20000mAh Ultra",
    slug: "powerbank-20000mah-ultra",
    description:
      "PowerBank de alta capacidad con carga rápida. Ideal para viajes y uso diario. Compatible con todos tus dispositivos.",
    price: 45,
    currency: "USD",
    category: "powerbanks",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f04516d?w=800",
      "https://images.unsplash.com/photo-1609091839311-d5365f04516d?w=800",
    ],
    specs: [
      { label: "Capacidad", value: "20000mAh" },
      { label: "Salida", value: "65W PD" },
      { label: "Entrada", value: "45W PD" },
      { label: "Peso", value: "350g" },
    ],
    stock: 15,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "EcoFlow River 2 Max",
    slug: "ecoflow-river-2-max",
    description:
      "Estación de energía portátil con 512Wh de capacidad. Perfecta para camping, emergencias o como respaldo en el hogar.",
    price: 499,
    currency: "USD",
    category: "ecoflow",
    images: [
      "https://images.unsplash.com/photo-1609692814857-d9d3d5f72d57?w=800",
    ],
    specs: [
      { label: "Capacidad", value: "512Wh" },
      { label: "Potencia", value: "500W (1000W pico)" },
      { label: "Salidas AC", value: "4" },
      { label: "Carga solar", value: "220W máx" },
    ],
    stock: 5,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "EcoFlow Delta 2",
    slug: "ecoflow-delta-2",
    description:
      "Estación de energía de alta potencia con 1024Wh. Puede alimentar electrodomésticos de alta demanda.",
    price: 899,
    currency: "USD",
    category: "ecoflow",
    images: [
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800",
    ],
    specs: [
      { label: "Capacidad", value: "1024Wh" },
      { label: "Potencia", value: "1500W (2400W pico)" },
      { label: "Salidas AC", value: "6" },
      { label: "Carga solar", value: "500W máx" },
    ],
    stock: 3,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Panel Solar 160W",
    slug: "panel-solar-160w",
    description:
      "Panel solar portátil plegable de alta eficiencia. Perfecto para cargar estaciones EcoFlow en exteriores.",
    price: 249,
    currency: "USD",
    category: "solar_panels",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    ],
    specs: [
      { label: "Potencia", value: "160W" },
      { label: "Voltaje", value: "18V" },
      { label: "Eficiencia", value: "22-23%" },
      { label: "Plegable", value: "Sí" },
    ],
    stock: 8,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "PowerBank 10000mAh Mini",
    slug: "powerbank-10000mah-mini",
    description:
      "PowerBank compacto y ligero. Perfecto para llevar en el bolsillo. Carga rápida PD 20W.",
    price: 25,
    currency: "USD",
    category: "powerbanks",
    images: [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800",
    ],
    specs: [
      { label: "Capacidad", value: "10000mAh" },
      { label: "Salida", value: "20W PD" },
      { label: "Peso", value: "180g" },
      { label: "Tamaño", value: "Compact" },
    ],
    stock: 20,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "EcoFlow River 2",
    slug: "ecoflow-river-2",
    description:
      "Estación de energía compacta con 256Wh. Ideal para emergencias domésticas y aventuras.",
    price: 299,
    currency: "USD",
    category: "ecoflow",
    images: [
      "https://images.unsplash.com/photo-1609692814857-d9d3d5f72d57?w=800",
    ],
    specs: [
      { label: "Capacidad", value: "256Wh" },
      { label: "Potencia", value: "300W (600W pico)" },
      { label: "Salidas AC", value: "2" },
      { label: "Carga solar", value: "110W máx" },
    ],
    stock: 7,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Cable USB-C 100W",
    slug: "cable-usb-c-100w",
    description:
      "Cable de carga rápida USB-C a USB-C de alta calidad. 100W Power Delivery.",
    price: 15,
    currency: "USD",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800",
    ],
    specs: [
      { label: "Potencia", value: "100W" },
      { label: "Longitud", value: "1.5m" },
      { label: "Velocidad", value: "USB 3.2" },
      { label: "Material", value: "Nylon trenzado" },
    ],
    stock: 50,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Adaptador Universal",
    slug: "adaptador-universal",
    description:
      "Adaptador de enchufe universal para Cuba. Compatible con enchufes americanos y europeos.",
    price: 10,
    currency: "USD",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1544866252-2ca7e3e1f3a1?w=800",
    ],
    specs: [
      { label: "Tipo", value: "Universal" },
      { label: "Compatibilidad", value: "EE.UU., UE, UK" },
      { label: "USB ports", value: "2x USB-A + 1x USB-C" },
      { label: "Amperaje", value: "3.4A" },
    ],
    stock: 30,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Panel Solar 400W",
    slug: "panel-solar-400w",
    description:
      "Panel solar de alta potencia para instalaciones profesionales. Ideal para cargar múltiples dispositivos.",
    price: 449,
    currency: "USD",
    category: "solar_panels",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    ],
    specs: [
      { label: "Potencia", value: "400W" },
      { label: "Voltaje", value: "40V" },
      { label: "Eficiencia", value: "23%" },
      { label: "Dimensiones", value: "2358x1086mm" },
    ],
    stock: 4,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}