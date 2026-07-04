import Link from "next/link";
import HeroSection from "./component/HeroSection";
import FeatureSection from "./component/FeatureSection";
import AboutSection from "./component/AboutSection";
import HowItWorkSection from "./component/HowItWorkSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <HowItWorkSection />
      <Link href="/dashboard">dashboard</Link>
    </>
  );
}


