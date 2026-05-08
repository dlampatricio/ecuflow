export function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 mt-auto bg-slate-950">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs tracking-widest text-slate-500/80 uppercase">
          © {new Date().getFullYear()} ecuflow — Todos los derechos reservados
        </p>
        <div className="mt-4">
          <a
            href="https://dlampatricio.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300"
          >
            Design & Dev by David Lam
          </a>
        </div>
      </div>
    </footer>
  );
}
