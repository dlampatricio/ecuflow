'use client';

import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { useUser } from '@clerk/nextjs';
import { Bot, MessageCircle, Send, ShoppingBag, User } from 'lucide-react';
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
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      // eslint-disable-next-line react-hooks/purity
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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-20 pb-20 flex flex-col max-w-3xl mx-auto w-full px-4">
        <div className="flex items-center gap-3 py-6 border-b border-white/30 dark:border-white/[0.1]">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800 dark:text-white">
              Ecuflow
            </h1>
            <p className="text-xs text-slate-500 dark:text-white/50">
              Estamos aquí para ayudarte
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="my-6 p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-semibold text-slate-700 dark:text-white">
                Productos en tu carrito
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {items.map((item) => {
                const images = item.product.images || [];
                const mainImage = images[0] || '/placeholder-product.jpg';

                return (
                  <div
                    key={item.product.id}
                    className="flex-shrink-0 flex items-center gap-2 bg-white/40 dark:bg-slate-900/50 rounded-xl p-2"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/40 dark:bg-white/10">
                      <Image
                        src={mainImage}
                        alt={item.product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-700 dark:text-white line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-white/50">
                        {item.quantity}x ${item.product.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3 animate-fade-up',
                msg.role === 'user' && 'flex-row-reverse',
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden', // Añadido overflow-hidden
                  msg.role === 'user'
                    ? 'bg-cyan-500'
                    : 'bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]',
                )}
              >
                {msg.role === 'user' ? (
                  user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || 'Usuario'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-slate-900" />
                  )
                ) : (
                  <Bot className="h-5 w-5 text-slate-700 dark:text-white" />
                )}
              </div>

              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-5 py-3',
                  msg.role === 'user'
                    ? 'bg-cyan-500 text-slate-900 rounded-tr-md'
                    : 'bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] rounded-tl-md text-slate-700 dark:text-white',
                )}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p
                  className={cn(
                    'text-[10px] mt-2',
                    msg.role === 'user'
                      ? 'text-slate-900/70'
                      : 'text-slate-400 dark:text-white/40',
                  )}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-up">
              <div className="w-10 h-10 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] flex items-center justify-center">
                <Bot className="h-5 w-5 text-slate-700 dark:text-white" />
              </div>
              <div className="bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] rounded-2xl rounded-tl-md px-5 py-3">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40 animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/40 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="py-4 border-t border-white/30 dark:border-white/[0.1]"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 h-14 rounded-2xl border border-white/60 dark:border-white/[0.1] bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl px-5 text-sm placeholder:text-slate-400 dark:placeholder:text-white/40 text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="h-14 px-6 rounded-2xl bg-cyan-500 text-slate-900 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
