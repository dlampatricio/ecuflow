import { SignUp } from "@clerk/nextjs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-8 pt-28">
        <div className="w-full max-w-md">
          <SignUp />
        </div>
      </main>
      <Footer />
    </div>
  );
}