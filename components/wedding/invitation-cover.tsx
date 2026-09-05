"use client";

import Image from "next/image";
import { playWeddingMusic } from "@/components/wedding/background-music";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function InvitationCover() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

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
        <CoverLayout isMobile={isMobile} onOpen={openInvitation} />
      )}
    </AnimatePresence>
  );
}

function CoverLayout({
  isMobile,
  onOpen,
}: {
  isMobile: boolean;
  onOpen: () => void;
}) {
  if (isMobile) return <MobileCover onOpen={onOpen} />;
  return <DesktopCover onOpen={onOpen} />;
}

function MobileCover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section
      className="fixed inset-0 z-50 overflow-hidden bg-[#e9e4da] text-stone-950"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Wedding invitation cover"
    >
      <motion.div
        className="absolute inset-y-0 right-0 w-[64%]"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={`${ASSET_PATH}/1.png`}
          alt="Ricky and Fellycia on a sailboat"
          fill
          priority
          sizes="70vw"
          className="object-cover object-[55%_center]"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#e9e4da] via-[#e9e4da]/90 to-transparent" />
      <div className="relative flex h-[100dvh] flex-col justify-between px-5 py-7">
        <CoverHeader />
        <div className="pb-24">
          <CoverTitle className="text-[clamp(2.9rem,13vw,4.8rem)] leading-[0.82]" />
        </div>
        <OpenButton onOpen={onOpen} className="bottom-6 min-h-14 px-7 text-[10px]" />
      </div>
    </motion.section>
  );
}

function DesktopCover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section
      className="fixed inset-0 z-50 overflow-hidden bg-[#e9e4da] text-stone-950"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Wedding invitation cover"
    >
      <motion.div
        className="absolute inset-y-0 right-0 w-[52%]"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={`${ASSET_PATH}/1.png`}
          alt="Ricky and Fellycia on a sailboat"
          fill
          priority
          sizes="60vw"
          className="object-cover object-[54%_center]"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#e9e4da] via-[#e9e4da]/90 to-transparent" />
      <div className="relative flex h-full flex-col justify-between px-8 py-8 lg:px-12 lg:py-10">
        <CoverHeader />
        <div className="mb-16 max-w-xl">
          <CoverTitle className="text-[clamp(3.8rem,10vw,9.5rem)] leading-[0.78]" />
        </div>
        <OpenButton onOpen={onOpen} className="bottom-8 min-h-16 px-10 text-[11px]" />
      </div>
    </motion.section>
  );
}

function CoverHeader() {
  return (
    <motion.header
      className="flex items-center justify-between font-sans text-[10px] font-medium uppercase tracking-[0.2em]"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <span>Ricky &amp; Fellycia</span>
      <span>16.08.27</span>
    </motion.header>
  );
}

function CoverTitle({ className }: { className: string }) {
  return (
    <>
      <motion.p
        className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-stone-600"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.75 }}
      >
        A warm invitation for
      </motion.p>
      <h1 className={`font-serif ${className}`}>
        {["Dear", "Mr. / Mrs. / Ms.", "Invitato"].map((line, index) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className={`block ${index === 1 ? "italic" : ""}`}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.35 + index * 0.15,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
    </>
  );
}

function OpenButton({
  className,
  onOpen,
}: {
  className: string;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`group absolute left-1/2 flex -translate-x-1/2 items-center gap-5 bg-stone-950 font-sans font-medium uppercase tracking-[0.2em] text-[#f6f5f0] transition-colors hover:bg-stone-800 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.05, duration: 0.75 }}
    >
      <span>Open invitation</span>
      <span
        aria-hidden="true"
        className="text-xl leading-none transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </motion.button>
  );
}
