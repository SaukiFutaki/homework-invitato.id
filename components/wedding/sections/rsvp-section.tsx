"use client";

import Image from "next/image";
import { useKumoToastManager } from "@cloudflare/kumo";
import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { useTRPC } from "@/lib/trpc/client";

type Attendance = "attending" | "declining";
type EventChoice = "ceremony" | "reception" | "both";
type RsvpFormValues = {
  name: string;
  phone: string;
  address: string;
  email: string;
  attendance: Attendance | "";
  event: EventChoice | null;
  guestCount: number;
};
type RsvpValidator = FormValidateOrFn<RsvpFormValues> | undefined;
type RsvpAsyncValidator = FormAsyncValidateOrFn<RsvpFormValues> | undefined;
type RsvpForm = ReactFormExtendedApi<RsvpFormValues, RsvpValidator, RsvpValidator, RsvpAsyncValidator, RsvpValidator, RsvpAsyncValidator, RsvpValidator, RsvpAsyncValidator, RsvpValidator, RsvpAsyncValidator, RsvpAsyncValidator, unknown>;

export function RsvpSection() {
  const trpc = useTRPC();
  const toast = useKumoToastManager();
  const submitRsvp = useMutation({
    ...trpc.rsvp.submit.mutationOptions(),
    onSuccess: () =>
      toast.add({
        title: "RSVP received",
        description: "Thank you. Your confirmation has been saved.",
        variant: "success",
      }),
    onError: () =>
      toast.add({
        title: "RSVP could not be saved",
        description: "Please check your details and try again.",
        variant: "error",
      }),
  });
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
      attendance: "" as Attendance | "",
      event: null as EventChoice | null,
      guestCount: 1,
    },
    onSubmit: async ({ value }) => {
      await submitRsvp.mutateAsync({
        ...value,
        attendance: value.attendance as Attendance,
      });
    },
  });

  return (
    <section className="relative overflow-hidden bg-stone-950 px-5 py-20 text-[#34495a] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <Image src={`${ASSET_PATH}/background.jpg`} alt="Soft white silk texture" fill sizes="100vw" className="object-cover opacity-20 mix-blend-screen" />
      <div className="relative mx-auto max-w-3xl bg-[#e9e5dc] px-6 py-16 sm:px-14 sm:py-20 lg:px-20">
        <span className="absolute left-0 top-14 h-12 w-12 -translate-x-1/2 rounded-r-full bg-[#443a31] sm:h-16 sm:w-16" />
        <span className="absolute right-0 top-14 h-12 w-12 translate-x-1/2 rounded-l-full bg-[#443a31] sm:h-16 sm:w-16" />
        <div className="relative mx-auto max-w-md">
          <RevealWords text="RSVP" className="text-center font-serif text-4xl tracking-wide text-[#665b50] sm:text-5xl" />
          <RevealFade className="mt-7 text-center font-serif text-lg leading-7 text-[#443a31]">We&apos;d love to hear from you!<br />Please fill out the confirmation below.</RevealFade>
          {submitRsvp.isSuccess ? (
            <p className="mt-10 border-y border-[#443a31]/35 py-8 text-center font-serif text-3xl italic">Thank you. We will save you a place.</p>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); void form.handleSubmit(); }} className="mt-10 space-y-6">
              <TextField form={form} name="name" label="Name:" placeholder="Invitato" description="Please confirm one name for your personalized RSVP." />
              <TextField form={form} name="phone" label="Phone Number:" placeholder="+62" />
              <TextField form={form} name="address" label="Address:" placeholder="Your address" />
              <TextField form={form} name="email" label="Email:" placeholder="you@email.com" type="email" />
              <AttendanceField form={form} />
              <form.Subscribe selector={(state) => state.values.attendance}>
                {(attendance) => attendance === "attending" && <AttendingFields form={form} />}
              </form.Subscribe>
              {submitRsvp.isError && <p className="font-sans text-xs text-red-800">Unable to submit your RSVP. Please try again.</p>}
              <button type="submit" disabled={form.state.isSubmitting || submitRsvp.isPending} className="mx-auto mt-3 block min-h-12 bg-[#443a31] px-8 font-serif text-lg text-[#f8f6f1] transition-colors hover:bg-[#30271f] disabled:opacity-60">{submitRsvp.isPending ? "Sending..." : "Submit"}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function TextField({ form, name, label, description, ...props }: { form: RsvpForm; name: "name" | "phone" | "address" | "email"; label: string; description?: string; placeholder: string; type?: string }) {
  return <form.Field name={name} validators={{ onChange: ({ value }) => value.trim().length < 2 ? "This field is required." : undefined }}>
    {(field) => <label className="block"><span className="mb-2 block font-serif text-xl">{label}</span>{description && <p className="mb-2 font-serif text-sm italic text-[#665b50]">{description}</p>}<input required maxLength={240} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} {...props} className="min-h-12 w-full border border-[#9b9185] bg-[#f8f6f1] px-4 font-serif text-lg text-[#443a31] outline-none placeholder:text-[#8d8378] focus:border-[#443a31]" />{field.state.meta.errors[0] && <p className="mt-1 font-sans text-xs text-red-800">{field.state.meta.errors[0]}</p>}</label>}
  </form.Field>;
}

function AttendanceField({ form }: { form: RsvpForm }) {
  return <form.Field name="attendance" validators={{ onChange: ({ value }) => value ? undefined : "Please choose your attendance." }}>
    {(field) => <div><span className="mb-2 block font-serif text-xl">Will you attend the wedding?</span><div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Attendance status">{([["attending", "Gladly Attend"], ["declining", "Unable to Attend"]] as const).map(([value, label]) => <button key={value} type="button" onClick={() => { field.handleChange(value); if (value === "declining") form.setFieldValue("event", null); }} className={`min-h-12 px-3 font-serif text-base transition-colors ${field.state.value === value ? "border-[#443a31] bg-[#443a31] text-[#f8f6f1]" : "border border-[#9b9185] bg-[#f8f6f1] text-[#443a31] hover:bg-white"}`}>{label}</button>)}</div>{field.state.meta.errors[0] && <p className="mt-2 font-sans text-xs text-red-800">{field.state.meta.errors[0]}</p>}</div>}
  </form.Field>;
}

function AttendingFields({ form }: { form: RsvpForm }) {
  return <><form.Field name="event" validators={{ onChange: ({ value }) => value ? undefined : "Please choose an event." }}>{(field) => <div><span className="mb-2 block font-serif text-xl">Which event will you attend?</span><div className="grid gap-2 sm:grid-cols-3">{([["ceremony", "Holy Matrimony"], ["reception", "Reception"], ["both", "Both Events"]] as const).map(([value, label]) => <button key={value} type="button" onClick={() => field.handleChange(value)} className={`min-h-11 border px-2 font-serif text-sm transition-colors ${field.state.value === value ? "border-[#443a31] bg-[#443a31] text-[#f8f6f1]" : "border-[#9b9185] bg-[#f8f6f1] text-[#443a31] hover:bg-white"}`}>{label}</button>)}</div>{field.state.meta.errors[0] && <p className="mt-2 font-sans text-xs text-red-800">{field.state.meta.errors[0]}</p>}</div>}</form.Field><form.Field name="guestCount">{(field) => <label className="block"><span className="mb-2 block font-serif text-xl">Number of Guests:</span><input required type="number" min={1} max={4} value={field.state.value} onChange={(event) => field.handleChange(Number(event.target.value))} className="min-h-12 w-full border border-[#9b9185] bg-[#f8f6f1] px-4 font-serif text-lg text-[#443a31] outline-none focus:border-[#443a31]" /></label>}</form.Field></>;
}
