"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MUSIC_EVENT = "wedding:play-music";

export function playWeddingMusic() {
  window.dispatchEvent(new Event(MUSIC_EVENT));
}

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const pause = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
    };

    const shouldPlay = () => pathname === "/" && document.visibilityState === "visible";

    const play = () => {
      hasStartedRef.current = true;
      const audio = audioRef.current;
      if (!audio || !shouldPlay()) return;
      audio.volume = 0.35;
      audio.play().catch(() => undefined);
    };

    const syncPlayback = () => {
      if (!hasStartedRef.current) return;
      if (shouldPlay()) {
        play();
        return;
      }
      pause();
    };

    window.addEventListener(MUSIC_EVENT, play);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("pagehide", pause);
    syncPlayback();

    return () => {
      window.removeEventListener(MUSIC_EVENT, play);
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("pagehide", pause);
      pause();
    };
  }, [pathname]);

  return <audio ref={audioRef} src="/bg-sound.mp3" loop preload="auto" />;
}
