import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Play,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { VimeoPlayer } from "@/components/VimeoPlayer";
import { Showreel } from "@/components/Showreel";
import { InstagramCarousel } from "@/components/InstagramCarousel";
import BrandsMarquee from "@/components/BrandsMarquee";
import lucasSet from "@/assets/lucas-set.jpg.asset.json";
import bts1 from "@/assets/bts-1.jpg.asset.json";
import bts2 from "@/assets/bts-2.jpg.asset.json";
import bts3 from "@/assets/bts-3.jpg.asset.json";
import bts4 from "@/assets/bts-4.jpg.asset.json";
import brandLogo from "@/assets/lucas-fortes-logo-light.png.asset.json";
const BRANDS: { name: string; src: string; scale?: string }[] = [
  { name: "GWM", src: "/brands/gwm.png" },
  { name: "Volvo", src: "/brands/volvo.png" },
  { name: "RDO", src: "/brands/rdo.png" },
  { name: "Eu Quero Carros", src: "/brands/euquerocarros.png" },
  { name: "Sandro Consórcios", src: "/brands/sandro.png", scale: "max-h-12 md:max-h-14 max-w-[85%]" },
  { name: "Serginho Multimarcas", src: "/brands/serginho.png", scale: "max-h-12 md:max-h-14 max-w-[85%]" },
  { name: "Proscale", src: "/brands/proscale.png", scale: "max-h-12 md:max-h-14 max-w-[85%]" },
];



const BTS = [
  { src: bts1.url, alt: "Bastidores: entrevista sendo gravada com casal em locação" },
  { src: bts2.url, alt: "Bastidores: captação com gimbal em evento corporativo" },
  { src: bts3.url, alt: "Bastidores: set de gravação em consultório" },
  { src: bts4.url, alt: "Bastidores: gravação em concessionária de veículos" },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "LUCAS FORTES.REC" },
      {
        name: "description",
        content:
          "Direção, câmera e cor cinematográfica para marcas, profissionais liberais e eventos premium em Santa Catarina. Filmes que fazem o negócio ser lembrado.",
      },
      { property: "og:title", content: "LUCAS FORTES.REC" },
      {
        property: "og:description",
        content:
          "Direção, câmera e cor cinematográfica para marcas, profissionais liberais e eventos premium em Santa Catarina. Filmes que fazem o negócio ser lembrado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const WHATSAPP_URL = "https://wa.me/5548998294750";
const INSTAGRAM_URL = "https://instagram.com/lucasfortes.rec";

// Dispara a conversão do Google Ads ao clicar em contatos de WhatsApp
function reportWhatsappConversion() {
  const fn = (window as unknown as {
    gtag_report_conversion?: (url?: string) => boolean;
  }).gtag_report_conversion;
  if (typeof fn === "function") fn();
}

// Leva o visitante ao vídeo horizontal, centralizado na tela
function goToReelVideo() {
  const target = document.getElementById("reel-video");
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "center",
  });
}



// ratio = largura/altura da mídia real de cada post (medido no arquivo)
// Cards prioritários (escolhidos pelo cliente), por data real decrescente
const INSTAGRAM_PRIORITY: { id: string; ratio: number }[] = [
  { id: "Dde6cY7xOm8", ratio: 0.5625 },   // 19/09 reel Corvette C8
  { id: "DeRjT-4RDkO", ratio: 0.5625 },   // 09/10 reel Proscale DJs
  { id: "DczktCENS1A", ratio: 0.5625 },   // 02/09 reel Normal é chato
  { id: "DbvTSCuRvho", ratio: 0.5625 },   // 07/08 reel Eu Quero Carros
  { id: "DbVuBimRBFY", ratio: 0.5625 },   // 28/07 vídeo Harley-Davidson
  { id: "DbKGDD-tjsi", ratio: 0.8003 },   // 23/07 carrossel alambique
  { id: "DbKEQRotrcx", ratio: 0.8 },      // 23/07 carrossel Tank
  { id: "DalZ9tIEWOH", ratio: 0.7503 },   // 09/07 carrossel evento Volvo
  { id: "DZzywvax8qD", ratio: 0.5625 },   // 20/06 reel gastronomia
  { id: "DYTWBuzNIxx", ratio: 1.7778 },   // 13/05 vídeo horizontal torneira
  { id: "DYTOutBtDXL", ratio: 0.8 },      // 13/05 carrossel fachada Volvo
];

// Demais cards, por data real decrescente
const INSTAGRAM_POSTS: { id: string; ratio: number }[] = [
  { id: "DdolGMGRkZm", ratio: 0.5625 },   // 23/09 reel
  { id: "DbgyZJJkWfX", ratio: 0.75 },     // 01/08 carrossel
  { id: "DbO1tXPxxTV", ratio: 0.5625 },   // 25/07 vídeo
  { id: "Da_T_j9kRE7", ratio: 0.7505 },   // 19/07 carrossel
  { id: "DYTQVZ2jSsA", ratio: 1.0682 },   // 13/05 vídeo
  { id: "DYTOZb-NBe2", ratio: 0.8 },
  { id: "DYTMmXZNZVI", ratio: 0.8 },
  { id: "DYTMkB_tMRC", ratio: 0.8 },
  { id: "DYTMhg1tWxP", ratio: 0.8 },
];






const EMAIL = "lucasfortesrec@gmail.com";
const PHONE_DISPLAY = "48 9 9829 4750";

const nav = [
  { label: "INÍCIO", href: "#showreel", index: "01" },
  { label: "Sobre", href: "#sobre", index: "02" },
  { label: "Ofício", href: "#servicos", index: "03" },
  { label: "Instagram", href: "#instagram", index: "04" },
  { label: "Contato", href: "#contato", index: "05" },
];


const services = [
  {
    n: "01",
    title: "Filmes de Marca",
    lead: "Manifesto & Institucional",
    desc: "A alma do negócio traduzida em imagem: roteiro, direção e uma peça que sustenta anos de comunicação.",
  },
  {
    n: "02",
    title: "Conteúdo Social",
    lead: "Vertical & Alta Retenção",
    desc: "Cortes de ritmo agressivo pensados para o primeiro segundo — o que segura o dedo antes do scroll.",
  },
  {
    n: "03",
    title: "Comerciais",
    lead: "Campanha & Lançamento",
    desc: "Peças publicitárias com direção de arte, elenco e pós-produção calibradas para memorização.",
  },
  {
    n: "04",
    title: "Gastronomia",
    lead: "Sensorial & Macro",
    desc: "Vapor, textura e luz rasante. Direção de fotografia que faz o prato ser desejado antes de ser provado.",
  },
  {
    n: "05",
    title: "Automotivo",
    lead: "Movimento & Detalhe",
    desc: "Rolling shots, gimbal e color grading que revelam cada linha, reflexo e acabamento do veículo.",
  },
  {
    n: "06",
    title: "Eventos Premium",
    lead: "Registro & Entrega Ágil",
    desc: "Casamentos, congressos e experiências de marca capturados com discrição e entregues com pressa.",
  },
];


function Index() {
  const [scrolled, setScrolled] = useState(false);

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
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 min-h-[72px] py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <a href="#top" aria-label="Lucas Fortes REC — início" className="flex shrink-0 items-center gap-3 md:gap-4">
            <img
              src={brandLogo.url}
              alt="Lucas Fortes REC — Filmmaker"
              width={422}
              height={564}
              className="h-12 md:h-14 w-auto object-contain"
            />
            <span className="hidden sm:flex flex-col gap-1">
              <span className="font-sans text-[13px] md:text-[15px] font-medium uppercase tracking-[0.18em]">Lucas Fortes</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.32em] text-muted-foreground">Filmmaker</span>
            </span>
          </a>

          <nav className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-5 gap-y-2 md:gap-x-7 lg:gap-x-9">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={n.href === "#showreel" ? (e) => { e.preventDefault(); goToReelVideo(); } : undefined}
                 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}

          </nav>
        </div>

      </header>

      {/* Hero — editorial asymmetric */}
      <section id="top" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(110%_75%_at_20%_5%,color-mix(in_oklab,var(--brand)_12%,transparent)_0%,transparent_60%)]"
        />


        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 md:px-10 pb-20 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-muted-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-brand/70 animate-ping" />
                  <span className="relative size-1.5 rounded-full bg-brand" />
                </span>
                Est. 2020 — Filmes sob medida
              </div>

              <h1 className="mt-8 font-display font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-[clamp(2.9rem,10vw,8.5rem)]">
                <span className="block text-[0.62em] leading-[0.95]">TRANSFORMANDO</span>
                <span className="block">
                  <span className="inline-block">IDEIAS</span>{" "}
                  <span className="inline-block text-[0.62em]">EM</span>{" "}
                  <span className="inline-block font-serif-editorial lowercase text-brand normal-case tracking-[-0.02em] text-[1.2em]">
                    filmes
                  </span>
                </span>
              </h1>

              <p className="mt-9 max-w-xl text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                Não vendemos vídeo por minuto. Construímos a memória visual de marcas, profissionais e
                celebrações — do primeiro roteiro ao último frame colorizado.
              </p>

              <div className="mt-11 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={goToReelVideo}
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <span className="grid place-items-center size-11 rounded-full border border-border group-hover:border-signal group-hover:text-signal transition-colors">
                    <Play className="size-3.5 fill-current" />
                   </span>
                  Assistir reels
                </button>
              </div>

              <h2 className="mt-10 font-display text-4xl md:text-6xl font-extrabold uppercase tracking-[-0.045em]">
                <button
                  type="button"
                  onClick={goToReelVideo}
                  aria-label="Assistir ao vídeo principal"
                  className="w-full cursor-pointer rounded-[4px] text-left text-foreground transition-colors hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  O REELS
                </button>
              </h2>

            </div>

            {/* right column — vertical reel */}

            <div>
              <div className="relative w-full max-w-[380px] mx-auto lg:mx-0 aspect-[9/16] overflow-hidden rounded-[20px] border border-border bg-black shadow-[var(--shadow-card)]">
                <VimeoPlayer
                  videoUrl="https://player.vimeo.com/video/1216431410"
                  title="Vídeo vertical"
                  className="h-full w-full"
                />
              </div>
            </div>



          </div>
        </div>

        <div className="border-t border-border" />

      </section>

      {/* Showreel */}
      <section id="showreel" className="py-16 md:py-20 px-5 md:px-10">
        <div className="max-w-[1500px] mx-auto">

          <Showreel />
        </div>
      </section>

      {/* Marcas atendidas */}
      <section id="marcas" className="py-20 md:py-24 border-t border-border overflow-hidden">
        <div className="px-5 md:px-10">
          <div className="max-w-[1100px] mx-auto text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Marcas atendidas
          </div>
        </div>

        <BrandsMarquee brands={BRANDS} />
      </section>


      {/* Sobre */}

      <section id="sobre" className="pt-24 pb-12 md:pt-32 md:pb-16 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
            O Filmmaker
          </h2>
          <div className="mt-8 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Direção <span className="text-signal">·</span> Lucas Fortes
          </div>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {["Roteiro", "Direção", "Câmera", "Color", "Som", "Entrega"].map((b) => (
              <span
                key={b}
                className="rounded-full border border-border px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-8 md:items-start">
            <div className="overflow-hidden rounded-[16px] border border-border max-w-[220px] md:max-w-[260px] shrink-0">
              <img
                src={lucasSet.url}
                alt="Lucas Fortes em set de filmagem com iluminação profissional"
                loading="lazy"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full aspect-[3/4] object-cover grayscale-[0.25] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="space-y-6 md:pt-4">
              <p className="font-serif-editorial text-xl md:text-2xl lg:text-3xl leading-[1.25] text-bone">
                “Todo negócio já tem uma história boa. O meu trabalho é encontrar o ângulo em que ela finalmente
                aparece.”
              </p>
              <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                <p>
                  Sou Lucas Fortes, filmmaker sediado em Florianópolis. Trabalho de forma independente com
                  marcas, profissionais liberais e produções premium em todo o Brasil, mediante orçamento.
                </p>
                <p>
                  Trabalho em ciclo fechado — pesquisa, roteiro, direção, câmera e finalização — para que a
                  intenção do primeiro briefing chegue intacta ao corte final.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bastidores */}
        <div className="max-w-[1500px] mx-auto mt-20">
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <h3 className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Bastidores <span className="text-signal">·</span> Making of
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {BTS.map((b) => (
              <div key={b.src} className="overflow-hidden rounded-[16px] border border-border">
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 hover:scale-[1.03] transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Serviços — editorial index rows */}
      <section id="servicos" className="py-24 md:py-32 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl md:text-7xl font-extrabold uppercase tracking-[-0.045em]">
              O Ofício
            </h2>
          </div>

          <div className="border-t border-border">
            {services.map((s) => (
              <div
                key={s.n}
                className="group relative grid gap-3 md:grid-cols-[auto_1fr_1.2fr] md:items-center border-b border-border px-2 md:px-6 py-8 md:py-9 transition-colors duration-500 hover:bg-card"
              >
                <span className="absolute left-0 top-0 h-full w-px bg-brand scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                <span className="font-serif-editorial text-lg text-brand/70 md:w-12">{s.n}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-[-0.04em] group-hover:translate-x-1 transition-transform duration-500">
                    {s.title}
                  </h3>
                  <div className="mt-1.5 text-[10px] uppercase tracking-[0.28em] text-signal/80">{s.lead}</div>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground md:pl-8">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section id="instagram" className="py-4 md:py-6 px-3 md:px-5 border-t border-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-2 md:mb-3">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-[-0.045em]">
              No Instagram
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="size-4" />
              @lucasfortes.rec
            </a>
          </div>

          <InstagramCarousel posts={[...INSTAGRAM_PRIORITY, ...INSTAGRAM_POSTS]} />









        </div>
      </section>



      {/* Contato */}
      <section id="contato" className="relative py-28 md:py-40 px-5 md:px-10 border-t border-border overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="relative max-w-[1100px] mx-auto text-center">
          <span className="block text-[11px] uppercase tracking-[0.32em] text-muted-foreground [text-indent:0.32em]">
            Contato
          </span>

          <h2 className="mt-8 font-display text-4xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-balance">
            Conte a ideia,
            <span className="block font-serif-editorial normal-case lowercase text-brand tracking-[-0.02em]">
              eu cuido do resto
            </span>
          </h2>
          <p className="mt-7 mx-auto max-w-xl text-base md:text-lg font-light text-muted-foreground">
            Agenda aberta para poucos projetos por mês. — O orçamento sai no mesmo dia.
          </p>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              onClick={reportWhatsappConversion}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-brand text-brand-foreground px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] hover:-translate-y-0.5 transition-transform shadow-[var(--shadow-elegant)]"
            >
              <MessageCircle className="size-4" />
              Falar no WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-3 rounded-full border border-border px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] hover:border-signal hover:text-signal transition-colors"
            >
              <Mail className="size-4" />
              Enviar e-mail
            </a>
          </div>

          <dl className="mt-16 grid gap-px bg-border border border-border rounded-2xl overflow-hidden max-w-3xl mx-auto">
            {[
              { t: "Atendimento", v: "Todo o Brasil — mediante orçamento" },
              { t: "Endereço", v: "Rua Campolino Alves, 300 — Sala 414, Capoeiras" },
              { t: "Cidade", v: "Florianópolis · SC · 88085-110" },
              { t: "Telefone", v: PHONE_DISPLAY },
              { t: "E-mail", v: EMAIL },
            ].map((r) => (
              <div key={r.t} className="bg-background px-6 py-4 flex items-baseline justify-between gap-4">
                <dt className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">{r.t}</dt>
                <dd className="text-sm text-foreground text-right break-all">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 md:px-10 py-12">
        <div className="max-w-[1500px] mx-auto grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <a href="#top" aria-label="Lucas Fortes REC — início" className="mb-6 inline-flex items-center gap-5">
              <img
                src={brandLogo.url}
                alt="Lucas Fortes REC — Filmmaker"
                width={422}
                height={564}
                loading="lazy"
                className="h-20 w-auto object-contain"
              />
              <span className="flex flex-col gap-2">
                <span className="font-sans text-lg font-medium uppercase tracking-[0.18em]">Lucas Fortes</span>
                <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Filmmaker</span>
              </span>
            </a>
            <div className="mt-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Rua Campolino Alves, 300 · Sala 414 · Capoeiras
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Florianópolis · SC · 88085-110
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
              className="grid place-items-center size-11 rounded-full border border-border bg-card hover:border-signal hover:text-signal transition-all"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              onClick={reportWhatsappConversion}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid place-items-center size-11 rounded-full border border-border bg-card hover:border-signal hover:text-signal transition-all"
            >
              <MessageCircle className="size-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="E-mail"
              className="grid place-items-center size-11 rounded-full border border-border bg-card hover:border-signal hover:text-signal transition-all"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
        onClick={reportWhatsappConversion}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid place-items-center size-14 rounded-full bg-brand text-brand-foreground shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform"
      >
        <MessageCircle className="size-6" />
      </a>

    </div>
  );
}
