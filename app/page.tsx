import Welcome from "@/components/intro/Welcome";
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import ProfileTeaser from "@/components/home/ProfileTeaser";
import KeptLoosely from "@/components/home/KeptLoosely";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Hero />
      <SelectedWork />
      <ProfileTeaser />
      <KeptLoosely />
    </>
  );
}
