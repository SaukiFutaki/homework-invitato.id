"use client";

import Image from "next/image";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Name({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (isMobile) return <MobileHero />;

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[100dvh] min-h-[40rem] overflow-hidden bg-[#e9e4da] text-stone-950"
      aria-label="Wedding invitation for Ricky and Felly"
    >
      <motion.div
        className="absolute inset-0 lg:left-[45%]"
        style={{ y: photoY }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={`${ASSET_PATH}/1.png`}
          alt="Ricky and Felly standing together on a sailboat"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover object-[54%_57%] lg:object-[52%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/45 lg:hidden" />
      <div className="absolute inset-y-0 left-0 hidden w-[45%] bg-[#e9e4da] lg:block" />

      <motion.div
        className="relative flex h-full flex-col justify-between px-5 py-6 text-white sm:px-8 sm:py-8 lg:w-[45%] lg:px-12 lg:py-10 lg:text-stone-950"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.header
          className="flex justify-between font-sans text-[10px] font-medium uppercase tracking-[0.2em] lg:justify-start lg:gap-12"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.75 }}
        >
          <span>The wedding of</span>
          <span className="lg:hidden">16.08.27</span>
          <span className="hidden lg:inline">Jakarta</span>
        </motion.header>

        <div className="mb-8 lg:mb-14">
          <motion.p
            className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.28em] lg:mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Save the date
          </motion.p>
          <h1 className="font-serif text-[clamp(4.7rem,19vw,10.5rem)] leading-[0.72] lg:text-[clamp(6.2rem,9.7vw,11rem)]">
            <Name delay={0.28}>Ricky</Name>
            <motion.span
              className="ml-[0.13em] block overflow-hidden italic"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.43,
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              &amp;
            </motion.span>
            <Name delay={0.58}>Fellycia</Name>
          </h1>
          <motion.div
            className="mt-8 flex items-end gap-4 lg:mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
          >
            <span className="h-px w-9 bg-current" />
            <p className="font-serif text-xl leading-none sm:text-2xl">
              Monday, 16 August 2027
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] lg:left-12 lg:translate-x-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
        >
          <span>Scroll to unfold</span>
          <span className="h-8 w-px bg-current" />
        </motion.div>
      </motion.div>

      <motion.p
        className="absolute bottom-8 right-5 hidden font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:right-8 lg:block lg:right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        A new chapter begins
      </motion.p>
    </section>
  );
}

function MobileHero() {
  return (
    <section
      className="relative isolate h-[100dvh] min-h-[38rem] overflow-hidden bg-stone-950 text-white"
      aria-label="Wedding invitation for Ricky and Felly"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={`${ASSET_PATH}/1.png`}
          alt="Ricky and Felly standing together on a sailboat"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[54%_55%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/70" />
      <div className="relative flex h-full flex-col justify-between px-5 py-6">
        <motion.header
          className="flex items-center justify-between font-sans text-[9px] font-medium uppercase tracking-[0.18em]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <span>The wedding of</span>
          <span>16.08.27</span>
        </motion.header>
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 font-sans text-[9px] font-medium uppercase tracking-[0.22em]">
            Save the date
          </p>
          <h1 className="font-serif text-6xl leading-[0.76]">
            <span className="block">Ricky</span>
            <span className="ml-5 block italic">&amp;</span>
            <span className="block">Felly</span>
          </h1>
          <div className="mt-7 border-l border-white/70 pl-4 font-serif text-xl leading-tight">
            Monday,
            <br />
            16 August 2027
          </div>
        </motion.div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-sans text-[8px] uppercase tracking-[0.2em]">
          <span>Scroll to unfold</span>
          <span className="h-6 w-px bg-white/80" />
        </div>
      </div>
    </section>
  );
}
