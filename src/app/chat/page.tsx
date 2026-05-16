'use client';

import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Bot, Send, User, MessageCircle, Headphones, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function getInitialMessage(chatType: string, productName: string | null): Message {
  if (chatType === 'product_owner' && productName) {
    return {
      id: '1',
      role: 'assistant',
      content: `¡Hola! 👋Estás hablando sobre: *${decodeURIComponent(productName)}*. Un vendedor de este producto te atenderá pronto. Mientras tanto, puedo ayudarte con información general sobre el producto. ¿Tienes alguna pregunta específica?`,
      timestamp: new Date(),
    };
  }
  return {
    id: '1',
    role: 'assistant' as const,
    content:
      '¡Hola! 👋 Soy el asistente de ventas de Ecuflow. Estoy aquí para ayudarte a encontrar el producto perfecto, resolver tus dudas sobre precios y envíos, o simplemente guiarte en tu compra. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date(),
  };
}

function ChatContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const chatType = searchParams.get('type') || 'sales';
  const productName = searchParams.get('productName');

  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialized.current) return [getInitialMessage(chatType, productName)];
    initialized.current = true;
    return [getInitialMessage(chatType, productName)];
  });

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
    const currentMessage = message;
    setMessage('');
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .slice(-10)
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        }));

      conversationHistory.push({ role: 'user', content: currentMessage });

      if (chatType === 'product_owner' && productName) {
        conversationHistory.unshift({
          role: 'system',
          content: `El usuario está interesado en el producto: "${decodeURIComponent(productName)}". Puedes dar información sobre este producto y redirigir al vendedor.`,
        });
      }

      setIsLoading(true);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await response.json();

      setIsLoading(false);
      setIsTyping(false);

      if (data.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.message,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Lo siento, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo.',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta más tarde.',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="relative flex-1 flex flex-col dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Header con tipo de chat */}
      <div className="relative z-10 px-4 pt-24 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-white/15 rounded-2xl">
            {chatType === 'product_owner' ? (
              <>
                <MessageCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Chat con vendedor
                  </span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white">
                    {productName ? decodeURIComponent(productName) : 'Producto'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <Headphones className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Equipo de Ventas
                  </span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white">
                    Asistente AI + Atención humana
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
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
                    'rounded-2xl px-4 py-3 shadow-lg border transition-all duration-300 backdrop-blur-xl whitespace-pre-wrap',
                    msg.role === 'user'
                      ? 'bg-cyan-500/90 dark:bg-cyan-500/80 border-cyan-400/50 dark:border-cyan-400/30 text-slate-900 dark:text-white rounded-tr-none shadow-cyan-500/20 dark:shadow-cyan-500/10'
                      : 'bg-white/70 dark:bg-slate-900/60 border-white/50 dark:border-white/15 text-slate-700 dark:text-slate-100 rounded-tl-none shadow-black/10 dark:shadow-black/30'
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words font-medium">
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
          {(isTyping || isLoading) && (
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

      {/* Chat Input */}
      <div className="mt-auto flex justify-center px-4 pb-6">
        <div className="relative w-full max-w-[85%] sm:max-w-4xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group">
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/50 backdrop-blur-3xl rounded-full shadow-lg shadow-black/10 dark:shadow-black/30 border border-white/50 dark:border-white/15 transition-all duration-500" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isTyping && !isLoading) sendMessage();
            }}
            className="relative z-10 flex items-center gap-3 px-4 sm:px-8"
          >
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isTyping || isLoading}
                className={cn(
                  'w-full h-13 lg:h-15 px-4 rounded-2xl transition-all duration-300',
                  'bg-transparent text-slate-700 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400',
                  'focus:outline-none focus:ring-0',
                  'text-sm sm:text-base font-medium',
                  (isTyping || isLoading) && 'opacity-50 cursor-not-allowed'
                )}
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim() || isTyping || isLoading}
              className={cn(actionButtonClass, 'disabled:opacity-50 disabled:cursor-not-allowed')}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <main className="relative flex-1 flex flex-col dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
        </div>
      </main>
    }>
      <ChatContent />
    </Suspense>
  );
}