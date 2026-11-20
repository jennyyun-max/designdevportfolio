import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PlayTable from "@/components/play/PlayTable";

export const metadata: Metadata = {
  title: "Play",
  description: "Chloe Yun’s photo archive — prints from the stage years and the work since.",
};

export default function PlayPage() {
  return (
    <>
      <Container className="pb-10 pt-12 sm:pt-20">
        <p className="eyebrow">Photo archive</p>
        <h1 className="display mt-4 text-[clamp(3.5rem,11vw,9rem)]">Play</h1>
        <p id="play-help" className="mt-6 max-w-[34rem] text-lg text-muted">
          Prints from the stage years and the work since. Pick one up by its white border and toss it around; tap a photo to look closer,
          or a print marked ↗ to open its case study.
        </p>
      </Container>
      <PlayTable />
    </>
  );
}
