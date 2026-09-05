"use client";

import Image from "next/image";
import { playWeddingMusic } from "@/components/wedding/background-music";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ASSET_PATH = "/hometask-assets-rickyfelly";

export function InvitationCover() {
  const [isOpen, setIsOpen] = useState(false);

  const openInvitation = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    playWeddingMusic();
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
    document.documentElement.style.overflow = "";
    return undefined;
  }, [isOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          className="fixed inset-0 z-50 overflow-hidden bg-[#e9e4da] text-stone-950"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Wedding invitation cover"
        >
          <motion.div className="absolute inset-y-0 right-0 w-[58%] sm:w-[52%]" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}>
            <Image src={`${ASSET_PATH}/1.png`} alt="Ricky and Felly on a sailboat" fill priority sizes="60vw" className="object-cover object-[54%_center]" />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#e9e4da] via-[#e9e4da]/90 to-transparent" />

          <div className="relative flex h-full flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            <motion.header className="flex items-center justify-between font-sans text-[10px] font-medium uppercase tracking-[0.2em]" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
              <span>Ricky &amp; Felly</span><span>16.08.27</span>
            </motion.header>

            <div className="mb-8 max-w-[20rem] sm:max-w-sm lg:mb-16 lg:max-w-xl">
              <motion.p className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-stone-600" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.75 }}>A warm invitation for</motion.p>
              <h1 className="font-serif text-[clamp(3.8rem,10vw,9.5rem)] leading-[0.78]">
                <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}>Dear</motion.span></span>
                <span className="block overflow-hidden"><motion.span className="block italic" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}>Mr. / Mrs. / Ms.</motion.span></span>
                <span className="block overflow-hidden"><motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}>Invitato</motion.span></span>
              </h1>
            </div>

            <motion.button type="button" onClick={openInvitation} className="group absolute bottom-6 left-1/2 flex min-h-16 -translate-x-1/2 items-center gap-5 bg-stone-950 px-8 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#f6f5f0] transition-colors hover:bg-stone-800 sm:bottom-8 sm:px-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.75 }}>
              <span>Open invitation</span><span aria-hidden="true" className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
            </motion.button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
