"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealTag = "p" | "h1" | "h2" | "h3";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: "115%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
};

export function RevealWords({
  as = "p",
  className,
  delay = 0,
  text,
}: {
  as?: RevealTag;
  className?: string;
  delay?: number;
  text: string;
}) {
  const MotionTag = motionTags[as];

  return (
    <MotionTag
      className={className}
      variants={{
        ...container,
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.045,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
    >
      {text.split("\n").map((line, lineIndex) => (
        <span key={`${line}-${lineIndex}`} className="block">
          {line.split(" ").map((textWord, index) => (
            <span
              key={`${textWord}-${index}`}
              className="mr-[0.18em] inline-block overflow-hidden align-bottom"
            >
              <motion.span className="inline-block" variants={word}>
                {textWord}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}

export function RevealFade({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
