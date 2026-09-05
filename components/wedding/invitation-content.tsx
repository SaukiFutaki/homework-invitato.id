"use client";

import Image from "next/image";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { motion, type MotionValue, useInView, useScroll, useTransform } from "motion/react";
import { FormEvent, useEffect, useRef, useState } from "react";

const ASSET_PATH = "/hometask-assets-rickyfelly";
const WEDDING_TIME = new Date("2027-08-16T15:30:00+07:00").getTime();

interface RevealImageProps {
  alt: string;
  className?: string;
  imageClassName?: string;
  src: string;
}

function RevealImage({ alt, className = "", imageClassName = "", src }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.22 }}
        animate={isInView ? { scale: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className={`object-cover ${imageClassName}`} />
      </motion.div>
    </motion.div>
  );
}

function CoupleIntro() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="bg-[#f6f5f0] px-5 py-20 text-stone-900">
        <p className="mb-6 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Chapter one / The beginning</p>
        <h2 className="font-serif text-5xl leading-[0.9]">Our story is better together.</h2>
        <p className="mt-7 max-w-sm font-sans text-sm leading-7 text-stone-600">Two souls, one shared horizon. With full hearts, we invite you to witness the start of our forever.</p>
        <RevealImage src={`${ASSET_PATH}/2.png`} alt="Ricky and Felly in an elegant monochrome portrait" className="mt-12 aspect-[0.72] w-[78%]" imageClassName="object-[55%_center]" />
        <p className="ml-auto mt-8 max-w-[14rem] font-serif text-2xl italic leading-tight text-stone-700">A little bit of magic, every day.</p>
        <RevealImage src={`${ASSET_PATH}/3.png`} alt="Ricky and Felly seated together" className="mt-8 ml-auto aspect-[0.8] w-[72%]" imageClassName="object-[54%_center]" />
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-[#f6f5f0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <p className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Chapter one / The beginning</p>
          <h2 className="max-w-md font-serif text-5xl leading-[0.9] text-stone-900 sm:text-7xl">
            Our story is better together.
          </h2>
          <p className="mt-10 max-w-sm font-sans text-sm leading-7 text-stone-600 sm:text-base">
            Two souls, one shared horizon. With full hearts, we invite you to witness the start of our forever.
          </p>
        </div>
        <div className="relative min-h-[36rem] sm:min-h-[44rem] lg:col-span-7 lg:min-h-[46rem]">
          <RevealImage src={`${ASSET_PATH}/2.png`} alt="Ricky and Felly in an elegant monochrome portrait" className="absolute left-0 top-0 h-[72%] w-[67%]" imageClassName="object-[55%_center]" />
          <RevealImage src={`${ASSET_PATH}/3.png`} alt="Ricky and Felly seated together" className="absolute bottom-0 right-0 h-[57%] w-[58%] border-[10px] border-[#f6f5f0] sm:border-[14px]" imageClassName="object-[54%_center]" />
          <p className="absolute right-[4%] top-[6%] max-w-[11rem] font-serif text-xl italic leading-tight text-stone-700 sm:max-w-xs sm:text-2xl">
            A little bit of magic, every day.
          </p>
        </div>
      </div>
    </section>
  );
}

function CoupleDetails() {
  return (
    <section className="bg-stone-950 px-5 py-24 text-[#f6f5f0] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="mb-12 text-center font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-400 lg:mb-20">With the blessing of our families</p>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-0">
          <article className="border-t border-white/30 pt-7 lg:border-r lg:pr-16 lg:pt-10">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">The groom</p>
            <h2 className="mt-7 font-serif text-6xl leading-[0.8] sm:text-8xl">Ricky</h2>
            <p className="mt-9 max-w-sm font-sans text-sm leading-7 text-stone-300">Putra dari<br /><span className="font-serif text-2xl text-[#f6f5f0]">Bapak [Nama Ayah]</span><br />&amp; <span className="font-serif text-2xl text-[#f6f5f0]">Ibu [Nama Ibu]</span></p>
          </article>
          <article className="border-t border-white/30 pt-7 lg:pl-16 lg:pt-10">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">The bride</p>
            <h2 className="mt-7 font-serif text-6xl leading-[0.8] sm:text-8xl">Felly</h2>
            <p className="mt-9 max-w-sm font-sans text-sm leading-7 text-stone-300">Putri dari<br /><span className="font-serif text-2xl text-[#f6f5f0]">Bapak [Nama Ayah]</span><br />&amp; <span className="font-serif text-2xl text-[#f6f5f0]">Ibu [Nama Ibu]</span></p>
          </article>
        </div>
      </div>
    </section>
  );
}

interface StoryFrameProps {
  alt: string;
  className: string;
  end: number;
  progress: MotionValue<number>;
  src: string;
  start: number;
}

function StoryFrame({ alt, className, end, progress, src, start }: StoryFrameProps) {
  const fadeInEnd = start === 0 ? 0.01 : start + 0.08;
  const opacity = useTransform(progress, [start, fadeInEnd, end - 0.08, end], [start === 0 ? 1 : 0, 1, 1, 0]);
  const scale = useTransform(progress, [start, fadeInEnd, end], [0.92, 1, 1.05]);
  const y = useTransform(progress, [start, end], [28, -20]);

  return <motion.div className={`absolute overflow-hidden ${className}`} style={{ opacity, scale, y }}><Image src={`${ASSET_PATH}/${src}`} alt={alt} fill sizes="(min-width: 1024px) 44vw, 80vw" className="object-cover" /></motion.div>;
}

function Gallery() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const ampersandY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  if (isMobile) return <MobileGallery />;

  return (
    <section ref={sectionRef} className="h-[300vh] bg-[#f0efea] text-stone-950">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <p className="absolute left-5 top-6 z-10 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500 sm:left-8 sm:top-8 lg:left-12 lg:top-10">Chapter two / Our story</p>
        <p className="absolute left-1/2 top-6 z-10 -translate-x-1/2 font-sans text-sm tracking-wide sm:top-8 lg:top-10">RICKY + FELLY</p>

        <motion.p className="absolute left-5 top-1/2 z-20 -translate-y-1/2 font-serif text-4xl sm:left-8 sm:text-6xl lg:left-12 lg:text-7xl" style={{ y: leftY }}>Ricky</motion.p>
        <motion.p className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 font-serif text-4xl italic sm:text-6xl lg:text-7xl" style={{ y: ampersandY }}>&amp;</motion.p>
        <motion.p className="absolute right-5 top-1/2 z-20 -translate-y-1/2 font-serif text-4xl sm:right-8 sm:text-6xl lg:right-12 lg:text-7xl" style={{ y: rightY }}>Felly</motion.p>

        <StoryFrame src="5.png" alt="Ricky and Felly by a sunlit window" start={0} end={0.38} progress={scrollYProgress} className="left-[18%] top-[21%] h-[58%] w-[43%] sm:left-[25%] sm:w-[38%] lg:left-[18%] lg:top-[23%] lg:h-[63%] lg:w-[32%]" />
        <StoryFrame src="4.png" alt="Felly posed beside a horse" start={0} end={0.38} progress={scrollYProgress} className="right-[10%] top-[11%] h-[25%] w-[18%] lg:right-[12%] lg:h-[31%] lg:w-[14%]" />
        <StoryFrame src="7.png" alt="Ricky and Felly sharing a quiet moment" start={0.3} end={0.7} progress={scrollYProgress} className="left-[15%] top-[28%] h-[50%] w-[62%] sm:left-[23%] sm:w-[52%] lg:left-[28%] lg:top-[20%] lg:h-[65%] lg:w-[43%]" />
        <StoryFrame src="8.png" alt="Felly in warm window light" start={0.3} end={0.7} progress={scrollYProgress} className="right-[8%] top-[12%] h-[26%] w-[20%] lg:right-[10%] lg:top-[13%] lg:h-[30%] lg:w-[18%]" />
        <StoryFrame src="9.png" alt="Ricky and Felly embracing" start={0.62} end={1} progress={scrollYProgress} className="left-[15%] top-[28%] h-[52%] w-[65%] sm:left-[21%] sm:w-[55%] lg:left-[23%] lg:top-[22%] lg:h-[62%] lg:w-[48%]" />
        <StoryFrame src="6.png" alt="Ricky and Felly together by a window" start={0.62} end={1} progress={scrollYProgress} className="right-[8%] top-[12%] h-[26%] w-[20%] lg:right-[9%] lg:top-[10%] lg:h-[31%] lg:w-[18%]" />

        <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-serif text-lg italic text-stone-600 sm:bottom-8">Scroll through our favorite frames</p>
      </div>
    </section>
  );
}

function MobileGallery() {
  const images = [
    { src: "5.png", alt: "Ricky and Felly by a sunlit window", className: "aspect-[0.82]" },
    { src: "4.png", alt: "Felly posed beside a horse", className: "aspect-[0.7]" },
    { src: "7.png", alt: "Ricky and Felly sharing a quiet moment", className: "aspect-[1.1]" },
    { src: "8.png", alt: "Felly in warm window light", className: "aspect-[1.1]" },
    { src: "9.png", alt: "Ricky and Felly embracing", className: "aspect-[1.1]" },
    { src: "6.png", alt: "Ricky and Felly together by a window", className: "aspect-[1.1]" },
  ];

  return (
    <section className="overflow-hidden bg-[#f0efea] px-5 py-20 text-stone-950">
      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">Chapter two / Our story</p>
      <h2 className="mt-5 font-serif text-5xl leading-[0.85]">Ricky <span className="italic">&amp;</span> Felly</h2>
      <p className="mt-5 max-w-xs font-sans text-sm leading-7 text-stone-600">A small collection of the moments that brought us here.</p>
      <div className="mt-12 space-y-8">
        {images.map((image, index) => (
          <motion.figure key={image.src} className={`${image.className} relative overflow-hidden ${index % 2 === 1 ? "ml-auto w-[72%]" : "w-[88%]"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75 }}>
            <Image src={`${ASSET_PATH}/${image.src}`} alt={image.alt} fill sizes="90vw" className="object-cover" />
          </motion.figure>
        ))}
      </div>
      <p className="mt-10 text-center font-serif text-2xl italic text-stone-600">A lifetime, in every frame.</p>
    </section>
  );
}

function Countdown() {
  const getRemainingTime = () => {
    const difference = Math.max(WEDDING_TIME - Date.now(), 0);
    return {
      days: Math.floor(difference / 86_400_000),
      hours: Math.floor((difference / 3_600_000) % 24),
      minutes: Math.floor((difference / 60_000) % 60),
      seconds: Math.floor((difference / 1_000) % 60),
    };
  };
  const [time, setTime] = useState(getRemainingTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getRemainingTime()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-[#e9e4da] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <Image src={`${ASSET_PATH}/background.jpg`} alt="Soft silk texture" fill sizes="100vw" className="object-cover opacity-30 mix-blend-multiply" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-7 text-center font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Until we say I do</p>
        <h2 className="text-center font-serif text-5xl leading-[0.88] text-stone-900 sm:text-7xl lg:text-8xl">The countdown<br /><span className="italic">to forever</span></h2>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-4 border-y border-stone-500 sm:mt-20">
          {parts.map((part, index) => (
            <div key={part.label} className={`py-7 text-center sm:py-10 ${index > 0 ? "border-l border-stone-500" : ""}`}>
              <p className="font-serif text-5xl leading-none text-stone-900 sm:text-7xl lg:text-8xl">{String(part.value).padStart(2, "0")}</p>
              <p className="mt-3 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-stone-500 sm:text-[10px]">{part.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-serif text-lg italic text-stone-700">16 August 2027, Jakarta</p>
      </div>
    </section>
  );
}

function EventDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "7%"]);

  return (
    <section ref={sectionRef} className="bg-[#ebe8df] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:items-center">
          <div className="relative aspect-[0.81] w-full overflow-hidden bg-stone-800 lg:max-h-[78vh]">
            <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: imageY }}>
              <Image src={`${ASSET_PATH}/10.png`} alt="Ricky and Felly by an open window" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col justify-center lg:py-32">
          <p className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Chapter three / Gather with us</p>
          <h2 className="font-serif text-5xl leading-[0.9] text-stone-900 sm:text-7xl">When &amp;<br />where</h2>
          <div className="mt-16 divide-y divide-stone-400 border-y border-stone-400">
            <div className="grid gap-2 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8"><p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-500">Date</p><p className="font-serif text-2xl text-stone-900">Monday, 16 August 2027</p></div>
            <div className="grid gap-2 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8"><p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-500">Ceremony</p><div><p className="font-serif text-2xl text-stone-900">15.30 WIB</p><p className="mt-1 font-sans text-sm leading-6 text-stone-600">The Glass House<br />Jakarta Selatan</p></div></div>
            <div className="grid gap-2 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8"><p className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-500">Reception</p><div><p className="font-serif text-2xl text-stone-900">18.30 WIB</p><p className="mt-1 font-sans text-sm leading-6 text-stone-600">Dinner and dancing to follow</p></div></div>
          </div>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="mt-9 w-fit border-b border-stone-900 pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-stone-900 transition-opacity hover:opacity-55">Open map</a>
        </div>
      </div>
    </section>
  );
}

function Rsvp() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-stone-950 px-5 py-24 text-[#f8f7f2] sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <Image src={`${ASSET_PATH}/background.jpg`} alt="Soft white silk texture" fill sizes="100vw" className="object-cover opacity-20 mix-blend-screen" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7"><p className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-400">RSVP</p><h2 className="font-serif text-6xl leading-[0.84] sm:text-8xl lg:text-9xl">Will you<br />join us?</h2><p className="mt-10 max-w-sm font-sans text-sm leading-7 text-stone-300">Please let us know by 20 July 2027. We cannot wait to celebrate with you.</p></div>
        <form onSubmit={onSubmit} className="lg:col-span-5">
          {submitted ? <p className="border-y border-white/30 py-8 font-serif text-3xl italic">Thank you. We will save you a place.</p> : <div className="space-y-8"><label className="block"><span className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400">Nama tamu</span><input required maxLength={80} name="name" className="w-full border-b border-white/50 bg-transparent pb-3 font-serif text-2xl outline-none transition-colors placeholder:text-stone-500 focus:border-white" placeholder="Nama lengkap" /></label><label className="block"><span className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400">Status kehadiran</span><select required name="attendance" defaultValue="" className="w-full border-b border-white/50 bg-stone-950 pb-3 font-serif text-2xl outline-none focus:border-white"><option value="" disabled>Pilih kehadiran</option><option value="attending">Hadir</option><option value="declining">Tidak hadir</option></select></label><label className="block"><span className="mb-3 block font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400">Jumlah orang</span><input required min="1" max="4" defaultValue="1" name="guests" type="number" className="w-full border-b border-white/50 bg-transparent pb-3 font-serif text-2xl outline-none focus:border-white" /></label><button type="submit" className="mt-3 border border-white px-7 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-stone-950">Kirim RSVP</button></div>}
        </form>
      </div>
      <p className="relative mt-28 text-center font-serif text-2xl italic text-stone-300 sm:mt-36">Ricky &amp; Felly</p>
    </section>
  );
}

interface LocalWish {
  id: number;
  message: string;
  name: string;
}

const INITIAL_WISHES: LocalWish[] = [
  { id: 1, name: "Nadya & Arif", message: "Semoga cinta kalian selalu bertumbuh, menjadi rumah paling hangat untuk pulang." },
  { id: 2, name: "Keluarga Wijaya", message: "Selamat memulai babak baru. Semoga hari-hari kalian dipenuhi tawa dan keberkahan." },
  { id: 3, name: "Sasha", message: "So happy for you both. Wishing you a lifetime of beautiful adventures together." },
];

function Wishes() {
  const [wishes, setWishes] = useState<LocalWish[]>(INITIAL_WISHES);
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("wish-name") ?? "").trim();
    const message = String(formData.get("wish-message") ?? "").trim();
    if (!name || !message) return;
    setWishes((current) => [{ id: Date.now(), name, message }, ...current]);
    setSent(true);
    form.reset();
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f5f0] px-5 py-24 text-stone-900 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <Image src={`${ASSET_PATH}/background.jpg`} alt="Soft silk texture" fill sizes="100vw" className="object-cover opacity-25 mix-blend-multiply" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5"><p className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Wishes for the couple</p><h2 className="font-serif text-5xl leading-[0.88] sm:text-7xl">Leave a little<br /><span className="italic">love behind.</span></h2><p className="mt-8 max-w-sm font-sans text-sm leading-7 text-stone-600">Your words will become part of our favorite keepsake.</p></div>
        <form onSubmit={onSubmit} className="lg:col-span-5 lg:col-start-8"><div className="space-y-8"><label className="block"><span className="mb-3 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">Nama</span><input required maxLength={80} name="wish-name" placeholder="Nama kamu" className="w-full border-b border-stone-500 bg-transparent pb-3 font-serif text-2xl outline-none placeholder:text-stone-400 focus:border-stone-950" /></label><label className="block"><span className="mb-3 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">Ucapan</span><textarea required maxLength={500} name="wish-message" rows={4} placeholder="Tulis doa dan ucapanmu" className="w-full resize-none border-b border-stone-500 bg-transparent pb-3 font-serif text-2xl leading-tight outline-none placeholder:text-stone-400 focus:border-stone-950" /></label><button type="submit" className="border border-stone-900 px-7 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-stone-900 hover:text-[#f6f5f0]">Kirim ucapan</button>{sent && <p className="font-serif text-lg italic text-stone-600">Terima kasih atas ucapan manisnya.</p>}</div></form>
      </div>
      <Guestbook wishes={wishes} />
    </section>
  );
}

function Guestbook({ wishes }: { wishes: LocalWish[] }) {
  return (
    <div className="relative mx-auto mt-24 max-w-5xl border-y border-stone-400 py-10 sm:mt-32 sm:py-14">
      <p className="mb-10 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">Guestbook / Kind words</p>
      <div className="grid gap-x-16 md:grid-cols-2">
        {wishes.map((wish) => <article key={wish.id} className="border-t border-stone-400 py-7"><p className="font-serif text-2xl leading-snug">{wish.message}</p><p className="mt-5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">{wish.name}</p></article>)}
      </div>
    </div>
  );
}

function ThankYou() {
  return (
    <section className="relative isolate flex min-h-[85dvh] items-end overflow-hidden bg-stone-950 px-5 py-10 text-[#f8f7f2] sm:px-8 sm:py-12 lg:min-h-[100dvh] lg:px-12">
      <Image src={`${ASSET_PATH}/5.png`} alt="Ricky and Felly sharing a quiet moment" fill sizes="100vw" className="-z-10 object-cover object-center opacity-75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      <div className="w-full border-t border-white/50 pt-7 sm:pt-9">
        <p className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.24em]">With love and gratitude</p>
        <h2 className="max-w-4xl font-serif text-6xl leading-[0.8] sm:text-8xl lg:text-9xl">Terima<br /><span className="italic">kasih.</span></h2>
        <div className="mt-12 flex items-end justify-between font-sans text-[10px] font-medium uppercase tracking-[0.2em]"><span>Ricky &amp; Felly</span><span>16.08.27</span></div>
      </div>
    </section>
  );
}

export function InvitationContent() {
  return <><CoupleIntro /><CoupleDetails /><Gallery /><Countdown /><EventDetails /><Rsvp /><Wishes /><ThankYou /></>;
}
