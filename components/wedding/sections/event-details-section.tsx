"use client";

import Image from "next/image";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function EventDetailsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "7%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#ebe8df] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:items-center">
          <div className="relative aspect-[0.81] w-full overflow-hidden bg-stone-800 lg:max-h-[78vh]">
            <motion.div
              className="absolute -inset-y-[10%] inset-x-0"
              style={{ y: imageY }}
            >
              <Image
                src={`${ASSET_PATH}/10.png`}
                alt="Ricky and Fellycia by an open window"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:py-32">
          <RevealFade className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Chapter three / Gather with us
          </RevealFade>
          <RevealWords
            as="h2"
            text={"When &\nwhere"}
            className="font-serif text-5xl leading-[0.9] text-stone-900 sm:text-7xl"
          />
          <div className="mt-16 divide-y divide-stone-400 border-y border-stone-400">
            <EventRow label="Date">Monday, 16 August 2027</EventRow>
            <EventRow label="Ceremony">
              <p className="font-serif text-2xl text-stone-900">15.30 GMT+7</p>
              <p className="mt-1 font-sans text-sm leading-6 text-stone-600">
                The Glass House
                <br />
                South Jakarta
              </p>
            </EventRow>
            <EventRow label="Reception">
              <p className="font-serif text-2xl text-stone-900">18.30 GMT+7</p>
              <p className="mt-1 font-sans text-sm leading-6 text-stone-600">
                Dinner and dancing to follow
              </p>
            </EventRow>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="mt-9 w-fit border-b border-stone-900 pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-stone-900 transition-opacity hover:opacity-55"
          >
            Open map
          </a>
          <div className="mt-12 overflow-hidden border border-stone-400 bg-stone-200">
            <iframe
              title="The Glass House location map"
              src="https://www.google.com/maps?q=The%20Glass%20House%20South%20Jakarta&output=embed"
              className="h-72 w-full grayscale sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EventRow({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="grid gap-2 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
      <RevealFade className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-500">
        {label}
      </RevealFade>
      {typeof children === "string" ? (
        <RevealWords
          text={children}
          className="font-serif text-2xl text-stone-900"
        />
      ) : (
        <RevealFade>{children}</RevealFade>
      )}
    </div>
  );
}
