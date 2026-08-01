import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Play,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import lucasSet from "@/assets/lucas-set.jpg.asset.json";
import bts1 from "@/assets/bts-1.jpg.asset.json";
import bts2 from "@/assets/bts-2.jpg.asset.json";
import bts3 from "@/assets/bts-3.jpg.asset.json";
import bts4 from "@/assets/bts-4.jpg.asset.json";

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
      { title: "LUCAS FORTES.REC — Filmes de Marca em Florianópolis" },
      {
        name: "description",
        content:
          "Direção, câmera e cor cinematográfica para marcas, profissionais liberais e eventos premium em Santa Catarina. Filmes que fazem o negócio ser lembrado.",
      },
      { property: "og:title", content: "LUCAS FORTES.REC — Filmes de Marca" },
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

const WHATSAPP_URL = "https://wa.me/5548998294750";
const INSTAGRAM_URL = "https://instagram.com/lucasfortes.rec";

// ratio = largura/altura da mídia real de cada post (medido no embed)
const INSTAGRAM_POSTS: { id: string; ratio: number }[] = [
  { id: "DbVuBimRBFY", ratio: 4 / 5 },
  { id: "DbO1tXPxxTV", ratio: 4 / 5 },
  { id: "DbKEQRotrcx", ratio: 4 / 5 },
  { id: "Da_T_j9kRE7", ratio: 4 / 5 },
  { id: "DYTWBuzNIxx", ratio: 16 / 9 },
  { id: "DYTQVZ2jSsA", ratio: 387 / 330 },
  { id: "DYTOutBtDXL", ratio: 4 / 5 },
  { id: "DYTOZb-NBe2", ratio: 4 / 5 },
  { id: "DYTMmXZNZVI", ratio: 4 / 5 },
  { id: "DYTMkB_tMRC", ratio: 4 / 5 },
  { id: "DYTMhg1tWxP", ratio: 4 / 5 },
];


const EMAIL = "lucasfortesrec@gmail.com";
const PHONE_DISPLAY = "48 9 9829 4750";
const SHOWREEL = "https://player.vimeo.com/video/76979871";

const nav = [
  { label: "Reel", href: "#showreel", index: "01" },
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

const principles = [
  "Direção",
  "Roteiro",
  "Câmera",
  "Luz",
  "Movimento",
  "Cor",
  "Ritmo",
  "Entrega",
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
          <a href="#top" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-[15px] md:text-[17px] font-extrabold tracking-[-0.02em] uppercase">
              Lucas Fortes<span className="text-foreground">.</span>
              <span className="text-brand">rec</span>
            </span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
              Filmmaker
            </span>
          </a>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-7 lg:gap-x-9">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-bone text-background px-5 md:px-6 py-2 md:py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] hover:bg-brand hover:text-brand-foreground transition-colors"
            >
              Orçamento
            </a>
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
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-muted-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-brand/70 animate-ping" />
                  <span className="relative size-1.5 rounded-full bg-brand" />
                </span>
                Est. 2020 — Filmes sob medida
              </div>

              <h1 className="mt-8 font-display font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-[clamp(2.9rem,10vw,8.5rem)]">
                Imagem
                <span className="block">
                  <span className="font-serif-editorial lowercase text-brand normal-case tracking-[-0.02em]">
                    que faz
                  </span>{" "}
                  lembrar
                </span>
              </h1>

              <p className="mt-9 max-w-xl text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                Não vendemos vídeo por minuto. Construímos a memória visual de marcas, profissionais e
                celebrações — do primeiro roteiro ao último frame colorizado.
              </p>

              <div className="mt-11 flex flex-wrap items-center gap-5">
                <a
                  href="#showreel"
                  className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground"
                >
                  <span className="grid place-items-center size-11 rounded-full border border-border group-hover:border-signal group-hover:text-signal transition-colors">
                    <Play className="size-3.5 fill-current" />
                  </span>
                  Assistir reel
                </a>
              </div>
            </div>

            {/* right stat column */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 lg:block lg:space-y-8">
              {[
                { k: "80+", v: "Projetos entregues" },
                { k: "06", v: "Anos de estrada" },
                { k: "4K", v: "Cinema pipeline" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-2xl lg:text-3xl font-extrabold tracking-[-0.04em]">{s.k}</div>
                  <div className="mt-1.5 text-[9px] lg:text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="border-t border-border" />

      </section>

      {/* Showreel */}
      <section id="showreel" className="py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="flex items-baseline gap-4">
              <span className="font-serif-editorial text-brand text-xl">01</span>
              <h2 className="font-display text-4xl md:text-7xl font-extrabold uppercase tracking-[-0.045em]">
                O Reel
              </h2>
            </div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Seleção 2024 — 2026
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-[28px] border border-border bg-black shadow-[var(--shadow-card)]">
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
        <div className="max-w-[1500px] mx-auto grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-serif-editorial text-brand text-xl">02</span>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
                O Filmmaker
              </h2>
            </div>
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
            <div className="mt-10 overflow-hidden rounded-[20px] border border-border">
              <img
                src={lucasSet.url}
                alt="Lucas Fortes em set de filmagem com iluminação profissional"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover grayscale-[0.25] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>


          <div className="space-y-7">
            <p className="font-serif-editorial text-2xl md:text-4xl leading-[1.25] text-bone">
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
                intenção do primeiro briefing chegue intacta ao corte final. Poucos projetos por mês, atenção
                inteira em cada um.
              </p>
            </div>
          </div>
        </div>

        {/* Etapas do processo — lista estática */}
        <div className="max-w-[1500px] mx-auto mt-20 border-t border-border pt-8">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {principles.map((c) => (
              <span
                key={c}
                className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* Serviços — editorial index rows */}
      <section id="servicos" className="py-24 md:py-32 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-baseline gap-4">
              <span className="font-serif-editorial text-brand text-xl">03</span>
              <h2 className="font-display text-4xl md:text-7xl font-extrabold uppercase tracking-[-0.045em]">
                O Ofício
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Seis frentes, um mesmo padrão de direção. Escolha o formato — a exigência é sempre a mesma.
            </p>
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
      <section id="instagram" className="py-6 md:py-8 px-5 md:px-10 border-t border-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {INSTAGRAM_POSTS.map(({ id, ratio }) => (
              <div
                key={id}
                style={{ aspectRatio: ratio }}
                className="relative w-full rounded-[16px] border border-border bg-background overflow-hidden"
              >
                <iframe
                  src={`https://www.instagram.com/p/${id}/embed`}
                  title={`Publicação ${id} no Instagram de Lucas Fortes`}
                  loading="lazy"
                  scrolling="no"
                  style={{ height: "calc(100% + 56px)", marginTop: "-54px" }}
                  className="w-full block border-0"
                />
              </div>
            ))}
          </div>



        </div>
      </section>


      {/* Contato */}
      <section id="contato" className="relative py-28 md:py-40 px-5 md:px-10 border-t border-border overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[32rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="relative max-w-[1500px] mx-auto grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-serif-editorial text-brand text-xl">05</span>
              <span className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">Contato</span>
            </div>
            <h2 className="mt-7 font-display text-4xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
              Conte a ideia,
              <span className="block font-serif-editorial normal-case lowercase text-brand tracking-[-0.02em]">
                eu cuido do resto
              </span>
            </h2>
            <p className="mt-7 max-w-lg text-base md:text-lg font-light text-muted-foreground">
              Agenda aberta para poucos projetos por mês. Responder leva minutos — o orçamento sai no mesmo dia.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL}
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
          </div>

          <dl className="grid gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              { t: "Atendimento", v: "Todo o Brasil — mediante orçamento" },
              { t: "Endereço", v: "Rua Campolino Alves, 300 — Sala 414, Capoeiras" },
              { t: "Cidade", v: "Florianópolis · SC · 88085-110" },
              { t: "Telefone", v: PHONE_DISPLAY },
              { t: "E-mail", v: EMAIL },
            ].map((r) => (

              <div key={r.t} className="bg-background px-6 py-5 flex items-baseline justify-between gap-4">
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
            <div className="font-display text-base font-extrabold uppercase tracking-[-0.02em]">
              Lucas Fortes<span className="text-foreground">.</span>
              <span className="text-brand">rec</span>
            </div>
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
