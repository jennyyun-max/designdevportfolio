import IntroStory from "@/components/intro/IntroStory";
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import Doors from "@/components/home/Doors";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <IntroStory />
      <Hero />
      <SelectedWork />
      <Doors />
      <ContactSection />
    </>
  );
}
