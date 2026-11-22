import type { Metadata } from "next";
import Guestbook from "@/components/guestbook/Guestbook";
import { Envelope, Heart } from "@/components/doodles/Doodles";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a little note in Chloe’s scrapbook — a name, a message, a stamp and a tiny doodle.",
};

export default function GuestbookPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pb-24 pt-8 sm:px-8 sm:pt-14">
      <header className="relative">
        <Heart className="float absolute right-2 top-0 hidden w-12 sm:block" />
        <p className="eyebrow flex items-center gap-2">
          <Envelope className="h-6 w-6" /> room 05 · guestbook
        </p>
        <h1 className="display mt-4 text-[clamp(2.8rem,8vw,6rem)]">
          leave a little note in my <em>scrapbook</em> <span className="text-rose">♡</span>
        </h1>
        <p className="mt-5 max-w-[36rem] text-[1.1rem] leading-relaxed text-espresso-soft">
          Thanks for wandering around my world. Sign your name, pick a stamp, and doodle something if you feel like it.
        </p>
      </header>
      <div className="mt-12">
        <Guestbook />
      </div>
    </div>
  );
}
