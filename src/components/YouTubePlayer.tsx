import { useEffect, useRef, useState } from 'react';
import { ExternalLink, LoaderCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { claimPlayback, registerPlayback } from '@/lib/playback-coordinator';
import { loadYouTubeAPI, type YouTubePlayer as Player } from '@/lib/youtube-api';
import poster from '@/assets/aftermovie-proscale-poster.jpg.asset.json';

const VIDEO_ID = 'M9TM0VV6VuY';
const PLAYBACK_ID = `youtube-${VIDEO_ID}`;

export function YouTubePlayer() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const readyRef = useRef(false);
  const requestRef = useRef<ReturnType<typeof claimPlayback> | null>(null);
  const [paused, setPaused] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let player: Player | undefined;
    const disableCaptions = (target: Player | undefined) => {
      if (disposed || !target?.getOptions || !target.setOption) return;
      try {
        if (target.getOptions().includes('captions')) {
          target.setOption('captions', 'track', {});
        }
      } catch {
        // Some embeds do not expose caption track selection; never mask the video.
      }
    };
    const stop = () => {
      requestRef.current = null;
      player?.mute();
      player?.pauseVideo();
      if (!disposed) { setPaused(true); setWaiting(false); }
    };
    const unregister = registerPlayback(PLAYBACK_ID, { stop });
    const timeout = window.setTimeout(() => {
      if (!readyRef.current && !disposed) { stop(); setError(true); }
    }, 25000);

    void loadYouTubeAPI().then(api => {
      if (disposed) return;
      const mount = document.createElement('div');
      host.appendChild(mount);
      player = new api.Player(mount, {
        videoId: VIDEO_ID, width: '100%', height: '100%',
        playerVars: { enablejsapi: 1, origin: window.location.origin, controls: 0,
          playsinline: 1, rel: 0, fs: 0, disablekb: 1, autoplay: 0, iv_load_policy: 3, cc_load_policy: 0 },
        events: {
          onReady: event => {
            if (disposed) return;
            window.clearTimeout(timeout);
            playerRef.current = event.target;
            readyRef.current = true;
            event.target.mute();
            disableCaptions(event.target);
            const iframe = host.querySelector('iframe');
            if (iframe) iframe.title = 'Aftermovie Proscale Club X Slash — YouTube';
            if (requestRef.current?.current()) event.target.playVideo();
          },
          onStateChange: event => {
            if (disposed) return;
            disableCaptions(player);
            if (event.data === 1) {
              const request = requestRef.current;
              if (!request?.current()) { stop(); return; }
              setPaused(false); setWaiting(false);
              void request.settled.then(() => {
                if (!disposed && request.current() && requestRef.current === request) player?.unMute();
                else if (!requestRef.current?.current()) { player?.mute(); player?.pauseVideo(); }
              });
            } else if (event.data === 0 || event.data === 2) {
              setPaused(true); setWaiting(false);
            }
          },
          onError: () => { if (!disposed) { stop(); setError(true); } },
          onApiChange: event => disableCaptions(event.target),
        },
      });
      playerRef.current = player;
    }).catch(() => { if (!disposed) { stop(); setError(true); } });
    return () => {
      stop(); disposed = true;
      window.clearTimeout(timeout);
      unregister(); readyRef.current = false; playerRef.current = null;
      player?.destroy(); host.replaceChildren();
    };
  }, []);

  const toggle = () => {
    if (!paused || waiting) {
      requestRef.current = null;
      playerRef.current?.mute(); playerRef.current?.pauseVideo();
      setPaused(true); setWaiting(false);
      return;
    }
    requestRef.current = claimPlayback(PLAYBACK_ID);
    setStarted(true);
    setWaiting(true);
    // Retain the user's first intent until the real SDK signals readiness.
    if (readyRef.current) { playerRef.current?.mute(); playerRef.current?.playVideo(); }
  };

  return (
    <div className="relative group aspect-video overflow-hidden rounded-[20px] border border-border bg-background shadow-[var(--shadow-card)]">
      <div ref={hostRef} className={`absolute inset-0 h-full w-full ${started ? '' : 'invisible'}`} />
      {!started && !error && <img src={poster.url} alt="Aftermovie Proscale Club X Slash" className="absolute inset-0 h-full w-full object-cover" />}
      {!error && <Button variant="ghost" onClick={toggle}
        aria-label={waiting ? 'Cancelar carregamento do Aftermovie' : paused ? 'Reproduzir Aftermovie Proscale Club X Slash' : 'Pausar Aftermovie Proscale Club X Slash'}
        className="absolute inset-0 z-10 grid h-full w-full place-items-center touch-manipulation bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
        {(paused || waiting) &&
          <span className="grid size-16 place-items-center rounded-full bg-bone/90 text-background backdrop-blur-sm">
            {waiting ? <LoaderCircle className="motion-safe:animate-spin" /> : <Play className="fill-current" />}
          </span>}
      </Button>}
      {error && <div role="alert" className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-background/90 p-5 text-center">
        <p className="text-sm text-foreground">Não foi possível reproduzir este vídeo aqui.</p>
        <Button variant="outline" asChild><a href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} target="_blank" rel="noopener noreferrer"><ExternalLink /> Assistir no YouTube</a></Button>
      </div>}
    </div>
  );
}