import { useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Content } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { VimeoPlayer } from '@/components/VimeoPlayer';
import { stopAllPlayback } from '@/lib/playback-coordinator';
import { YouTubePlayer } from '@/components/YouTubePlayer';
import oldPoster from '@/assets/automotivo-vimeo-1216120956.jpg.asset.json';

export function Showreel() {
  const thumbnailRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const changeOpen = (next: boolean) => {
    // Cancel every pending play/unmute before mounting or unmounting the old film.
    void stopAllPlayback();
    setOpen(next);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div id="reel-video">
        <YouTubePlayer />
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