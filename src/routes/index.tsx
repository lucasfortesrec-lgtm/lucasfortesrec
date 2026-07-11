import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Play,
  ArrowUpRight,
  X,
  Instagram,
  MessageCircle,
  Camera,
  Sparkles,
  UserRound,
  Wand2,
  Share2,
  Palette,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
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

const works: Work[] = [
  { title: "Chef Autoral — Menu Degustação", category: "Gastronomia", image: work1, video: "https://player.vimeo.com/video/76979871" },
  { title: "Bistrô Aurora — Brand Film", category: "Gastronomia", image: work4, video: "https://player.vimeo.com/video/76979871" },
  { title: "Dra. Helena Costa — Odontologia", category: "Profissionais Liberais", image: work2, video: "https://player.vimeo.com/video/76979871" },
  { title: "Dr. Rafael Menezes — Clínica", category: "Profissionais Liberais", image: work5, video: "https://player.vimeo.com/video/76979871" },
  { title: "GT Motors — Lançamento Premium", category: "Automotivo", image: work3, video: "https://player.vimeo.com/video/76979871" },
  { title: "Signature Drive — Test Drive", category: "Automotivo", image: work6, video: "https://player.vimeo.com/video/76979871" },
];

const differentials = [
  { icon: Camera, title: "Equipamentos Profissionais", desc: "Câmeras cinema, óticas dedicadas e áudio broadcast." },
  { icon: Wand2, title: "Direção Criativa Personalizada", desc: "Roteiro e conceito visual sob medida para sua marca." },
  { icon: UserRound, title: "Atendimento Direto com o Filmmaker", desc: "Sem intermediários — do briefing à entrega final." },
  { icon: Share2, title: "Entrega Otimizada para Redes Sociais", desc: "Cortes verticais, horizontais e reels de alta retenção." },
  { icon: Palette, title: "Edição e Colorização Profissional", desc: "Color grading cinematográfico e sound design imersivo." },
];

const workflow = ["Roteiro e Direção", "Produção Completa", "Som Cinematográfico", "Finalização e Cor"];

function Index() {
  const [openVideo, setOpenVideo] = useState<Work | null>(null);

  useEffect(() => {
    document.body.style.overflow = openVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openVideo]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <a href="#top" className="min-w-0 truncate text-sm sm:text-base font-bold tracking-[0.15em]">
            LUCASFORTES<span className="text-gold"> </span>REC
          </a>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid place-items-center size-10 rounded-full border border-border bg-card/40 hover:bg-accent hover:border-gold/40 hover:text-gold transition-all"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-[var(--shadow-elegant)]"
            >
              <MessageCircle className="size-4" />
              <span className="hidden sm:inline">Fale Comigo</span>
              <span className="sm:hidden">Fale</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero — Cinematic Viewfinder */}
      <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,color-mix(in_oklab,var(--gold)_18%,transparent)_0%,transparent_55%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Viewfinder brackets */}
        <div className="pointer-events-none absolute inset-4 sm:inset-8 md:inset-12">
          <span className="absolute top-0 left-0 size-8 md:size-12 border-t-2 border-l-2 border-gold/70" />
          <span className="absolute top-0 right-0 size-8 md:size-12 border-t-2 border-r-2 border-gold/70" />
          <span className="absolute bottom-0 left-0 size-8 md:size-12 border-b-2 border-l-2 border-gold/70" />
          <span className="absolute bottom-0 right-0 size-8 md:size-12 border-b-2 border-r-2 border-gold/70" />
        </div>

        {/* HUD row */}
        <div className="pointer-events-none absolute top-20 md:top-24 left-6 sm:left-12 md:left-20 right-6 sm:right-12 md:right-20 flex items-center justify-between text-[10px] tracking-[0.35em] uppercase">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-gold/50 animate-ping" />
              <span className="relative size-2 rounded-full bg-gold" />
            </span>
            <span className="text-gold">REC</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline">24 FPS · 4K</span>
          </div>
          <div className="hidden md:flex items-center gap-3 tabular-nums text-muted-foreground">
            <span>SCENE 06</span>
            <span className="text-border">|</span>
            <span className="text-gold">TC 00:00:24:12</span>
          </div>
        </div>

        {/* Vertical side rail */}
        <div className="hidden md:flex pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 text-[10px] tracking-[0.4em] uppercase text-muted-foreground [writing-mode:vertical-rl] rotate-180">
          <span>Filmmaker</span>
          <span className="h-16 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
          <span className="text-gold">Since 2018</span>
        </div>
        <div className="hidden md:flex pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 text-[10px] tracking-[0.4em] uppercase text-muted-foreground [writing-mode:vertical-rl]">
          <span>Florianópolis</span>
          <span className="h-16 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
          <span className="text-gold">BR · Worldwide</span>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-20 pt-32 pb-32 md:pt-28 md:pb-32">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-10 md:mb-14">
            <span className="h-px w-8 md:w-14 bg-gold" />
            Produção Audiovisual Cinematográfica
          </div>

          <h1 className="font-display font-semibold leading-[0.86] tracking-[-0.045em] text-balance">
            <span className="block text-[clamp(3rem,13.5vw,12rem)]">LUCAS</span>
            <span className="block text-[clamp(3rem,13.5vw,12rem)] italic">
              <span className="text-gold">FORTES</span>
              <span className="text-foreground">.</span>
              <span className="text-destructive">REC</span>
            </span>
          </h1>

          {/* Divider with meta */}
          <div className="mt-10 md:mt-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-2xl">
              <div className="mb-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
              <p className="text-lg md:text-2xl font-light leading-[1.35] text-foreground/85 text-balance">
                Filmes que <span className="text-gold italic">valorizam marcas</span> — direção, câmera e cor cinematográfica para empresas, profissionais liberais e eventos premium.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-4 text-sm font-semibold hover:-translate-y-0.5 transition-all shadow-[var(--shadow-elegant)]"
              >
                Ver Portfólio
                <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform duration-300" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur-md px-7 py-4 text-sm font-medium hover:bg-accent hover:border-gold/50 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="size-4" />
                Solicitar Orçamento
              </a>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-16 md:mt-20 grid grid-cols-3 gap-4 md:flex md:items-center md:gap-10 text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-4xl text-foreground font-semibold tracking-tight normal-case leading-none">6+</span>
              <span className="mt-2">Anos de estrada</span>
            </div>
            <div className="hidden md:block h-10 w-px bg-border" />
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-4xl text-foreground font-semibold tracking-tight normal-case leading-none">80+</span>
              <span className="mt-2">Projetos entregues</span>
            </div>
            <div className="hidden md:block h-10 w-px bg-border" />
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-4xl text-gold font-semibold tracking-tight normal-case leading-none">4K</span>
              <span className="mt-2">Cinema padrão</span>
            </div>
          </div>
        </div>

        {/* Bottom marquee — client sectors */}
        <div className="absolute bottom-0 inset-x-0 border-t border-border bg-background/70 backdrop-blur-md py-4 overflow-hidden">
          <div className="flex items-center gap-14 whitespace-nowrap animate-marquee text-[11px] uppercase tracking-[0.45em] text-muted-foreground w-max">
            {Array.from({ length: 2 }).flatMap((_, r) =>
              ["Brand Films", "Gastronomia", "Profissionais Liberais", "Automotivo", "Casamentos Premium", "Institucional", "Color Grading", "Direção Criativa"].map((w, i) => (
                <span key={`${r}-${i}`} className="flex items-center gap-14 shrink-0">
                  {w}
                  <span className="text-gold">✦</span>
                </span>
              )),
            )}
          </div>
        </div>
      </section>


      {/* Objection / Value Proposition */}
      <section className="py-24 md:py-36 px-6 md:px-10 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.4em] text-gold mb-6">Por que um filme profissional?</div>
          <p className="text-xl md:text-3xl font-light leading-[1.35] text-balance text-foreground/90 mb-16">
            Sua marca é julgada <span className="text-gold font-medium">antes mesmo da primeira conversa</span>. Um filme bem produzido transmite <span className="text-white font-medium">confiança, valor e profissionalismo</span> em segundos.
          </p>

          <figure className="relative rounded-3xl border border-gold/20 bg-gradient-to-br from-card via-background to-card p-10 md:p-16">
            <div className="absolute -top-6 left-8 md:left-12 grid place-items-center size-12 rounded-full bg-gold text-gold-foreground font-serif text-3xl leading-none pt-1">"</div>
            <blockquote className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.15] italic tracking-tight text-balance">
              Uma boa produção não mostra apenas o que você faz.
              <span className="block text-gold not-italic font-semibold mt-4">Ela mostra o valor do que você entrega.</span>
            </blockquote>
            <figcaption className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">— Lucas Fortes, Filmmaker</figcaption>
          </figure>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Portfólio</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">O QUE EU FAÇO?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {works.map((w) => (
              <button
                key={w.title}
                onClick={() => setOpenVideo(w)}
                className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_0_60px_-15px_var(--gold)]"
              >
                <img src={w.image} alt={w.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-500" />

                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-3 rounded-full bg-gold text-gold-foreground px-5 py-3 shadow-[var(--shadow-elegant)] scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Play className="size-4 fill-current" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Play Movie</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{w.category}</div>
                  <h3 className="font-display text-lg md:text-2xl leading-tight font-semibold">{w.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Por que escolher</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">DIFERENCIAIS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {differentials.map((d) => (
              <div
                key={d.title}
                className="group rounded-2xl border border-border bg-card p-8 hover:-translate-y-1 hover:border-gold/40 hover:bg-accent transition-all duration-500"
              >
                <div className="grid place-items-center size-12 rounded-xl bg-gold/10 text-gold border border-gold/20 mb-6 group-hover:bg-gold group-hover:text-gold-foreground transition-colors duration-500">
                  <d.icon className="size-5" />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold leading-tight mb-3">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Workflow Badge Bar */}
          <div className="rounded-2xl border border-gold/20 bg-gradient-to-r from-card via-background to-card p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-5 text-center">Fluxo completo de produção</div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {workflow.map((step, i) => (
                <div key={step} className="flex items-center gap-2 md:gap-3">
                  <div className="rounded-full border border-gold/40 bg-gold/5 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-foreground">
                    {step}
                  </div>
                  {i < workflow.length - 1 && <ChevronRight className="size-4 text-gold/60 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-10 border-t border-border relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
              <Sparkles className="size-3" />
              Vamos criar juntos
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Pronto para <span className="italic text-gold">valorizar</span> a sua marca?
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Fale diretamente com o filmmaker. Resposta em até 24 horas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-border bg-card p-8 hover:-translate-y-1 hover:border-gold/50 hover:bg-accent transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="grid place-items-center size-12 rounded-xl bg-gold/10 text-gold border border-gold/20 group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                  <Instagram className="size-5" />
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Instagram</div>
              <div className="font-display text-xl md:text-2xl font-semibold">@lucasfortes.rec</div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-card to-card p-8 hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-elegant)] transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="grid place-items-center size-12 rounded-xl bg-gold text-gold-foreground border border-gold">
                  <MessageCircle className="size-5" />
                </div>
                <ArrowUpRight className="size-5 text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-2">WhatsApp</div>
              <div className="font-display text-xl md:text-2xl font-semibold">{PHONE_DISPLAY}</div>
            </a>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="grid place-items-center size-12 shrink-0 rounded-xl bg-gold/10 text-gold border border-gold/20">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">E-mail</div>
                <a href={`mailto:${EMAIL}`} className="font-display text-base md:text-xl font-semibold hover:text-gold transition-colors truncate block">
                  {EMAIL}
                </a>
              </div>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-medium hover:bg-accent hover:border-gold/40 transition-all shrink-0"
            >
              Enviar mensagem <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-10 py-12">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <div className="font-display text-base font-bold tracking-[0.15em]">
              LUCASFORTES<span className="text-gold"> </span>REC
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Lucas Fortes Filmmaker. Todos os direitos reservados.
            </div>
            <div className="mt-1 text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
              <a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors">{EMAIL}</a>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="size-3" /> {PHONE_DISPLAY}</span>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid place-items-center size-10 rounded-full border border-border bg-card hover:bg-accent hover:border-gold/40 hover:text-gold transition-all">
              <Instagram className="size-4" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid place-items-center size-10 rounded-full border border-border bg-card hover:bg-accent hover:border-gold/40 hover:text-gold transition-all">
              <MessageCircle className="size-4" />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="E-mail" className="grid place-items-center size-10 rounded-full border border-border bg-card hover:bg-accent hover:border-gold/40 hover:text-gold transition-all">
              <Mail className="size-4" />
            </a>
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
              <div className="text-xs uppercase tracking-[0.3em] text-gold">{openVideo.category}</div>
              <div className="font-display text-2xl mt-1 font-semibold">{openVideo.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
