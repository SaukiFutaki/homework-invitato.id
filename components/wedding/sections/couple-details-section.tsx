import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";

export function CoupleDetailsSection() {
  return (
    <section className="bg-stone-950 px-5 py-24 text-[#f6f5f0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <RevealFade className="mb-12 text-center font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-400 lg:mb-20">
          With the blessing of our families
        </RevealFade>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-0">
          <article className="border-t border-white/30 pt-7 lg:border-r lg:pr-16 lg:pt-10">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
              The groom
            </p>
            <RevealWords
              as="h2"
              text="Ricky"
              className="mt-7 font-serif text-6xl leading-[0.8] sm:text-8xl"
            />
            <RevealFade className="mt-9 max-w-sm font-sans text-sm leading-7 text-stone-300">
              Son of
              <br />
              <span className="font-serif text-2xl text-[#f6f5f0]">
                Mr. [Father&apos;s Name]
              </span>
              <br />
              &amp;{" "}
              <span className="font-serif text-2xl text-[#f6f5f0]">
                Mrs. [Mother&apos;s Name]
              </span>
            </RevealFade>
          </article>
          <article className="border-t border-white/30 pt-7 lg:pl-16 lg:pt-10">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
              The bride
            </p>
            <RevealWords
              as="h2"
              text="Fellycia"
              className="mt-7 font-serif text-6xl leading-[0.8] sm:text-8xl"
            />
            <RevealFade className="mt-9 max-w-sm font-sans text-sm leading-7 text-stone-300">
              Daughter of
              <br />
              <span className="font-serif text-2xl text-[#f6f5f0]">
                Mr. [Father&apos;s Name]
              </span>
              <br />
              &amp;{" "}
              <span className="font-serif text-2xl text-[#f6f5f0]">
                Mrs. [Mother&apos;s Name]
              </span>
            </RevealFade>
          </article>
        </div>
      </div>
    </section>
  );
}
