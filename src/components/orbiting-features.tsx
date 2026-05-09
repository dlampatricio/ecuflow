'use client';
import { MessageCircle, Shield, Truck, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Generador pseudo-aleatorio determinístico (función pura, sin Math.random en render)
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

const satellites = [
  { icon: Truck, label: 'Envío a toda Cuba', accent: 'cyan' },
  { icon: Shield, label: 'Garantía Oficial', accent: 'emerald' },
  { icon: Zap, label: 'Alta Potencia', accent: 'amber' },
  { icon: MessageCircle, label: 'Soporte 24/7', accent: 'violet' },
];

const accentMap: Record<
  string,
  { ring: string; bg: string; text: string; glow: string }
> = {
  cyan: {
    ring: 'group-hover:ring-cyan-400/40',
    bg: 'bg-cyan-500/20',
    text: 'group-hover:text-cyan-300',
    glow: 'shadow-cyan-500/20',
  },
  emerald: {
    ring: 'group-hover:ring-emerald-400/40',
    bg: 'bg-emerald-500/20',
    text: 'group-hover:text-emerald-300',
    glow: 'shadow-emerald-500/20',
  },
  amber: {
    ring: 'group-hover:ring-amber-400/40',
    bg: 'bg-amber-500/20',
    text: 'group-hover:text-amber-300',
    glow: 'shadow-amber-500/20',
  },
  violet: {
    ring: 'group-hover:ring-violet-400/40',
    bg: 'bg-violet-500/20',
    text: 'group-hover:text-violet-300',
    glow: 'shadow-violet-500/20',
  },
};

interface Star {
  key: number;
  width: number;
  height: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  opacity: number;
}

function round(n: number, decimals = 3) {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

const stars: Star[] = Array.from({ length: 30 }, (_, i) => ({
  key: i,
  width: round(1 + seededRandom(i * 1.1) * 2),
  height: round(1 + seededRandom(i * 2.3) * 2),
  left: round(5 + seededRandom(i * 3.7) * 90),
  top: round(5 + seededRandom(i * 5.1) * 90),
  delay: round(seededRandom(i * 7.2) * 4),
  duration: round(2 + seededRandom(i * 11.3) * 4),
  opacity: round(0.15 + seededRandom(i * 13.7) * 0.35),
}));

export const OrbitingFeatures = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-105 md:h-130 lg:h-150 flex items-center justify-center overflow-visible">
      {/* ── Estrellas de fondo ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.key}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Auras de fondo ── */}
      <div className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
      <div
        className="absolute w-48 h-48 md:w-64 md:h-64 bg-cyan-400/15 rounded-full blur-[80px] animate-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      {/* ── Sistema de órbitas 3D ── */}
      <div className="absolute inset-0 flex items-center justify-center orbit-container">
        {/* Anillo exterior */}
        <div className="orbit-ring orbit-ring-outer" />
        {/* Anillo principal */}
        <div className="orbit-ring orbit-ring-main" />
        {/* Anillo interior */}
        <div className="orbit-ring orbit-ring-inner" />

        {/* Satélites */}
        {satellites.map((sat, i) => {
          const Icon = sat.icon;
          const isHovered = hoveredIndex === i;
          const accent = accentMap[sat.accent];

          return (
            <div
              key={sat.label}
              className="animate-orbit"
              style={{ animationDelay: `-${i * (20 / satellites.length)}s` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`
                  satellite-card group
                  flex items-center gap-1.5 md:gap-2.5
                  px-2.5 py-1.5 md:px-4 md:py-2.5
                  rounded-xl md:rounded-2xl
                  bg-white/8 dark:bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  ring-1 ring-transparent ${accent.ring}
                  shadow-lg ${isHovered ? accent.glow : 'shadow-white/5'}
                  transition-all duration-300 ease-out
                  cursor-pointer
                `}
              >
                {/* Icono */}
                <div
                  className={`
                  flex items-center justify-center shrink-0
                  w-7 h-7 md:w-9 md:h-9
                  rounded-lg md:rounded-xl
                  ${accent.bg}
                  border border-white/10
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                  transition-transform duration-300
                  group-hover:rotate-12
                `}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-white drop-shadow-md" />
                </div>

                {/* Label — visible solo en md+ */}
                <span
                  className={`
                  hidden md:block
                  text-[10px] md:text-[11px] font-bold uppercase tracking-wider
                  text-slate-300 whitespace-nowrap
                  transition-colors duration-300 ${accent.text}
                `}
                >
                  {sat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Producto Central ── */}
      <div className="relative z-10 w-44 h-44 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
        {/* Anillos decorativos giratorios alrededor del producto */}
        <div
          className="absolute inset-0 rounded-full border border-cyan-500/15 animate-spin"
          style={{ animationDuration: '12s' }}
        />
        <div
          className="absolute inset-3 rounded-full border border-cyan-400/10 animate-spin"
          style={{ animationDuration: '18s', animationDirection: 'reverse' }}
        />

        {/* 4. CONTENEDOR DEL HOLOGRAMA - Tamaño aumentado */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-100 lg:h-100 flex items-center justify-center animate-hologram-float group-hover:scale-110 transition-transform duration-700 ease-out">
          {/* Aura interna: ahora más suave para no "lavar" los colores de la imagen */}
          <div className="absolute inset-4 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-400/20 transition-colors duration-700" />

          {/* CAPA 1: Imagen Base - Máxima prioridad y opacidad */}
          <div className="absolute inset-0 z-30 flex items-center justify-center p-2">
            <Image
              src="/ecuflow.png"
              alt="EcoFlow Base"
              fill
              priority
              className="object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              sizes="(max-width: 768px) 256px, (max-width: 1200px) 320px, 400px"
            />
          </div>

          {/* CAPA 2: "Ghost" Cian - Reducido el desplazamiento para ganar legibilidad */}
          <div className="absolute inset-0 z-20 opacity-30 mix-blend-screen blur-[0.5px] translate-x-0.5 animate-hologram-glitch-1 pointer-events-none">
            <Image
              src="/ecuflow.png"
              alt="EcoFlow Cyan Ghost"
              fill
              className="object-contain tailwind-filter-cyan"
              sizes="400px"
            />
          </div>

          {/* CAPA 3: "Ghost" Magenta */}
          <div className="absolute inset-0 z-10 opacity-20 mix-blend-screen blur-[0.5px] -translate-x-0.5 animate-hologram-glitch-2 pointer-events-none">
            <Image
              src="/ecuflow.png"
              alt="EcoFlow Magenta Ghost"
              fill
              className="object-contain tailwind-filter-magenta"
              sizes="400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
