import Welcome from "@/components/intro/Welcome";
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import Doors from "@/components/home/Doors";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Hero />
      <SelectedWork />
      <Doors />
      <ContactSection />
    </>
  );
}
