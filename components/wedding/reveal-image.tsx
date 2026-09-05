"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface RevealImageProps {
  alt: string;
  className?: string;
  imageClassName?: string;
  src: string;
}

export function RevealImage({ alt, className = "", imageClassName = "", src }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : undefined} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div className="absolute inset-0" initial={{ scale: 1.22 }} animate={isInView ? { scale: 1 } : undefined} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className={`object-cover ${imageClassName}`} />
      </motion.div>
    </motion.div>
  );
}
