"use client";

import { RevealImage } from "@/components/wedding/reveal-image";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";

export function CoupleIntroSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="bg-[#f6f5f0] px-5 py-20 text-stone-900">
        <RevealFade className="mb-6 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
          Chapter one / The beginning
        </RevealFade>
        <RevealWords
          as="h2"
          text="Our story is better together."
          className="font-serif text-5xl leading-[0.9]"
        />
        <RevealFade className="mt-7 max-w-sm font-sans text-sm leading-7 text-stone-600">
          Two souls, one shared horizon. With full hearts, we invite you to
          witness the start of our forever.
        </RevealFade>
        <RevealImage
          src={`${ASSET_PATH}/2.png`}
          alt="Ricky and Felly in an elegant monochrome portrait"
          className="mt-12 aspect-[0.72] w-[78%]"
          imageClassName="object-[55%_center]"
        />
        <RevealWords
          text="A little bit of magic, every day."
          className="ml-auto mt-8 max-w-[14rem] font-serif text-2xl italic leading-tight text-stone-700"
        />
        <RevealImage
          src={`${ASSET_PATH}/3.png`}
          alt="Ricky and Felly seated together"
          className="mt-8 ml-auto aspect-[0.8] w-[72%]"
          imageClassName="object-[54%_center]"
        />
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-[#f6f5f0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <RevealFade className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Chapter one / The beginning
          </RevealFade>
          <RevealWords
            as="h2"
            text="Our story is better together."
            className="max-w-md font-serif text-5xl leading-[0.9] text-stone-900 sm:text-7xl"
          />
          <RevealFade className="mt-10 max-w-sm font-sans text-sm leading-7 text-stone-600 sm:text-base">
            Two souls, one shared horizon. With full hearts, we invite you to
            witness the start of our forever.
          </RevealFade>
        </div>
        <div className="relative min-h-[36rem] sm:min-h-[44rem] lg:col-span-7 lg:min-h-[46rem]">
          <RevealImage
            src={`${ASSET_PATH}/2.png`}
            alt="Ricky and Felly in an elegant monochrome portrait"
            className="absolute left-0 top-0 h-[72%] w-[67%]"
            imageClassName="object-[55%_center]"
          />
          <RevealImage
            src={`${ASSET_PATH}/3.png`}
            alt="Ricky and Felly seated together"
            className="absolute bottom-0 right-0 h-[57%] w-[58%] border-[10px] border-[#f6f5f0] sm:border-[14px]"
            imageClassName="object-[54%_center]"
          />
          <RevealWords
            text="A little bit of magic, every day."
            className="absolute right-[4%] top-[6%] max-w-[11rem] font-serif text-xl italic leading-tight text-stone-700 sm:max-w-xs sm:text-2xl"
          />
        </div>
      </div>
    </section>
  );
}
