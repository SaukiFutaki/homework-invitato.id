"use client";

import Image from "next/image";
import { RevealFade, RevealWords } from "@/components/wedding/reveal-text";
import { WEDDING_ASSET_PATH as ASSET_PATH } from "@/lib/constants";
import { FormEvent, useState } from "react";
type AttendanceStatus = "attending" | "declining" | null;
type EventChoice = "ceremony" | "reception" | "both" | null;

export function RsvpSection() {
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceStatus>(null);
  const [eventChoice, setEventChoice] = useState<EventChoice>(null);
  const [formError, setFormError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!attendance || (attendance === "attending" && !eventChoice)) {
      setFormError("Please choose your attendance and event.");
      return;
    }
    setFormError("");
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-stone-950 px-5 py-20 text-[#34495a] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <Image
        src={`${ASSET_PATH}/background.jpg`}
        alt="Soft white silk texture"
        fill
        sizes="100vw"
        className="object-cover opacity-20 mix-blend-screen"
      />
      <div className="relative mx-auto max-w-3xl bg-[#e9e5dc] px-6 py-16 sm:px-14 sm:py-20 lg:px-20">
        <span className="absolute left-0 top-14 h-12 w-12 -translate-x-1/2 rounded-r-full bg-[#443a31] sm:h-16 sm:w-16" />
        <span className="absolute right-0 top-14 h-12 w-12 translate-x-1/2 rounded-l-full bg-[#443a31] sm:h-16 sm:w-16" />
        <div className="relative mx-auto max-w-md">
          <RevealWords
            text="RSVP"
            className="text-center font-serif text-4xl tracking-wide text-[#665b50] sm:text-5xl"
          />
          <RevealFade className="mt-7 text-center font-serif text-lg leading-7 text-[#443a31]">
            We&apos;d love to hear from you!
            <br />
            Please fill out the confirmation below.
          </RevealFade>
          <form onSubmit={onSubmit} className="mt-10">
            {submitted ? (
              <p className="border-y border-[#443a31]/35 py-8 text-center font-serif text-3xl italic">
                Thank you. We will save you a place.
              </p>
            ) : (
              <RsvpFields
                attendance={attendance}
                eventChoice={eventChoice}
                formError={formError}
                setAttendance={setAttendance}
                setEventChoice={setEventChoice}
                setFormError={setFormError}
              />
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
function RsvpFields({
  attendance,
  eventChoice,
  formError,
  setAttendance,
  setEventChoice,
  setFormError,
}: {
  attendance: AttendanceStatus;
  eventChoice: EventChoice;
  formError: string;
  setAttendance: (value: AttendanceStatus) => void;
  setEventChoice: (value: EventChoice) => void;
  setFormError: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <TextField label="Name:" name="name" placeholder="Invitato" />
      <TextField label="Phone Number:" name="phone" placeholder="+62" type="tel" />
      <TextField label="Address:" name="address" placeholder="Your address" />
      <TextField label="Email:" name="email" placeholder="you@email.com" type="email" />
      <div>
        <span className="mb-2 block font-serif text-xl">
          Will you attend the wedding?
        </span>
        <input type="hidden" name="attendance" value={attendance ?? ""} />
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Attendance status">
          <ChoiceButton active={attendance === "attending"} onClick={() => { setAttendance("attending"); setFormError(""); }}>
            Gladly Attend
          </ChoiceButton>
          <ChoiceButton active={attendance === "declining"} onClick={() => { setAttendance("declining"); setEventChoice(null); setFormError(""); }}>
            Unable to Attend
          </ChoiceButton>
        </div>
      </div>
      {attendance === "attending" && (
        <>
          <EventChoiceField
            eventChoice={eventChoice}
            formError={formError}
            setEventChoice={setEventChoice}
            setFormError={setFormError}
          />
          <TextField label="Number of Guests:" name="guests" type="number" min="1" max="4" defaultValue="1" />
        </>
      )}
      <button
        type="submit"
        className="mx-auto mt-3 block min-h-12 bg-[#443a31] px-8 font-serif text-lg text-[#f8f6f1] transition-colors hover:bg-[#30271f]"
      >
        Submit
      </button>
    </div>
  );
}
function EventChoiceField({
  eventChoice,
  formError,
  setEventChoice,
  setFormError,
}: {
  eventChoice: EventChoice;
  formError: string;
  setEventChoice: (value: EventChoice) => void;
  setFormError: (value: string) => void;
}) {
  const choices = [["ceremony", "Holy Matrimony"], ["reception", "Reception"], ["both", "Both Events"]] as const;

  return (
    <div>
      <span className="mb-2 block font-serif text-xl">
        Which event will you attend?
      </span>
      <input type="hidden" name="event" value={eventChoice ?? ""} />
      <div className="grid gap-2 sm:grid-cols-3">
        {choices.map(([value, label]) => (
          <ChoiceButton key={value} active={eventChoice === value} onClick={() => { setEventChoice(value); setFormError(""); }} compact>
            {label}
          </ChoiceButton>
        ))}
      </div>
      {formError && <p className="mt-3 font-sans text-xs text-red-800">{formError}</p>}
    </div>
  );
}

function TextField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block font-serif text-xl">{label}</span>
      {props.name === "name" && (
        <p className="mb-2 font-serif text-sm italic text-[#665b50]">
          Please confirm one name for your personalized RSVP.
        </p>
      )}
      <input
        required
        maxLength={80}
        className="min-h-12 w-full border border-[#9b9185] bg-[#f8f6f1] px-4 font-serif text-lg text-[#443a31] outline-none placeholder:text-[#8d8378] focus:border-[#443a31]"
        {...props}
      />
    </label>
  );
}

function ChoiceButton({
  active,
  children,
  compact,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  compact?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${compact ? "min-h-11 border px-2 text-sm" : "min-h-12 px-3 text-base"} font-serif transition-colors ${active ? "border-[#443a31] bg-[#443a31] text-[#f8f6f1]" : "border-[#9b9185] bg-[#f8f6f1] text-[#443a31] hover:bg-white"}`}
    >
      {children}
    </button>
  );
}
