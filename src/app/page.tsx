import Features from "./Components/Features";
import CeramicsSection from "./Components/CeramicsSection";
import About from "./Components/About";
import HeroSection from "./Components/HeroSection";
import ProductSection from "./Components/ProductSection";

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
