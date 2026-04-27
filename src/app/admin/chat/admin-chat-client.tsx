"use client";

import { useState } from "react";
import { MessageCircle, Send, User, Search, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatThread {
  id: string;
  user: string;
  email: string;
  lastMessage: string;
  unread: boolean;
  messages: ChatMessage[];
}

const mockChats: ChatThread[] = [
  {
    id: "1",
    user: "Juan Pérez",
    email: "juan@email.com",
    lastMessage: "Hola, me interesa el PowerBank 20000mAh",
    unread: true,
    messages: [
      {
        id: "1",
        role: "user",
        content: "Hola, me interesa el PowerBank 20000mAh",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "2",
    user: "María García",
    email: "maria@email.com",
    lastMessage: "Gracias por la información",
    unread: false,
    messages: [
      {
        id: "1",
        role: "user",
        content: "Buenos días, tienen envío a Varadero?",
        timestamp: new Date(),
      },
      {
        id: "2",
        role: "assistant",
        content: "Sí, enviamos a todo Cuba. El costo depende de tu ubicación.",
        timestamp: new Date(),
      },
      {
        id: "3",
        role: "user",
        content: "Gracias por la información",
        timestamp: new Date(),
      },
    ],
  },
];

export function AdminChatClient() {
  const [selectedChat, setSelectedChat] = useState<ChatThread | null>(mockChats[0]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    setMessage("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" />
          <input
            type="text"
            placeholder="Buscar conversaciones..."
            className="w-full h-11 pl-11 pr-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "w-full p-4 rounded-2xl text-left transition-colors",
                selectedChat?.id === chat.id
                  ? "bg-cyan-500/10 border border-cyan-500/30"
                  : "bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] hover:bg-white/60 dark:hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-cyan-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-800 dark:text-white truncate">
                      {chat.user}
                    </p>
                    {chat.unread && (
                      <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-white/50 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedChat ? (
          <div className="h-[500px] rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] flex flex-col">
            <div className="p-4 border-b border-white/60 dark:border-white/[0.1]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {selectedChat.user}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/50">
                      {selectedChat.email}
                    </p>
                  </div>
                </div>
                <button className="p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors">
                  <Eye className="h-4 w-4 text-slate-400 dark:text-white/40" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      msg.role === "user"
                        ? "bg-cyan-500 text-slate-900"
                        : "bg-white/40 dark:bg-white/[0.06] text-slate-700 dark:text-white"
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/60 dark:border-white/[0.1]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="flex-1 h-11 rounded-2xl border border-white/60 dark:border-white/[0.1] bg-white/40 dark:bg-white/[0.06] px-4 text-sm text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="h-11 px-4 rounded-2xl bg-cyan-500 text-slate-900 hover:bg-cyan-400 disabled:opacity-50 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[500px] rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-slate-300 dark:text-white/20 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-white/50">
                Selecciona una conversación
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}