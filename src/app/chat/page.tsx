'use client';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { useUser } from '@clerk/nextjs';
import { Bot, Send, ShoppingBag, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        '¡Hola! Bienvenido a Ecuflow. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre productos, precios o coordinar el envío de tu pedido.',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const items = useCartStore((s) => s.items);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getAutoResponse(message),
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const getAutoResponse = (userMsg: string): string => {
    const lowerMsg = userMsg.toLowerCase();
    if (lowerMsg.includes('precio') || lowerMsg.includes('costo')) {
      return 'Nuestros precios están en USD y varían según el producto. ¿Hay algún producto en particular que te interese? Puedo darte más detalles.';
    }
    if (
      lowerMsg.includes('envío') ||
      lowerMsg.includes('envio') ||
      lowerMsg.includes('delivery')
    ) {
      return 'Realizamos envíos a toda Cuba. Los costos y tiempos varían según tu ubicación. ¿De qué provincia eres?';
    }
    if (lowerMsg.includes('pago') || lowerMsg.includes('transferencia')) {
      return 'Aceptamos transferencias bancarias y otros métodos de pago. Te explicaremos las opciones disponibles una vez confirmes tu pedido.';
    }
    return 'Gracias por tu mensaje. Un administrador te atenderá pronto para coordinar los detalles de tu pedido, método de pago y dirección de entrega.';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    // Quitamos h-screen para que el layout fluya naturalmente hacia el footer
    <main className="relative flex-1 dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col pt-20">
        {/* Cart strip */}
        {items.length > 0 && (
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 mb-2">
            <div className="px-4 py-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                  Tu Carrito Actual
                </span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="shrink-0 flex items-center gap-2 bg-white/60 dark:bg-white/5 rounded-xl p-1.5 border border-white/20 dark:border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={
                          item.product.images?.[0] || '/placeholder-product.jpg'
                        }
                        alt={item.product.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[10px] pr-2">
                      <p className="font-semibold text-slate-700 dark:text-white line-clamp-1 max-w-[80px]">
                        {item.product.name}
                      </p>
                      <p className="text-cyan-600 dark:text-cyan-400 font-bold">
                        ${item.product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Area - Quitamos flex-1 y overflow-y-auto para que use el scroll del body */}
        <div className="px-4 sm:px-6 lg:px-10 pt-4 pb-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500',
                  msg.role === 'user' && 'flex-row-reverse',
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105',
                    msg.role === 'user'
                      ? 'bg-cyan-500 shadow-cyan-500/20'
                      : 'bg-white dark:bg-slate-900 border border-white/40 dark:border-white/10 backdrop-blur-xl',
                  )}
                >
                  {msg.role === 'user' ? (
                    user?.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <User className="h-5 w-5 text-slate-900" />
                    )
                  ) : (
                    <Bot className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[85%] sm:max-w-[70%]',
                    msg.role === 'user' ? 'items-end' : 'items-start',
                  )}
                >
                  <div
                    className={cn(
                      'rounded-2xl px-4 py-3 shadow-sm border transition-all duration-300',
                      msg.role === 'user'
                        ? 'bg-cyan-500 border-cyan-400 text-slate-900 rounded-tr-none'
                        : 'bg-white/80 dark:bg-slate-900/80 border-white/50 dark:border-white/10 backdrop-blur-xl text-slate-700 dark:text-slate-200 rounded-tl-none',
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                  <p
                    className={cn(
                      'text-[10px] mt-1.5 font-medium opacity-40',
                      msg.role === 'user' ? 'text-right' : 'text-left',
                    )}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 sm:gap-4 animate-in fade-in duration-300">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white dark:bg-slate-900 border border-white/40 dark:border-white/10 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                </div>
                <div className="bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 backdrop-blur-xl rounded-2xl rounded-tl-none px-5 py-4 flex gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* --- CAMBIO CLAVE: Floating Header-Style Input --- */}
        {/* Cambiamos 'fixed' por 'sticky' y 'bottom-0' por 'bottom-8' */}
        {/* Esto hace que flote mientras haces scroll, pero se detenga al llegar al final del contenedor (antes del footer) */}
        <div className="sticky bottom-0 z-40 flex justify-center px-4 mt-auto h-10">
          <div className="relative w-full max-w-[50%] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group">
            {/* Capa de Fondo */}
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/60 backdrop-blur-3xl rounded-4xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/50 dark:border-white/10 transition-all duration-500" />

            {/* Formulario */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="relative z-10 flex h-16 sm:h-20 items-center gap-3 px-4 sm:px-8"
            >
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className={cn(
                    'w-full h-11 sm:h-13 px-5 rounded-2xl transition-all duration-300',
                    'text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30',
                    'focus:outline-none focus:ring-none focus:bg-white/80 dark:focus:bg-white/10',
                    'text-sm sm:text-base',
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className={cn(
                  'relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-2xl transition-all duration-300 ease-out',
                  'bg-cyan-500 text-slate-900 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]',
                  'hover:scale-105 active:scale-95 group-hover:rotate-1',
                  'disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed disabled:scale-100',
                )}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
