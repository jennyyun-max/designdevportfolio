import type { Metadata } from "next";
import PolaroidCamera from "@/components/playground/PolaroidCamera";
import StickerBoard from "@/components/playground/StickerBoard";
import DoodlePad from "@/components/playground/DoodlePad";
import InteractivePotato from "@/components/ui/InteractivePotato";
import { Camera, Pencil, Star } from "@/components/doodles/Doodles";

export const metadata: Metadata = {
  title: "Playground",
  description: "A few toys from Chloe’s world: an instant camera full of real photos, a sticker scrapbook page and a doodle pad.",
};

function Room({ n, title, note, icon, children, tone }: { n: string; title: React.ReactNode; note: string; icon: React.ReactNode; children: React.ReactNode; tone?: string }) {
  return (
    <section className={`py-16 sm:py-20 ${tone ?? ""}`}>
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end gap-x-6 gap-y-2">
          <span className="grid h-16 w-16 place-items-center rounded-[16px] bg-paper shadow-[0_2px_0_rgba(58,38,32,0.12)]">{icon}</span>
          <div>
            <p className="hand text-[1.5rem] leading-none text-rose-deep">toy no. {n}</p>
            <h2 className="display mt-1 text-[clamp(2.2rem,4.6vw,3.6rem)]">{title}</h2>
          </div>
          <p className="max-w-[26rem] pb-1 text-espresso-soft sm:ml-auto">{note}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <header className="relative mx-auto max-w-[1180px] px-5 pt-8 sm:px-8 sm:pt-14">
        <p className="eyebrow flex items-center gap-2">
          <Star className="h-6 w-6" /> room 04 · playground
        </p>
        <h1 className="display mt-4 text-[clamp(3rem,9vw,6.6rem)]">
          come <em>play</em>
        </h1>
        <p className="mt-5 max-w-[36rem] text-[1.1rem] leading-relaxed text-espresso-soft">
          A few toys I made for you. Nothing here is graded — take a photo, make a mess of stickers, doodle something silly. (There may also be a potato hiding somewhere.)
        </p>
      </header>

      <Room n="1" title={<>the instant <em>camera</em></>} note="Every print is a real photo from my camera roll — and each comes with a tiny true story." icon={<Camera className="h-11 w-11" />}>
        <PolaroidCamera />
      </Room>

      <Room n="2" title={<>a scrapbook <em>page</em></>} note="Decorate it however you like. It stays in your browser, so it’ll be here when you come back." icon={<Star className="h-11 w-11" />} tone="bg-pink/50">
        <StickerBoard />
      </Room>

      <Room n="3" title={<>the doodle <em>pad</em></>} note="Grab a pencil. If you make something you love, save it — or leave it in my guestbook." icon={<Pencil className="h-11 w-11" />}>
        <div className="mx-auto max-w-[52rem]">
          <DoodlePad label="Doodle pad drawing" allowSave />
        </div>
        {/* the potato hides at the bottom of the playground */}
        <div className="mt-16 flex justify-end">
          <InteractivePotato className="w-14" bubbleClassName="right-0" />
        </div>
      </Room>
    </>
  );
}
