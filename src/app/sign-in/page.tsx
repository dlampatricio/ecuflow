import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10">
          <SignIn />
        </div>
      </div>
    </main>
  );
}
