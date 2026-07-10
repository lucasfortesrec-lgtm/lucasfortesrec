import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, ArrowUpRight, X, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
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

type Work = {
  title: string;
  category: string;
  year: string;
  image: string;
  video: string;
  span?: string;
};

const works: Work[] = [
  { title: "Silêncio de Ouro", category: "Curta-metragem", year: "2025", image: work1, video: "https://player.vimeo.com/video/76979871", span: "md:col-span-2 md:row-span-2" },
  { title: "Horizonte", category: "Documentário", year: "2025", image: work2, video: "https://player.vimeo.com/video/76979871" },
  { title: "Sombra & Luz", category: "Moda", year: "2024", image: work3, video: "https://player.vimeo.com/video/76979871" },
  { title: "Neon Nights", category: "Videoclipe", year: "2024", image: work4, video: "https://player.vimeo.com/video/76979871", span: "md:col-span-2" },
  { title: "Ofício", category: "Documentário", year: "2024", image: work5, video: "https://player.vimeo.com/video/76979871" },
  { title: "Aurum", category: "Comercial", year: "2023", image: work6, video: "https://player.vimeo.com/video/76979871" },
];

function Index() {
  const [openVideo, setOpenVideo] = useState<Work | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);

  useEffect(() => {
    if (openVideo || showreelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [openVideo, showreelOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-lg tracking-tight">
            LUCASFORTES<span className="text-gold">.</span>REC
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors">Portfólio</a>
            <a href="#about" className="hover:text-foreground transition-colors">Sobre</a>
            <a href="#services" className="hover:text-foreground transition-colors">Serviços</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contato</a>
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            Iniciar projeto <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden pt-20">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_90%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-32 w-full">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            <span className="h-px w-10 bg-gold" />
            Portfólio 2020 — 2026
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance max-w-5xl">
            Histórias contadas <span className="italic text-gold">quadro a quadro</span>, com peso, silêncio e luz.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Diretor e editor audiovisual. Crio filmes, comerciais e videoclipes que respiram entre o cinema e a marca.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-3 rounded-full bg-gold text-gold-foreground px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Ver Portfólio <ArrowUpRight className="size-4" />
            </a>
            <button
              onClick={() => setShowreelOpen(true)}
              className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-4 text-sm hover:bg-accent transition-colors"
            >
              <span className="grid place-items-center size-7 rounded-full bg-foreground/10">
                <Play className="size-3 fill-foreground" />
              </span>
              Assistir showreel
            </button>
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">01 — Showreel</div>
              <h2 className="font-display text-3xl md:text-5xl">Um ano em movimento.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Uma seleção dos momentos que definiram o último ciclo — comerciais, filmes autorais e projetos de marca.
            </p>
          </div>

          <button
            onClick={() => setShowreelOpen(true)}
            className="group relative block w-full aspect-video overflow-hidden rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]"
          >
            <img src={heroImg} alt="Showreel 2025" className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid place-items-center size-20 md:size-24 rounded-full bg-gold text-gold-foreground group-hover:scale-110 transition-transform duration-500 shadow-[var(--shadow-elegant)]">
                <Play className="size-7 md:size-8 fill-current translate-x-0.5" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-left">
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Reel 2025</div>
              <div className="font-display text-xl md:text-2xl">2 min 14 seg</div>
            </div>
          </button>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">02 — Trabalhos selecionados</div>
              <h2 className="font-display text-3xl md:text-5xl">Obras recentes.</h2>
            </div>
            <div className="text-sm text-muted-foreground">
              {works.length} projetos em destaque
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(260px,1fr)] gap-4 md:gap-6">
            {works.map((w) => (
              <button
                key={w.title}
                onClick={() => setOpenVideo(w)}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] ${w.span ?? ""}`}
              >
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-5 right-5 grid place-items-center size-11 rounded-full bg-background/60 backdrop-blur-md border border-border opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                  <Play className="size-4 fill-foreground" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-gold mb-3">
                    <span>{w.category}</span>
                    <span className="h-px w-6 bg-gold/40" />
                    <span className="text-muted-foreground">{w.year}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight">
                    {w.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About / Services */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">03 — Sobre</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
              Cinema como <span className="italic text-gold">linguagem</span> — marca como intenção.
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Trabalho na fronteira entre o cinema autoral e a comunicação de marca. Meu processo começa antes da câmera:
              conversar, ouvir, encontrar a imagem exata que carrega a ideia. Depois, cada corte é uma escolha — o que fica,
              o que respira, o que desaparece.
            </p>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Colaboro com agências, estúdios de moda, artistas e marcas independentes em todo o Brasil.
            </p>

            <div className="mt-16 grid sm:grid-cols-3 gap-4">
              {[
                { n: "01", t: "Direção", d: "Filmes, comerciais e videoclipes." },
                { n: "02", t: "Edição", d: "Ritmo, montagem e color grading." },
                { n: "03", t: "Motion", d: "Design em movimento e branding." },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl border border-border bg-card p-6 hover:bg-accent transition-colors">
                  <div className="text-xs text-gold tracking-[0.3em]">{s.n}</div>
                  <div className="mt-6 font-display text-xl">{s.t}</div>
                  <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">04 — Contato</div>
          <h2 className="font-display text-5xl md:text-8xl leading-[0.95] text-balance max-w-5xl">
            Vamos criar algo <span className="italic text-gold">memorável</span>.
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-10 items-end">
            <div className="space-y-6">
              <a href="mailto:ola@studionoir.com" className="group flex items-center gap-4 text-2xl md:text-3xl font-display hover:text-gold transition-colors">
                <Mail className="size-6 text-muted-foreground group-hover:text-gold transition-colors" />
                ola@studionoir.com
              </a>
              <a href="https://wa.me/5511999999999" className="inline-flex items-center gap-3 rounded-full bg-gold text-gold-foreground px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity">
                Conversar no WhatsApp <ArrowUpRight className="size-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              {[
                { icon: Youtube, label: "Vimeo", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm hover:bg-accent transition-colors"
                >
                  <s.icon className="size-4" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Studio Noir. Todos os direitos reservados.</div>
            <div>São Paulo — Brasil</div>
          </div>
        </div>
      </section>

      {/* Video Lightbox */}
      {(openVideo || showreelOpen) && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl grid place-items-center p-4 md:p-10"
          onClick={() => { setOpenVideo(null); setShowreelOpen(false); }}
        >
          <button
            onClick={() => { setOpenVideo(null); setShowreelOpen(false); }}
            className="absolute top-6 right-6 grid place-items-center size-12 rounded-full border border-border bg-card hover:bg-accent transition-colors"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elegant)] bg-black">
              <iframe
                src={`${openVideo?.video ?? "https://player.vimeo.com/video/76979871"}?autoplay=1&title=0&byline=0`}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
            {openVideo && (
              <div className="mt-5 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">{openVideo.category} — {openVideo.year}</div>
                  <div className="font-display text-2xl mt-1">{openVideo.title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
