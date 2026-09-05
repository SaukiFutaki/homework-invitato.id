import Image from "next/image";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";

export function ThankYouSection() {
  return (
    <section className="relative isolate flex min-h-[85dvh] items-end overflow-hidden bg-stone-950 px-5 py-10 text-[#f8f7f2] sm:px-8 sm:py-12 lg:min-h-[100dvh] lg:px-12">
      <Image
        src={`${ASSET_PATH}/5.png`}
        alt="Ricky and Felly sharing a quiet moment"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-75"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      <div className="w-full border-t border-white/50 pt-7 sm:pt-9">
        <RevealFade className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.24em]">
          With love and gratitude
        </RevealFade>
        <RevealWords
          as="h2"
          text={"Thank\nyou."}
          className="max-w-4xl font-serif text-6xl italic leading-[0.8] sm:text-8xl lg:text-9xl"
        />
        <div className="mt-12 flex items-end justify-between font-sans text-[10px] font-medium uppercase tracking-[0.2em]">
          <span>Ricky &amp; Felly</span>
          <span>16.08.27</span>
        </div>
      </div>
    </section>
  );
}
