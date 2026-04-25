"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { MessageCircle, Send } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "system",
      content: "Bienvenido a Ecuflow. ¿En qué podemos ayudarte? Puedes preguntar por productos, precios o coordinar el envío de tu pedido.",
    },
  ]);
  const items = useCartStore((s) => s.items);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user" as const, content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Gracias por tu mensaje. Un administrador te responderá pronto para coordinar los detalles de tu pedido, como el método de pago y la dirección de entrega.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex flex-col container max-w-2xl py-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Chat con Ecuflow</h1>
        </div>

        {items.length > 0 && (
          <div className="mb-4 rounded-md bg-muted p-3">
            <p className="text-sm font-medium">Productos en tu carrito:</p>
            <ul className="mt-1 text-sm text-muted-foreground">
              {items.map((item) => (
                <li key={item.product.id}>
                  {item.quantity}x {item.product.name} - ${item.product.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Ecuflow. Energía portátil en Cuba.</p>
        </div>
      </footer>
    </div>
  );
}