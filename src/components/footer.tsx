export function Footer() {
  return (
    <footer className="relative mt-24 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border-t border-white/20 dark:border-white/10">

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300/50 dark:via-white/20 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 tracking-wide">
            © {new Date().getFullYear()} <span className="font-medium text-slate-700 dark:text-slate-200">ecuflow</span>. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
            <span className="tracking-widest uppercase">Minimal • Futuro • Limpio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}