"use client";

import Image from "next/image";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { FormEvent, useState } from "react";

interface LocalWish {
  id: number;
  message: string;
  name: string;
}

const INITIAL_WISHES: LocalWish[] = [
  {
    id: 1,
    name: "Nadya & Arif",
    message:
      "May your love keep growing into the warmest home to return to.",
  },
  {
    id: 2,
    name: "The Wijaya Family",
    message:
      "Congratulations on this new chapter. May your days be filled with laughter and grace.",
  },
  {
    id: 3,
    name: "Sasha",
    message:
      "So happy for you both. Wishing you a lifetime of beautiful adventures together.",
  },
];

export function WishesSection() {
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
      <Image
        src={`${ASSET_PATH}/background.jpg`}
        alt="Soft silk texture"
        fill
        sizes="100vw"
        className="object-cover opacity-25 mix-blend-multiply"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <RevealFade className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">
            Wishes for the couple
          </RevealFade>
          <RevealWords
            as="h2"
            text={"Leave a little\nlove behind."}
            className="font-serif text-5xl leading-[0.88] sm:text-7xl"
          />
          <RevealFade className="mt-8 max-w-sm font-sans text-sm leading-7 text-stone-600">
            Your words will become part of our favorite keepsake.
          </RevealFade>
        </div>
        <WishForm onSubmit={onSubmit} sent={sent} />
      </div>
      <Guestbook wishes={wishes} />
    </section>
  );
}

function WishForm({
  onSubmit,
  sent,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  sent: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="lg:col-span-5 lg:col-start-8">
      <div className="space-y-8">
        <WishInput label="Name" name="wish-name" placeholder="Your name" />
        <label className="block">
          <span className="mb-3 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Message
          </span>
          <textarea
            required
            maxLength={500}
            name="wish-message"
            rows={4}
            placeholder="Write your wishes for the couple"
            className="w-full resize-none border-b border-stone-500 bg-transparent pb-3 font-serif text-2xl leading-tight outline-none placeholder:text-stone-400 focus:border-stone-950"
          />
        </label>
        <button
          type="submit"
          className="border border-stone-900 px-7 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-stone-900 hover:text-[#f6f5f0]"
        >
          Send wishes
        </button>
        {sent && (
          <p className="font-serif text-lg italic text-stone-600">
            Thank you for your beautiful words.
          </p>
        )}
      </div>
    </form>
  );
}

function WishInput({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
        {label}
      </span>
      <input
        required
        maxLength={80}
        name={name}
        placeholder={placeholder}
        className="w-full border-b border-stone-500 bg-transparent pb-3 font-serif text-2xl outline-none placeholder:text-stone-400 focus:border-stone-950"
      />
    </label>
  );
}

function Guestbook({ wishes }: { wishes: LocalWish[] }) {
  return (
    <div className="relative mx-auto mt-24 max-w-5xl border-y border-stone-400 py-10 sm:mt-32 sm:py-14">
      <p className="mb-10 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
        Guestbook / Kind words
      </p>
      <div className="grid gap-x-16 md:grid-cols-2">
        {wishes.map((wish) => (
          <article key={wish.id} className="border-t border-stone-400 py-7">
            <RevealWords
              text={wish.message}
              className="font-serif text-2xl leading-snug"
            />
            <p className="mt-5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
              {wish.name}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
