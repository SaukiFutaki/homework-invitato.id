"use client";

import { useEffect, useRef } from "react";

const MUSIC_EVENT = "wedding:play-music";

export function playWeddingMusic() {
  window.dispatchEvent(new Event(MUSIC_EVENT));
}

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const play = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.play().catch(() => undefined);
    };
    window.addEventListener(MUSIC_EVENT, play);
    return () => window.removeEventListener(MUSIC_EVENT, play);
  }, []);

  return <audio ref={audioRef} src="/music.mp3" loop preload="auto" volume={0.35} />;
}
