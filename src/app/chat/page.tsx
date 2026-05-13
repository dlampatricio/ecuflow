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

  const actionButtonClass =
    'relative flex h-10 w-10 items-center justify-center rounded-2xl ' +
    'bg-black/5 dark:bg-white/5 backdrop-blur-xl ' +
    'border border-black/5 dark:border-white/10 ' +
    'text-slate-700 dark:text-slate-300 ' +
    'hover:text-black dark:hover:text-white ' +
    'hover:bg-white/60 dark:hover:bg-white/10 ' +
    'transition-all duration-300 ease-out ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]';

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
    if (lowerMsg.includes('envío') || lowerMsg.includes('envio') || lowerMsg.includes('delivery')) {
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
    // Usamos flex-1 para que el main ocupe todo el espacio disponible antes del footer
    <main className="relative flex-1 flex flex-col dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col flex-1 pt-20">
        {/* Cart strip */}
        {items.length > 0 && (
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 mb-2">
            <div className="px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-white/15 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                  Tu Carrito Actual
                </span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="shrink-0 flex items-center gap-2 bg-white/60 dark:bg-white/8 rounded-xl p-1.5 border border-white/30 dark:border-white/15 backdrop-blur-sm shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.images?.[0] || '/placeholder-product.jpg'}
                        alt={item.product.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[10px] pr-2">
                      <p className="font-semibold text-slate-700 dark:text-white line-clamp-1 max-w-20">
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

        {/* Messages Area - Usamos flex-1 para que ocupe el espacio disponible */}
        <div className="px-4 sm:px-6 lg:px-10 pt-4 pb-10 flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500',
                  msg.role === 'user' && 'flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl'
                  )}
                >
                  {msg.role === 'user' ? (
                    user?.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt="Avatar"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover rounded-full"
                        unoptimized
                      />
                    ) : (
                      <User className="h-5 w-5 text-cyan-600 dark:text-cyan-400'" />
                    )
                  ) : (
                    <Bot className={'h-5 w-5 text-cyan-600 dark:text-cyan-400'} />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[85%] sm:max-w-[70%]',
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  <div
                    className={cn(
                      'rounded-2xl px-4 py-3 shadow-lg border transition-all duration-300 backdrop-blur-xl',
                      msg.role === 'user'
                        ? 'bg-cyan-500/90 dark:bg-cyan-500/80 border-cyan-400/50 dark:border-cyan-400/30 text-slate-900 dark:text-white rounded-tr-none shadow-cyan-500/20 dark:shadow-cyan-500/10'
                        : 'bg-white/70 dark:bg-slate-900/60 border-white/50 dark:border-white/15 text-slate-700 dark:text-slate-100 rounded-tl-none shadow-black/10 dark:shadow-black/30'
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word font-medium">
                      {msg.content}
                    </p>
                  </div>
                  <p
                    className={cn(
                      'text-[10px] mt-2 font-medium text-slate-500 dark:text-slate-400',
                      msg.role === 'user' ? 'text-right' : 'text-left'
                    )}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 sm:gap-4 animate-in fade-in duration-300">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 dark:bg-white/8 border border-black/5 dark:border-white/15 backdrop-blur-xl flex items-center justify-center shrink-0 shadow-lg shadow-black/5 dark:shadow-black/20">
                  <Bot className="h-5 w-5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                </div>
                <div className="bg-white/70 dark:bg-slate-900/60 border border-white/50 dark:border-white/15 backdrop-blur-xl rounded-2xl rounded-tl-none px-5 py-4 flex gap-1.5 shadow-lg shadow-black/10 dark:shadow-black/30">
                  <span
                    className="w-2 h-2 rounded-full bg-cyan-500/80 animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-cyan-500/80 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-cyan-500/80 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* --- CHAT INPUT --- */}
        <div className="mt-auto flex justify-center px-4">
          <div className="relative w-full max-w-[85%] sm:max-w-4xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group">
            {/* Capa de Fondo */}
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/50 backdrop-blur-3xl rounded-full shadow-lg shadow-black/10 dark:shadow-black/30 border border-white/50 dark:border-white/15 transition-all duration-500" />

            {/* Formulario */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="relative z-10 flex items-center gap-3 px-4 sm:px-8"
            >
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className={cn(
                    'w-full h-13 lg:h-15 px-4 rounded-2xl transition-all duration-300',
                    'bg-transparent text-slate-700 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400',
                    'focus:outline-none focus:ring-0',
                    'text-sm sm:text-base font-medium'
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className={cn(actionButtonClass, 'disabled:opacity-50 disabled:cursor-not-allowed')}
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
