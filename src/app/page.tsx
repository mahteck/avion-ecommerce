import Features from "./(public)/Components/Features";
import CeramicsSection from "./(public)/Components/CeramicsSection";
import ProductSection from "./(public)/Components/ProductSection";
import About from "./(public)/Components/About";
import HeroSection from "./(public)/Components/HeroSection";
import SignupSection from "./(public)/Components/SignupSection";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <Features />
        <CeramicsSection />
        <ProductSection />
        <SignupSection />
        <About />
      </main>
    </div>
  );
}
