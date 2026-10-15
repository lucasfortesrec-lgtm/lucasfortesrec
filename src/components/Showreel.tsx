import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Content } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { VimeoPlayer } from '@/components/VimeoPlayer';
import { claimPlayback, registerPlayback, stopAllPlayback } from '@/lib/playback-coordinator';
import film from '@/assets/aftermovie-proscale-club-x-slash.mp4.asset.json';
import webFilm from '@/assets/aftermovie-proscale-club-x-slash.webm.asset.json';
import poster from '@/assets/aftermovie-proscale-poster.jpg.asset.json';
import oldPoster from '@/assets/automotivo-vimeo-1216120956.jpg.asset.json';

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(true);
  const requestRef = useRef<ReturnType<typeof claimPlayback> | null>(null);
  const desiredMuted = useRef(false);

  useEffect(() => registerPlayback('showreel-main', {
    stop: () => {
      requestRef.current = null;
      videoRef.current?.pause();
    },
  }), []);

  const coordinatePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setError(false);
    desiredMuted.current = video.muted;
    video.muted = true;
    const request = claimPlayback('showreel-main', video);
    requestRef.current = request;
    setPaused(false);
    void request.settled.then(() => {
      if (request.current() && requestRef.current === request && !video.paused) {
        video.muted = desiredMuted.current;
      } else {
        video.pause();
      }
    });
  };

  const changeOpen = (next: boolean) => {
    // Cancel every pending play/unmute before mounting or unmounting the old film.
    void stopAllPlayback();
    setOpen(next);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative aspect-video overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-card)]">
        <video
          ref={videoRef}
          poster={poster.url}
          aria-label="Aftermovie Proscale Club X Slash"
          className="h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
          onPlay={coordinatePlay}
          onPlaying={() => { if (!requestRef.current?.current()) videoRef.current?.pause(); }}
          onPause={() => {
            requestRef.current = null;
            setPaused(true);
            if (videoRef.current) videoRef.current.muted = desiredMuted.current;
          }}
          onEnded={() => setPaused(true)}
          onError={() => setError(true)}
          onContextMenu={event => event.preventDefault()}
        >
          <source src={film.url} type="video/mp4; codecs=&quot;avc1.640028, mp4a.40.2&quot;" />
          <source src={webFilm.url} type="video/webm" />
        </video>
        {paused && !error && (
          <Button variant="ghost" size="icon" aria-label="Reproduzir Aftermovie Proscale Club X Slash"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-bone/90 text-background hover:bg-bone"
            onClick={() => { void videoRef.current?.play().catch(() => setError(true)); }}>
            <Play className="fill-current" />
          </Button>
        )}
        {error && <p role="alert" className="absolute inset-x-0 top-4 text-center text-sm text-foreground bg-background/90 py-3">Não foi possível carregar o vídeo. Tente novamente.</p>}
      </div>

      <Dialog open={open} onOpenChange={changeOpen}>
        <Button ref={thumbnailRef} variant="ghost" onClick={() => changeOpen(true)} aria-haspopup="dialog"
          className="mt-4 h-auto w-full justify-start gap-4 whitespace-normal rounded-xl border border-border px-3 py-3 text-left hover:bg-card">
          <span className="relative block w-28 sm:w-36 shrink-0 aspect-video overflow-hidden rounded-md">
            <img src={oldPoster.url} alt="Automóvel do filme anterior" className="h-full w-full object-cover" loading="lazy" />
            <span className="absolute inset-0 grid place-items-center bg-background/20"><Play className="fill-current text-bone" /></span>
          </span>
          <span className="text-xs sm:text-sm font-normal text-muted-foreground">Filme automotivo <span className="block mt-1 text-[10px] uppercase tracking-[0.12em]">Lucas Fortes.REC</span></span>
        </Button>
        <DialogPortal>
          <DialogOverlay className="bg-background/90 backdrop-blur-sm" />
          <Content aria-describedby="automotive-description"
            onCloseAutoFocus={event => { event.preventDefault(); thumbnailRef.current?.focus(); }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-border bg-background p-3 sm:p-5 shadow-[var(--shadow-card)] focus:outline-none">
            <div className="flex items-center justify-between gap-4 mb-3">
              <DialogTitle className="text-sm font-medium">Filme automotivo</DialogTitle>
              <DialogClose asChild><Button variant="ghost" size="icon" aria-label="Fechar vídeo" autoFocus><X /></Button></DialogClose>
            </div>
            <DialogDescription id="automotive-description" className="sr-only">Filme automotivo de Lucas Fortes.REC.</DialogDescription>
            {open && <div className="aspect-video overflow-hidden rounded-xl"><VimeoPlayer videoUrl="https://player.vimeo.com/video/1216120956" title="Filme automotivo Lucas Fortes" className="h-full w-full" /></div>}
          </Content>
        </DialogPortal>
      </Dialog>
    </div>
  );
}