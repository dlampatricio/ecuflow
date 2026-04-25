# Ecuflow

Tienda online de powerbanks y productos EcoFlow para Cuba.

## Stack Tecnológico

- **Frontend**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS
- **UI Components**: shadcn/ui principles
- **Estado Global**: Zustand (carrito)
- **Datos**: TanStack Query
- **Mutaciones**: Server Actions
- **Base de Datos**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **Imágenes**: Supabase Storage + Next.js Image
- **Realtime**: Supabase Realtime (chat)
- **PWA**: Service Worker para offline
- **Deploy**: Vercel

## Variables de Entorno

Copiar `.env.local.example` a `.env.local` y completar:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Setup

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar el schema SQL en `supabase/schema.sql`
3. Crear proyecto en [Clerk](https://clerk.com)
4. Configurar Clerk con Supabase
5. `npm install`
6. `npm run dev`

## Estructura

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rutas de autenticación
│   ├── productos/         # Catálogo de productos
│   ├── carrito/           # Carrito de compras
│   ├── chat/             # Chat con admin
│   └── categorias/       # Filtro por categoría
├── components/           # Componentes reutilizables
├── lib/                  # Utilidades y clientes
├── stores/               # Zustand stores
├── actions/              # Server Actions
└── types/                # Tipos TypeScript
```

## Features

- Catálogo de productos con imágenes y especificaciones
- Carrito persistente en localStorage
- Sistema de chat en tiempo real (tipo WhatsApp)
- Panel de administración
- PWA para instalación en dispositivos móviles
- Soporte offline (catálogo cacheado)
- Resiliencia de red (retry automático)