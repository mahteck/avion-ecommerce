// import Features from "./Components/Features";
// import CeramicsSection from "./Components/CeramicsSection";
// import About from "./Components/About";
// import HeroSection from "./Components/HeroSection";
// import ProductSection from "./Components/ProductSection";

import About from "@/components/About";
import CeramicsSection from "@/components/CeramicsSection";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <Features />
        <CeramicsSection />
        <ProductSection />
        <About />
      </main>
    </div>
  );
}
