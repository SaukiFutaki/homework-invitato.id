import { Hero } from "@/components/wedding/hero";
import { BackgroundMusic } from "@/components/wedding/background-music";
import { InvitationCover } from "@/components/wedding/invitation-cover";
import { InvitationContent } from "@/components/wedding/invitation-content";
import { SmoothScroll } from "@/components/wedding/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <BackgroundMusic />
      <InvitationCover />
      <main>
        <Hero />
        <InvitationContent />
      </main>
    </SmoothScroll>
  );
}
