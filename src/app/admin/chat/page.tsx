import { AdminChatClient } from "./admin-chat-client";

export const metadata = {
  title: "Mensajes - Admin - Ecuflow",
  description: "Gestión de mensajes",
};

export default function AdminChatPage() {
  return (
    <main className="flex-1 pt-28 pb-20 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800 dark:text-white mb-2">
            Mensajes
          </h1>
          {/* TODO: Mostrar contador real de mensajes sin leer */}
          <p className="text-slate-500 dark:text-white/50">
            --
          </p>
        </div>

        <AdminChatClient />
      </div>
    </main>
  );
}