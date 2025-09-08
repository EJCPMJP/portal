import Link from "next/link";

const hero = {
  category: "Política",
  title:
    "Principais ladrões de carros do estado serão ouvidos da prisão pela CPI das Câmeras da Alerj",
  image:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1280&q=60",
};

const articles = [
  {
    category: "Política",
    title:
      "Na batida da manhã prefeitura manda terreno no Recreio a leilão por R$ 82 milhões",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=60",
  },
  {
    category: "Política",
    title:
      "Com Rafael Picciani de volta à Assembleia, governistas apertam marcação pela Secretaria estadual de Esportes",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=60",
  },
  {
    category: "Geral",
    title:
      "Guerra dos royalties: STF barra recurso de São Gonçalo, Magé e Guapimirim",
    image:
      "https://images.unsplash.com/photo-1502190837198-9e2198d8f07b?auto=format&fit=crop&w=800&q=60",
  },
  {
    category: "Cidades",
    title: "Chegou a vez do ônibus comum ficar no padrão BRT",
    image:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=60",
  },
  {
    category: "Geral",
    title:
      "Estado promove maior consulta cidadã já lançada",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60",
  },
  {
    category: "Política",
    title: "Comissão determina condução coercitiva de representantes da Pontual",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=60",
  },
];

export default function Page() {
  return (
    <div className="space-y-8">
      <section className="relative h-64 sm:h-96 overflow-hidden rounded-xl">
        <img
          src={hero.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          <span className="mb-2 text-sm font-semibold text-[var(--accent)]">
            {hero.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            {hero.title}
          </h1>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <article
            key={a.title}
            className="token-surface overflow-hidden rounded-lg"
          >
            <img
              src={a.image}
              alt=""
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <span className="mb-1 inline-block text-xs font-semibold text-[var(--accent)]">
                {a.category}
              </span>
              <h2 className="font-semibold leading-snug">{a.title}</h2>
            </div>
          </article>
        ))}
      </section>

      <div className="text-center">
        <Link
          href="/admin/login"
          className="inline-block rounded-md bg-[var(--brand)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--accent)]"
        >
          Acessar área admin
        </Link>
      </div>
    </div>
  );
}

