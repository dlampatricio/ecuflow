"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MessageCircle, Send, User, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: "open" | "closed";
}

interface Message {
  id: string;
  sender: "user" | "admin";
  content: string;
  timestamp: string;
  read: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    customer: { name: "Juan Pérez", email: "juan@email.com" },
    lastMessage: "¿Cuánto tarda el envío a La Habana?",
    timestamp: "Hace 5 min",
    unread: 2,
    status: "open",
  },
  {
    id: "2",
    customer: { name: "María García", email: "maria@email.com" },
    lastMessage: "Perfecto, muchas gracias",
    timestamp: "Hace 1 hora",
    unread: 0,
    status: "open",
  },
  {
    id: "3",
    customer: { name: "Carlos López", email: "carlos@email.com" },
    lastMessage: "Quiero hacer un pedido del Delta 2",
    timestamp: "Hace 3 horas",
    unread: 1,
    status: "open",
  },
  {
    id: "4",
    customer: { name: "Ana Rodríguez", email: "ana@email.com" },
    lastMessage: "¿Aceptan pago por transferencia bancaria?",
    timestamp: "Ayer",
    unread: 0,
    status: "closed",
  },
];

const messagesByConversation: Record<string, Message[]> = {
  "1": [
    { id: "1", sender: "user", content: "Hola, me interesa el EcoFlow River 2 Max", timestamp: "10:30", read: true },
    { id: "2", sender: "admin", content: "¡Hola Juan! Sí, tenemos disponible. ¿En qué puedo ayudarte?", timestamp: "10:32", read: true },
    { id: "3", sender: "user", content: "¿Cuánto tarda el envío a La Habana?", timestamp: "10:35", read: true },
    { id: "4", sender: "admin", content: "El envío a La Habana tarda entre 24-48 horas hábiles. Podemos enviarlo con entrega en domicilio o para recoger en punto de entrega.", timestamp: "10:36", read: true },
    { id: "5", sender: "user", content: "¿Y el costo del envío?", timestamp: "10:38", read: false },
    { id: "6", sender: "user", content: "¿Cuánto cuesta el envío a La Habana?", timestamp: "10:40", read: false },
  ],
  "2": [
    { id: "1", sender: "user", content: "Hola, quiero información sobre los powerbanks", timestamp: "09:00", read: true },
    { id: "2", sender: "admin", content: "¡Hola María! Tenemos varios modelos disponibles. ¿Buscas algo específico?", timestamp: "09:05", read: true },
    { id: "3", sender: "user", content: "Sí, algo de alta capacidad para cargar laptops", timestamp: "09:10", read: true },
    { id: "4", sender: "admin", content: "Te recomiendo el PowerBank 20000mAh Ultra con carga de 65W, es perfecto para laptops.", timestamp: "09:12", read: true },
    { id: "5", sender: "user", content: "Perfecto, muchas gracias", timestamp: "09:15", read: true },
  ],
  "3": [
    { id: "1", sender: "user", content: "Quiero hacer un pedido del Delta 2", timestamp: "15:00", read: true },
    { id: "2", sender: "admin", content: "¡Hola Carlos! El EcoFlow Delta 2 está disponible a $899. ¿Quieres que procese tu pedido?", timestamp: "15:05", read: false },
  ],
  "4": [
    { id: "1", sender: "user", content: "¿Aceptan pago por transferencia bancaria?", timestamp: "14:00", read: true },
    { id: "2", sender: "admin", content: "Sí, aceptamos transferencias bancarias. Te proporcionaremos los datos para realizar el pago.", timestamp: "14:05", read: true },
  ],
};

export default function AdminChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter((conv) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        conv.customer.name.toLowerCase().includes(query) ||
        conv.customer.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  useEffect(() => {
    if (selectedConversation) {
      setChatMessages(messagesByConversation[selectedConversation.id] || []);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "admin",
      content: message,
      timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex h-full rounded-xl border bg-card overflow-hidden">
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold mb-3">Conversaciones</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "w-full p-4 text-left hover:bg-muted/50 transition-colors border-b",
                  selectedConversation?.id === conv.id && "bg-primary/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conv.customer.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {conv.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      conv.status === "open" ? "bg-green-500" : "bg-muted-foreground"
                    )}
                  />
                  <span className="text-xs text-muted-foreground">
                    {conv.status === "open" ? "Abierta" : "Cerrada"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {selectedConversation.customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.customer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Circle
                    className={cn(
                      "h-2 w-2 fill-current",
                      selectedConversation.status === "open"
                        ? "text-green-500"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="text-xs text-muted-foreground">
                    {selectedConversation.status === "open" ? "En línea" : "Desconectado"}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3",
                      msg.sender === "admin" && "flex-row-reverse"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        msg.sender === "admin" ? "bg-primary" : "bg-secondary"
                      )}
                    >
                      {msg.sender === "admin" ? (
                        <MessageCircle className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2",
                        msg.sender === "admin"
                          ? "bg-primary text-primary-foreground rounded-tr-md"
                          : "bg-secondary rounded-tl-md"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div
                        className={cn(
                          "flex items-center gap-1 mt-1",
                          msg.sender === "admin" && "justify-end"
                        )}
                      >
                        <span className="text-[10px] opacity-70">
                          {formatTime(msg.timestamp)}
                        </span>
                        {msg.sender === "admin" && msg.read && (
                          <Check className="h-3 w-3 opacity-70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Escribe tu respuesta..."
                    className="flex-1 h-11 rounded-lg border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="h-11 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Selecciona una conversación para comenzar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}