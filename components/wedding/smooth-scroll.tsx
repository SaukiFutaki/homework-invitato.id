"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

interface SmoothScrollProps { children: ReactNode; }

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.2 });
    let frameId = 0;
    const raf = (time: number) => { lenis.raf(time); frameId = requestAnimationFrame(raf); };
    frameId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frameId); lenis.destroy(); };
  }, []);
  return children;
}
