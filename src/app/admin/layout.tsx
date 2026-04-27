import { Header } from "@/components/header";
import { AdminNav } from "@/components/admin-nav";
import { Footer } from "@/components/footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <AdminNav />
              </div>
            </aside>

            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}