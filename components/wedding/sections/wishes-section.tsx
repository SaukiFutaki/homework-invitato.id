"use client";

import Image from "next/image";
import { useKumoToastManager } from "@cloudflare/kumo";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { useTRPC } from "@/lib/trpc/client";

type Wish = { id: string | number; message: string; name: string };
const INITIAL_WISHES: Wish[] = [
  { id: 1, name: "Nadya & Arif", message: "May your love keep growing into the warmest home to return to." },
  { id: 2, name: "The Wijaya Family", message: "Congratulations on this new chapter. May your days be filled with laughter and grace." },
  { id: 3, name: "Sasha", message: "So happy for you both. Wishing you a lifetime of beautiful adventures together." },
];

export function WishesSection() {
  const trpc = useTRPC();
  const toast = useKumoToastManager();
  const wishesQuery = useQuery(trpc.wishes.list.queryOptions());
  const submitWish = useMutation({
    ...trpc.wishes.submit.mutationOptions(),
    onSuccess: () => {
      void wishesQuery.refetch();
      toast.add({
        title: "Wish sent",
        description: "Your message is now part of the guestbook.",
        variant: "success",
      });
    },
    onError: () =>
      toast.add({
        title: "Wish could not be sent",
        description: "Please try again in a moment.",
        variant: "error",
      }),
  });
  const form = useForm({
    defaultValues: { name: "", message: "" },
    onSubmit: async ({ value }) => {
      await submitWish.mutateAsync(value);
      form.reset();
    },
  });
  const wishes = wishesQuery.data?.length ? wishesQuery.data : INITIAL_WISHES;

  return (
    <section className="relative overflow-hidden bg-[#f6f5f0] px-5 py-24 text-stone-900 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <Image src={`${ASSET_PATH}/background.jpg`} alt="Soft silk texture" fill sizes="100vw" className="object-cover opacity-25 mix-blend-multiply" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <RevealFade className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-stone-500">Wishes for the couple</RevealFade>
          <RevealWords as="h2" text={"Leave a little\nlove behind."} className="font-serif text-5xl leading-[0.88] sm:text-7xl" />
          <RevealFade className="mt-8 max-w-sm font-sans text-sm leading-7 text-stone-600">Your words will become part of our favorite keepsake.</RevealFade>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); void form.handleSubmit(); }} className="lg:col-span-5 lg:col-start-8">
          <div className="space-y-8">
            <form.Field name="name" validators={{ onChange: ({ value }) => value.trim().length < 2 ? "Please enter your name." : undefined }}>
              {(field) => <label className="block"><span className="mb-3 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">Name</span><input required maxLength={80} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} placeholder="Your name" className="w-full border-b border-stone-500 bg-transparent pb-3 font-serif text-2xl outline-none placeholder:text-stone-400 focus:border-stone-950" />{field.state.meta.errors[0] && <p className="mt-2 font-sans text-xs text-red-800">{field.state.meta.errors[0]}</p>}</label>}
            </form.Field>
            <form.Field name="message" validators={{ onChange: ({ value }) => value.trim().length < 2 ? "Please write a message." : undefined }}>
              {(field) => <label className="block"><span className="mb-3 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">Message</span><textarea required maxLength={500} rows={4} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} placeholder="Write your wishes for the couple" className="w-full resize-none border-b border-stone-500 bg-transparent pb-3 font-serif text-2xl leading-tight outline-none placeholder:text-stone-400 focus:border-stone-950" />{field.state.meta.errors[0] && <p className="mt-2 font-sans text-xs text-red-800">{field.state.meta.errors[0]}</p>}</label>}
            </form.Field>
            <button type="submit" disabled={submitWish.isPending} className="border border-stone-900 px-7 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-stone-900 hover:text-[#f6f5f0] disabled:opacity-50">{submitWish.isPending ? "Sending..." : "Send wishes"}</button>
            {submitWish.isSuccess && <p className="font-serif text-lg italic text-stone-600">Thank you for your beautiful words.</p>}
            {submitWish.isError && <p className="font-sans text-xs text-red-800">Unable to send your wishes. Please try again.</p>}
          </div>
        </form>
      </div>
      <Guestbook wishes={wishes} />
    </section>
  );
}

function Guestbook({ wishes }: { wishes: Wish[] }) {
  return <div className="relative mx-auto mt-24 max-w-5xl border-y border-stone-400 py-10 sm:mt-32 sm:py-14"><p className="mb-10 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">Guestbook / Kind words</p><div className="grid gap-x-16 md:grid-cols-2">{wishes.map((wish) => <article key={wish.id} className="border-t border-stone-400 py-7"><RevealWords text={wish.message} className="font-serif text-2xl leading-snug" /><p className="mt-5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">{wish.name}</p></article>)}</div></div>;
}
