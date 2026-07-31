import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Play,
  ArrowUpRight,
  X,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  Menu,
  Clapperboard,
  Share2,
  Building2,
  CalendarDays,
  Car,
  Utensils,
} from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "LUCAS FORTES.REC — Produtora Audiovisual em Florianópolis" },
      {
        name: "description",
        content:
          "Filmes institucionais, social content, comerciais e eventos com direção cinematográfica. Produção audiovisual em Florianópolis, Santa Catarina.",
      },
      { property: "og:title", content: "LUCAS FORTES.REC — Produtora Audiovisual" },
      {
        property: "og:description",
        content:
          "Narrativas visuais de alto impacto para marcas, profissionais liberais e eventos premium em Santa Catarina.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Work = {
  title: string;
  category: string;
  image: string;
  video: string;
};

const WHATSAPP_URL = "https://wa.me/5548998294750";
const INSTAGRAM_URL = "https://instagram.com/lucasfortes.rec";
const EMAIL = "lucasfortesrec@gmail.com";
const PHONE_DISPLAY = "48 9 9829 4750";
const SHOWREEL = "https://player.vimeo.com/video/76979871";

const nav = [
  { label: "Showreel", href: "#showreel" },
  { label: "O Filmmaker", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
];

const works: Work[] = [
  { title: "Chef Autoral — Menu Degustação", category: "gastronomia", image: work1, video: SHOWREEL },
  { title: "Bistrô Aurora — Brand Film", category: "manifesto", image: work4, video: SHOWREEL },
  { title: "Dra. Helena Costa — Odontologia", category: "social", image: work2, video: SHOWREEL },
  { title: "Dr. Rafael Menezes — Clínica", category: "institucional", image: work5, video: SHOWREEL },
  { title: "GT Motors — Lançamento Premium", category: "comercial", image: work3, video: SHOWREEL },
  { title: "Signature Drive — Test Drive", category: "automotivo", image: work6, video: SHOWREEL },
];

const services = [
  {
    icon: Share2,
    title: "Redes Sociais",
    desc: "Reels e vídeos verticais de alta retenção, com montagem dinâmica pensada para conversão.",
  },
  {
    icon: Building2,
    title: "Institucional & Manifesto",
    desc: "Narrativas corporativas que consolidam a alma da marca e comunicam autoridade.",
  },
  {
    icon: Clapperboard,
    title: "Comerciais",
    desc: "Filmes publicitários calibrados para impacto imediato e memorização de marca.",
  },
  {
    icon: Utensils,
    title: "Gastronomia",
    desc: "Direção de fotografia sensorial: textura, vapor, luz e movimento que dão água na boca.",
  },
  {
    icon: Car,
    title: "Automotivo",
    desc: "Rolling shots, detalhes em macro e color grading que valorizam cada linha do veículo.",
  },
  {
    icon: CalendarDays,
    title: "Eventos Premium",
    desc: "Cobertura completa com entrega ágil: casamentos, congressos e experiências de marca.",
  },
];

const clients = [
  "Bistrô Aurora",
  "GT Motors",
  "Clínica Menezes",
  "Signature Drive",
  "Chef Autoral",
  "Studio Helena",
  "Casa Vermelha",
  "Praia Grande Co.",
];

function Index() {
  const [openVideo, setOpenVideo] = useState<Work | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openVideo]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <span className="grid place-items-center size-7 rounded-[6px] border-2 border-brand">
              <span className="size-2 rounded-full bg-brand" />
            </span>
            <span className="text-base md:text-lg font-bold tracking-[0.12em]">
              LUCAS FORTES<span className="text-foreground">.</span>
              <span className="text-brand">REC</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden grid place-items-center size-11 rounded-full border border-border bg-card/50"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl px-5 py-6 flex flex-col gap-5">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_oklab,var(--brand)_16%,transparent)_0%,transparent_60%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center py-32">
          <div className="inline-flex items-center border border-border px-5 py-2.5 text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Produtora Audiovisual | Santa Catarina
          </div>

          <h1 className="mt-10 font-display font-bold uppercase leading-[0.92] tracking-[-0.03em] text-[clamp(2.6rem,8.5vw,6.5rem)] text-balance">
            Narrativas que
            <span className="block text-brand">movem marcas</span>
          </h1>

          <p className="mt-8 mx-auto max-w-2xl text-base md:text-xl font-light leading-relaxed text-muted-foreground text-balance">
            Direção, câmera e cor cinematográfica para empresas, profissionais liberais e eventos premium.
            Vídeos que se destacam nas redes e trazem os resultados que o seu negócio precisa.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 bg-brand text-brand-foreground px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] hover:-translate-y-0.5 transition-all shadow-[var(--shadow-elegant)]"
            >
              Explorar Portfólio
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform duration-300" />
            </a>
            <a
              href="#showreel"
              className="inline-flex items-center gap-3 border border-border px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] hover:bg-accent hover:border-brand/50 transition-all"
            >
              <Play className="size-4 fill-current" />
              Ver Showreel
            </a>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 inset-x-0 border-t border-border bg-background/70 backdrop-blur-md py-4 overflow-hidden">
          <div className="flex items-center gap-14 whitespace-nowrap animate-marquee text-[11px] uppercase tracking-[0.45em] text-muted-foreground w-max">
            {Array.from({ length: 2 }).flatMap((_, r) =>
              [
                "Brand Films",
                "Social Content",
                "Gastronomia",
                "Automotivo",
                "Institucional",
                "Eventos Premium",
                "Color Grading",
                "Direção Criativa",
              ].map((w, i) => (
                <span key={`${r}-${i}`} className="flex items-center gap-14 shrink-0">
                  {w}
                  <span className="text-brand">/</span>
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section id="showreel" className="py-24 md:py-32 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-[-0.03em]">
              The <span className="text-brand">Showreel</span>
            </h2>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">2024 — 2026 / Reel</div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-black shadow-[var(--shadow-card)]">
            <iframe
              src={`${SHOWREEL}?title=0&byline=0&portrait=0`}
              title="Showreel Lucas Fortes"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 md:py-32 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1400px] mx-auto grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-brand mb-6">A Produtora</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.95] tracking-[-0.03em]">
              O Filmmaker
            </h2>
            <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Direção <span className="text-brand">//</span> Lucas Fortes
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["6+ anos", "80+ projetos", "4K Cinema", "Florianópolis"].map((b) => (
                <span
                  key={b}
                  className="border border-border px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
            <p>
              LUCAS FORTES.REC é uma produtora audiovisual com base em Florianópolis, conectando criatividade,
              técnica e direção para transformar ideias em narrativas de impacto por toda Santa Catarina.
            </p>
            <p>
              Com um portfólio plural, transito entre formatos com naturalidade — da solidez de vídeos
              institucionais e comerciais à sensibilidade estética de brand films, gastronomia e automotivo.
              Cada projeto nasce do propósito de traduzir a essência de marcas e profissionais.
            </p>
            <p className="text-foreground">
              Aqui, cada frame é planejado para contar a sua história com máxima potência.
            </p>
          </div>
        </div>

        {/* Clientes marquee */}
        <div className="max-w-[1400px] mx-auto mt-20">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Clientes <span className="text-brand">//</span> Projetos
          </div>
          <div className="overflow-hidden border-y border-border py-8">
            <div className="flex items-center gap-16 whitespace-nowrap animate-marquee w-max">
              {Array.from({ length: 2 }).flatMap((_, r) =>
                clients.map((c, i) => (
                  <span
                    key={`${r}-${i}`}
                    className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-muted-foreground/50 shrink-0"
                  >
                    {c}
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 md:py-32 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <div className="text-[11px] uppercase tracking-[0.4em] text-brand mb-5">O que eu faço</div>
            <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-[-0.03em]">
              Nossos Serviços
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {services.map((s) => (
              <div key={s.title} className="group bg-background p-9 md:p-11 hover:bg-card transition-colors duration-500">
                <s.icon className="size-6 text-brand mb-8" />
                <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="py-24 md:py-32 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.4em] text-brand mb-5">Portfólio</div>
              <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-[-0.03em]">
                Trabalhos
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Clique em uma miniatura para assistir ao filme completo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {works.map((w) => (
              <button
                key={w.title}
                onClick={() => setOpenVideo(w)}
                className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[var(--shadow-elegant)]"
              >
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="grid place-items-center size-16 rounded-full bg-brand text-brand-foreground scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Play className="size-5 fill-current" />
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-brand mb-2">// {w.category}</div>
                  <h3 className="font-display text-lg md:text-xl font-bold uppercase leading-tight tracking-tight">
                    {w.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="relative py-28 md:py-40 px-5 md:px-10 border-t border-border overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="relative max-w-[1400px] mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 border border-border px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-brand/60 animate-ping" />
              <span className="relative size-2 rounded-full bg-brand" />
            </span>
            Disponível para projetos
          </div>

          <h2 className="mt-10 font-display text-4xl md:text-7xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-balance">
            Vamos construir <span className="text-brand">conexões</span>
          </h2>
          <p className="mt-7 mx-auto max-w-xl text-base md:text-lg font-light text-muted-foreground">
            Comunicando a essência do seu negócio através de vídeos estratégicos.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-brand text-brand-foreground px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] hover:-translate-y-0.5 transition-all shadow-[var(--shadow-elegant)]"
            >
              <MessageCircle className="size-4" />
              Iniciar no WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 border border-border px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] hover:bg-accent hover:border-brand/50 transition-all"
            >
              <Mail className="size-4" />
              Enviar e-mail
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 md:px-10 py-12">
        <div className="max-w-[1400px] mx-auto grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <div className="font-display text-base font-bold tracking-[0.12em]">
              LUCAS FORTES<span className="text-foreground">.</span>
              <span className="text-brand">REC</span>
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Florianópolis | Santa Catarina | Brasil
            </div>
            <div className="mt-3 text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
              <a href={`mailto:${EMAIL}`} className="hover:text-brand transition-colors">
                {EMAIL}
              </a>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3" /> {PHONE_DISPLAY}
              </span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Lucas Fortes Filmmaker. Todos os direitos reservados.
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid place-items-center size-11 rounded-full border border-border bg-card hover:bg-accent hover:border-brand/50 hover:text-brand transition-all"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid place-items-center size-11 rounded-full border border-border bg-card hover:bg-accent hover:border-brand/50 hover:text-brand transition-all"
            >
              <MessageCircle className="size-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="E-mail"
              className="grid place-items-center size-11 rounded-full border border-border bg-card hover:bg-accent hover:border-brand/50 hover:text-brand transition-all"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid place-items-center size-14 rounded-full bg-brand text-brand-foreground shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform"
      >
        <MessageCircle className="size-6" />
      </a>

      {/* Lightbox */}
      {openVideo && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl grid place-items-center p-4 md:p-10"
          onClick={() => setOpenVideo(null)}
        >
          <button
            onClick={() => setOpenVideo(null)}
            className="absolute top-6 right-6 grid place-items-center size-12 rounded-full border border-border bg-card hover:bg-accent transition-colors"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] bg-black">
              <iframe
                src={`${openVideo.video}?autoplay=1&title=0&byline=0`}
                title={openVideo.title}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand">// {openVideo.category}</div>
              <div className="font-display text-2xl mt-1 font-bold uppercase tracking-tight">{openVideo.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
