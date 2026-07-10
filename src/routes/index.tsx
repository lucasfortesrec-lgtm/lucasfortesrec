import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Play,
  ArrowUpRight,
  X,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Building2,
  UserRound,
  HeartHandshake,
  PenLine,
  Camera,
  Clapperboard,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Category = "Marcas" | "Profissionais" | "Casamentos";

type Work = {
  title: string;
  category: Category;
  categoryLabel: string;
  year: string;
  image: string;
  video: string;
};

const WHATSAPP_URL = "https://wa.me/5511999999999";

const works: Work[] = [
  { title: "Aurum — Institucional", category: "Marcas", categoryLabel: "Marcas / Institucional", year: "2025", image: work1, video: "https://player.vimeo.com/video/76979871" },
  { title: "Dra. Helena Costa", category: "Profissionais", categoryLabel: "Profissionais Liberais", year: "2025", image: work2, video: "https://player.vimeo.com/video/76979871" },
  { title: "Marina & Rafael", category: "Casamentos", categoryLabel: "Casamentos / Eventos", year: "2024", image: work3, video: "https://player.vimeo.com/video/76979871" },
  { title: "Studio Noir — Brand Film", category: "Marcas", categoryLabel: "Marcas / Institucional", year: "2024", image: work4, video: "https://player.vimeo.com/video/76979871" },
  { title: "Dr. Rafael Menezes", category: "Profissionais", categoryLabel: "Profissionais Liberais", year: "2024", image: work5, video: "https://player.vimeo.com/video/76979871" },
  { title: "Julia & Pedro", category: "Casamentos", categoryLabel: "Casamentos / Eventos", year: "2023", image: work6, video: "https://player.vimeo.com/video/76979871" },
];

const filters: { key: "Todos" | Category; label: string }[] = [
  { key: "Todos", label: "Todos" },
  { key: "Marcas", label: "Marcas / Institucional" },
  { key: "Profissionais", label: "Profissionais Liberais" },
  { key: "Casamentos", label: "Casamentos / Eventos" },
];

const services = [
  {
    icon: Building2,
    title: "Vídeos Institucionais e Corporativos",
    desc: "Filmes de marca que constroem autoridade — narrativas que traduzem cultura, propósito e diferencial competitivo.",
  },
  {
    icon: UserRound,
    title: "Conteúdo para Profissionais Liberais",
    desc: "Personal branding em vídeo: reels de alta retenção, entrevistas e cortes verticais para posicionar sua expertise.",
  },
  {
    icon: HeartHandshake,
    title: "Filmes de Casamentos e Eventos",
    desc: "Storytelling premium e sensorial — filmes que eternizam a emoção com estética cinematográfica e trilha sob medida.",
  },
];

const process = [
  {
    step: "01",
    icon: PenLine,
    title: "Pré-produção & Roteiro",
    desc: "Imersão na sua história: briefing estratégico, direção criativa, roteiro e planejamento visual detalhado.",
  },
  {
    step: "02",
    icon: Camera,
    title: "Gravação & Equipamento Premium",
    desc: "Câmeras cinema, óticas dedicadas, áudio profissional e direção em set para capturar cada nuance.",
  },
  {
    step: "03",
    icon: Clapperboard,
    title: "Pós-produção & Color Grading",
    desc: "Montagem sensível, color grading cinematográfico, sound design e mixagem final entregues em alta.",
  },
];

const faqs = [
  {
    q: "Como funciona o orçamento?",
    a: "Cada projeto é único. Após uma conversa inicial para entender objetivo, entregáveis e prazo, envio uma proposta detalhada com escopo, cronograma e investimento. Sem surpresas depois.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Reels e conteúdos curtos: de 5 a 10 dias úteis. Filmes institucionais: 3 a 5 semanas. Casamentos: teaser em até 15 dias, filme completo em até 90 dias. Prazos são acordados no contrato.",
  },
  {
    q: "Você atende em outras regiões?",
    a: "Sim. Atendo todo o Brasil e viagens internacionais sob demanda. Custos de deslocamento e diária ficam claros na proposta.",
  },
  {
    q: "Trabalha com equipe própria?",
    a: "Sim. Tenho uma equipe fixa de confiança (direção de fotografia, som direto, assistentes) e amplio o time conforme a complexidade do projeto.",
  },
];

function Index() {
  const [openVideo, setOpenVideo] = useState<Work | null>(null);
  const [activeFilter, setActiveFilter] = useState<"Todos" | Category>("Todos");

  const filteredWorks = useMemo(
    () => (activeFilter === "Todos" ? works : works.filter((w) => w.category === activeFilter)),
    [activeFilter],
  );

  useEffect(() => {
    document.body.style.overflow = openVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openVideo]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-4 left-4 right-4 z-40 mx-auto max-w-6xl rounded-full backdrop-blur-xl bg-background/60 border border-border">
        <div className="px-4 md:px-6 h-14 flex items-center justify-between">
          <a href="#top" className="font-display text-sm md:text-base tracking-tight font-semibold">
            LUCASFORTES<span className="text-gold">.</span>REC
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#portfolio" className="hover:text-foreground transition-colors">Portfólio</a>
            <a href="#services" className="hover:text-foreground transition-colors">Serviços</a>
            <a href="#process" className="hover:text-foreground transition-colors">Processo</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-4 py-2 text-xs md:text-sm font-medium hover:opacity-90 transition-opacity shadow-[var(--shadow-elegant)]"
          >
            Solicitar Orçamento <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_95%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full pt-24">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            <span className="h-px w-8 bg-gold" />
            Filmmaker · Direção · Pós-produção
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight text-balance max-w-5xl font-semibold">
            Transformando histórias em <span className="italic text-gold">cinema</span>.
            <br className="hidden md:block" />
            Vídeos que conectam, vendem e eternizam.
          </h1>
          <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Produção audiovisual profissional para marcas, empresas, profissionais liberais e grandes eventos.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 rounded-full bg-gold text-gold-foreground px-7 py-4 text-sm font-medium hover:opacity-90 transition-all shadow-[var(--shadow-elegant)] hover:-translate-y-0.5"
            >
              Ver Portfólio <ArrowUpRight className="size-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-border bg-card/40 backdrop-blur-md px-6 py-4 text-sm hover:bg-accent hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="size-4" />
              Fale no WhatsApp
            </a>
          </div>

          <div className="mt-16 md:mt-24 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { n: "80+", l: "Projetos entregues" },
              { n: "6", l: "Anos de estrada" },
              { n: "100%", l: "Clientes recorrentes" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl md:text-3xl text-gold">{s.n}</div>
                <div className="text-[11px] md:text-xs text-muted-foreground mt-1 uppercase tracking-[0.2em]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">01 — Portfólio</div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">Trabalhos selecionados.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Uma curadoria dos projetos mais recentes — clique para assistir.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => {
              const active = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`rounded-full px-4 py-2 text-xs md:text-sm border transition-all ${
                    active
                      ? "bg-gold text-gold-foreground border-gold shadow-[var(--shadow-elegant)]"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredWorks.map((w) => (
              <button
                key={w.title}
                onClick={() => setOpenVideo(w)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-elegant)]"
              >
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="grid place-items-center size-16 rounded-full bg-gold text-gold-foreground shadow-[var(--shadow-elegant)] scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Play className="size-5 fill-current translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-gold mb-2">
                    <span>{w.categoryLabel}</span>
                    <span className="h-px w-6 bg-gold/40" />
                    <span className="text-muted-foreground">{w.year}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl leading-tight font-semibold">
                    {w.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">02 — Serviços</div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Especialidades feitas para <span className="italic text-gold">gerar impacto</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-accent"
              >
                <div className="grid place-items-center size-12 rounded-xl bg-gold/10 text-gold border border-gold/20 mb-6 group-hover:bg-gold group-hover:text-gold-foreground transition-colors duration-500">
                  <s.icon className="size-5" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold leading-tight">{s.title}</h3>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  Saiba mais <ArrowUpRight className="size-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">03 — Processo criativo</div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Do briefing à entrega final — sem ruído.
            </h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            {process.map((p) => (
              <div key={p.step} className="relative rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="grid place-items-center size-12 rounded-full bg-background border border-gold/30 text-gold relative z-10">
                    <p.icon className="size-5" />
                  </div>
                  <div className="font-display text-4xl text-gold/30 font-semibold">{p.step}</div>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-card via-background to-card p-10 md:p-20 text-center">
          <div className="absolute -top-24 -right-24 size-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
              <Sparkles className="size-3" />
              Vagas limitadas · 2026
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance max-w-4xl mx-auto">
              Pronto para tirar o seu projeto do papel e dar a ele o <span className="italic text-gold">visual que ele merece</span>?
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground">
              Vamos conversar sobre a sua ideia. Resposta em até 24 horas.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gold text-gold-foreground px-8 py-4 text-sm font-medium hover:opacity-90 transition-all shadow-[var(--shadow-elegant)] hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
                <MessageCircle className="size-4 relative" />
                <span className="relative">Iniciar Meu Projeto</span>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-sm hover:bg-accent transition-colors"
              >
                Ver portfólio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">04 — FAQ</div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">Perguntas frequentes.</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-6 data-[state=open]:border-gold/30 data-[state=open]:bg-accent transition-colors"
              >
                <AccordionTrigger className="text-left font-display text-base md:text-lg font-medium hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-10 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-display text-base font-semibold tracking-tight">
              LUCASFORTES<span className="text-gold">.</span>REC
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Lucas Fortes. Made with passion — São Paulo, Brasil.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Youtube, label: "YouTube", href: "#" },
              { icon: Youtube, label: "Vimeo", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="grid place-items-center size-10 rounded-full border border-border bg-card hover:bg-accent hover:border-gold/40 hover:text-gold transition-all"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Video Lightbox */}
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
            <div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elegant)] bg-black">
              <iframe
                src={`${openVideo.video}?autoplay=1&title=0&byline=0`}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-5">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">{openVideo.categoryLabel} — {openVideo.year}</div>
              <div className="font-display text-2xl mt-1 font-semibold">{openVideo.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
