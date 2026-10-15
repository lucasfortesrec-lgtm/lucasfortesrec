type Participant = { stop: () => Promise<unknown> | void };
const participants = new Map<string, Participant>();
let generation = 0;
let activeId: string | undefined;

export function registerPlayback(id: string, participant: Participant) {
  participants.set(id, participant);
  return () => {
    if (participants.get(id) === participant) participants.delete(id);
    if (activeId === id) { activeId = undefined; generation++; }
  };
}

export function pausePlayback(except?: string, element?: HTMLVideoElement) {
  const pending: Promise<unknown>[] = [];
  participants.forEach((participant, id) => {
    if (id !== except) pending.push(Promise.resolve(participant.stop()).catch(() => {}));
  });
  // Also cover existing gallery HTML5 videos without changing their presentation.
  document.querySelectorAll('video').forEach(video => {
    if (video !== element) video.pause();
  });
  return Promise.all(pending);
}

export function claimPlayback(id: string, element?: HTMLVideoElement) {
  activeId = id;
  const token = ++generation;
  const settled = pausePlayback(id, element);
  return { settled, current: () => activeId === id && token === generation };
}

export function stopAllPlayback() {
  activeId = undefined;
  generation++;
  return pausePlayback();
}