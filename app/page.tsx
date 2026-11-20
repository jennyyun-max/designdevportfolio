import DeskHero from "@/components/home/DeskHero";
import SelectedWork from "@/components/home/SelectedWork";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <DeskHero />
      <SelectedWork />
      <AboutSection />
      <ContactSection />
    </>
  );
}
