import { SignIn } from "@clerk/nextjs";
import { Header } from "@/components/header";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center p-8">
        <SignIn />
      </main>
    </div>
  );
}