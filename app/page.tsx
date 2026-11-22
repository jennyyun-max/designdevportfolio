import Welcome from "@/components/intro/Welcome";
import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import ProfileTeaser from "@/components/home/ProfileTeaser";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Hero />
      <SelectedWork />
      <ProfileTeaser />
    </>
  );
}
