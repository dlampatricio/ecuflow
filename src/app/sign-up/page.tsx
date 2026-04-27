import { SignUp } from "@clerk/nextjs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/[0.1]">
            <SignUp />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}