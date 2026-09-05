"use client";

import Image from "next/image";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

interface StoryFrameProps {
  alt: string;
  className: string;
  end: number;
  progress: MotionValue<number>;
  src: string;
  start: number;
}

function StoryFrame({
  alt,
  className,
  end,
  progress,
  src,
  start,
}: StoryFrameProps) {
  const fadeInEnd = start === 0 ? 0.01 : start + 0.08;
  const opacity = useTransform(
    progress,
    [start, fadeInEnd, end - 0.08, end],
    [start === 0 ? 1 : 0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [start, fadeInEnd, end],
    [0.92, 1, 1.05],
  );
  const y = useTransform(progress, [start, end], [28, -20]);

  return (
    <motion.div
      className={`absolute overflow-hidden ${className}`}
      style={{ opacity, scale, y }}
    >
      <Image
        src={`${ASSET_PATH}/${src}`}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 44vw, 80vw"
        className="object-cover"
      />
    </motion.div>
  );
}

export function GallerySection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const ampersandY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  if (isMobile) return <MobileGallery />;

  return (
    <section ref={sectionRef} className="h-[300vh] bg-[#f0efea] text-stone-950">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <p className="absolute left-5 top-6 z-10 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500 sm:left-8 sm:top-8 lg:left-12 lg:top-10">
          Chapter two / Our story
        </p>
        <p className="absolute left-1/2 top-6 z-10 -translate-x-1/2 font-sans text-sm tracking-wide sm:top-8 lg:top-10">
          RICKY + Fellycia
        </p>
        <motion.p
          className="absolute left-5 top-1/2 z-20 -translate-y-1/2 font-serif text-4xl sm:left-8 sm:text-6xl lg:left-12 lg:text-7xl"
          style={{ y: leftY }}
        >
          Ricky
        </motion.p>
        <motion.p
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 font-serif text-4xl italic sm:text-6xl lg:text-7xl"
          style={{ y: ampersandY }}
        >
          &amp;
        </motion.p>
        <motion.p
          className="absolute right-5 top-1/2 z-20 -translate-y-1/2 font-serif text-4xl sm:right-8 sm:text-6xl lg:right-12 lg:text-7xl"
          style={{ y: rightY }}
        >
          Fellycia
        </motion.p>
        <StoryFrame src="5.png" alt="Ricky and Fellycia by a sunlit window" start={0} end={0.38} progress={scrollYProgress} className="left-[18%] top-[21%] h-[58%] w-[43%] sm:left-[25%] sm:w-[38%] lg:left-[18%] lg:top-[23%] lg:h-[63%] lg:w-[32%]" />
        <StoryFrame src="4.png" alt="Fellycia posed beside a horse" start={0} end={0.38} progress={scrollYProgress} className="right-[10%] top-[11%] h-[25%] w-[18%] lg:right-[12%] lg:h-[31%] lg:w-[14%]" />
        <StoryFrame src="7.png" alt="Ricky and Fellycia sharing a quiet moment" start={0.3} end={0.7} progress={scrollYProgress} className="left-[15%] top-[28%] h-[50%] w-[62%] sm:left-[23%] sm:w-[52%] lg:left-[28%] lg:top-[20%] lg:h-[65%] lg:w-[43%]" />
        <StoryFrame src="8.png" alt="Fellycia in warm window light" start={0.3} end={0.7} progress={scrollYProgress} className="right-[8%] top-[12%] h-[26%] w-[20%] lg:right-[10%] lg:top-[13%] lg:h-[30%] lg:w-[18%]" />
        <StoryFrame src="9.png" alt="Ricky and Fellycia embracing" start={0.62} end={1} progress={scrollYProgress} className="left-[15%] top-[28%] h-[52%] w-[65%] sm:left-[21%] sm:w-[55%] lg:left-[23%] lg:top-[22%] lg:h-[62%] lg:w-[48%]" />
        <StoryFrame src="6.png" alt="Ricky and Fellycia together by a window" start={0.62} end={1} progress={scrollYProgress} className="right-[8%] top-[12%] h-[26%] w-[20%] lg:right-[9%] lg:top-[10%] lg:h-[31%] lg:w-[18%]" />
        <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-serif text-lg italic text-stone-600 sm:bottom-8">
          Scroll through our favorite frames
        </p>
      </div>
    </section>
  );
}

function MobileGallery() {
  const images = [
    ["5.png", "Ricky and Fellycia by a sunlit window", "aspect-[0.82]"],
    ["4.png", "Fellycia posed beside a horse", "aspect-[0.7]"],
    ["7.png", "Ricky and Fellycia sharing a quiet moment", "aspect-[1.1]"],
    ["8.png", "Fellycia in warm window light", "aspect-[1.1]"],
    ["9.png", "Ricky and Fellycia embracing", "aspect-[1.1]"],
    ["6.png", "Ricky and Fellycia together by a window", "aspect-[1.1]"],
  ] as const;

  return (
    <section className="overflow-hidden bg-[#f0efea] px-5 py-20 text-stone-950">
      <RevealFade className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
        Chapter two / Our story
      </RevealFade>
      <RevealWords
        as="h2"
        text="Ricky & Fellycia"
        className="mt-5 font-serif text-5xl leading-[0.85]"
      />
      <RevealFade className="mt-5 max-w-xs font-sans text-sm leading-7 text-stone-600">
        A small collection of the moments that brought us here.
      </RevealFade>
      <div className="mt-12 space-y-8">
        {images.map(([src, alt, className], index) => (
          <motion.figure
            key={src}
            className={`${className} relative overflow-hidden ${index % 2 === 1 ? "ml-auto w-[72%]" : "w-[88%]"}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
          >
            <Image src={`${ASSET_PATH}/${src}`} alt={alt} fill sizes="90vw" className="object-cover" />
          </motion.figure>
        ))}
      </div>
      <RevealWords
        className="mt-10 text-center font-serif text-2xl italic text-stone-600"
        text="A lifetime, in every frame."
      />
    </section>
  );
}
