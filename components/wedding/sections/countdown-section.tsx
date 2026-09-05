"use client";

import Image from "next/image";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH, WEDDING_TIME } from "@/lib/constants";
import { useEffect, useState } from "react";

function getRemainingTime() {
  const difference = Math.max(WEDDING_TIME - Date.now(), 0);

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export function CountdownSection() {
  const [time, setTime] = useState(getRemainingTime);

  useEffect(() => {
    const timer = window.setInterval(
      () => setTime(getRemainingTime()),
      1_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const parts = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#e9e4da] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <Image
        src={`${WEDDING_ASSET_PATH}/background.jpg`}
        alt="Soft silk texture"
        fill
        sizes="100vw"
        className="object-cover opacity-30 mix-blend-multiply"
      />
      <div className="relative mx-auto max-w-7xl">
        <RevealFade className="mb-7 text-center font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">
          Until we say I do
        </RevealFade>
        <RevealWords
          as="h2"
          text={"The countdown\nto forever"}
          className="text-center font-serif text-5xl leading-[0.88] text-stone-900 sm:text-7xl lg:text-8xl"
        />
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-4 border-y border-stone-500 sm:mt-20">
          {parts.map(([label, value], index) => (
            <div
              key={label}
              className={`py-7 text-center sm:py-10 ${index > 0 ? "border-l border-stone-500" : ""}`}
            >
              <p className="font-serif text-5xl leading-none text-stone-900 sm:text-7xl lg:text-8xl">
                {String(value).padStart(2, "0")}
              </p>
              <p className="mt-3 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500 sm:text-[10px]">
                {label}
              </p>
            </div>
          ))}
        </div>
        <RevealFade className="mt-8 text-center font-serif text-lg italic text-stone-700">
          16 August 2027, Jakarta
        </RevealFade>
      </div>
    </section>
  );
}
