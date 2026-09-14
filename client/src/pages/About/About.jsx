export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full">
          Vilka vi är
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Om InfoFynd
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          InfoFynd drivs av Bock AB och är din självklara samlingsplats för de
          smartaste konsumenttipsen, erbjudandena och nyheterna på nätet.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Vår vision
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Vi vill göra det enklare för konsumenter att hitta relevanta
            erbjudanden och hålla sig uppdaterade utan att behöva sålla igenom
            onödigt brus. Genom att samla noga utvalda tips på ett ställe skapar
            vi ett mervärde för våra medlemmar.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Som medlem får du full tillgång till våra unika utskick,
            specialerbjudanden och fullständiga guider direkt i din inkorg.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Trygghet & GDPR
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Vi på Bock AB värnar om din integritet. All hantering av
            personuppgifter sker i enlighet med GDPR. Du kan när som helst
            begära utdrag eller radering av dina uppgifter.
          </p>
          <div className="pt-2">
            <a
              href="/gdpr"
              className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Läs mer om hur vi hanterar GDPR →
            </a>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Kontakta oss
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Har du frågor om våra erbjudanden eller vill komma i kontakt med oss
          på Bock AB?
        </p>
        <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
          support@infofynd.se
        </p>
      </div>
    </div>
  );
}
