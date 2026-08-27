import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative w-full rounded-2xl overflow-hidden mb-8 border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-sm">
      <div className="w-full h-52 sm:h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src="/images/hero/heroexempel-light.webp"
          alt="InfoFynd Hero"
          className="w-full h-full object-cover block dark:hidden"
        />
        <img
          src="/images/hero/heroexempel-dark.webp"
          alt="InfoFynd Hero"
          className="w-full h-full object-cover hidden dark:block"
        />
      </div>

      <div className="p-6 sm:p-8 space-y-3">
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
          Nyheter & Erbjudanden
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Välkommen till{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            InfoFynd
          </span>
        </h1>

        <p className="text-sm sm:text-base leading-relaxed max-w-2xl opacity-90">
          Här samlar vi aktuella nyheter och lokala kampanjer. Bli medlem för
          att ta del av alla erbjudanden och rabattkoder.
        </p>
        <div className="pt-2">
          <Link
            to="/nymedlem"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
          >
            Bli medlem idag
          </Link>
        </div>
      </div>
    </section>
  );
}
