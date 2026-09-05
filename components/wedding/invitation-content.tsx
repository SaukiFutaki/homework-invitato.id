import { CountdownSection } from "@/components/wedding/sections/countdown-section";
import { CoupleDetailsSection } from "@/components/wedding/sections/couple-details-section";
import { CoupleIntroSection } from "@/components/wedding/sections/couple-intro-section";
import { EventDetailsSection } from "@/components/wedding/sections/event-details-section";
import { GallerySection } from "@/components/wedding/sections/gallery-section";
import { RsvpSection } from "@/components/wedding/sections/rsvp-section";
import { ThankYouSection } from "@/components/wedding/sections/thank-you-section";
import { WishesSection } from "@/components/wedding/sections/wishes-section";

export function InvitationContent() {
  return (
    <>
      <CoupleIntroSection />
      <CoupleDetailsSection />
      <GallerySection />
      <CountdownSection />
      <EventDetailsSection />
      <RsvpSection />
      <WishesSection />
      <ThankYouSection />
    </>
  );
}
