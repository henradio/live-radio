// src/app/interfaces/stream-state.ts
export interface StreamState {
  playing: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number | null
  currentTime: number | null
  canplay: boolean;
  error: boolean;
  volume: number | null
  muted: boolean | null
}
