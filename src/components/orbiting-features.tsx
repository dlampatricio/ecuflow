'use client';
import { MessageCircle, Shield, Truck, Zap } from 'lucide-react';
import Image from 'next/image';

const satellites = [
  { icon: Truck, label: 'Envío a toda Cuba' },
  { icon: Shield, label: 'Garantía Oficial' },
  { icon: Zap, label: 'Alta Potencia' },
  { icon: MessageCircle, label: 'Soporte 24/7' },
];

export const OrbitingFeatures = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-100 md:h-150 flex items-center justify-center overflow-visible">
      {/* 1. Aura de fondo */}
      <div className="absolute w-72 h-72 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />

      {/* 2. SISTEMA DE ÓRBITAS */}
      <div className="absolute inset-0 flex items-center justify-center orbit-container">
        <div className="orbit-ring" />
        {satellites.map((sat, i) => {
          return (
            <div
              key={sat.label}
              className="animate-orbit"
              style={{ animationDelay: `-${i * (20 / satellites.length)}s` }}
            >
              {/* Card del Satélite con contra-giro */}
              <div className="satellite-card flex items-center gap-3 p-2 md:p-3 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-2xl group hover:scale-110 transition-transform">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <sat.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 pr-2 hidden sm:block">
                  {sat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. PRODUCTO CENTRAL */}
      <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center group overflow-hidden">
          <Image
            src="/ecuflow.png"
            alt="EcoFlow"
            fill
            priority
            className="z-20 object-contain p-10 drop-shadow-[0_0_40px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 256px, 384px"
          />
        </div>
      </div>
    </div>
  );
};
