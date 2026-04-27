import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdminChatClient } from "./admin-chat-client";

export const metadata = {
  title: "Mensajes - Admin - Ecuflow",
  description: "Gestión de mensajes",
};

export default function AdminChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-white mb-2">
                Mensajes
              </h1>
              <p className="text-slate-500 dark:text-white/50">
                2 mensajes sin leer
              </p>
            </div>
          </div>

          <AdminChatClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}