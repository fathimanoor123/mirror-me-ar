import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import CategoryGrid from "@/components/CategoryGrid";
import CTADemo from "@/components/CTADemo";
import ARModal from "@/components/ARModal";

const Index = () => {
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Live AR Try-On Demo");

  const handleARClick = (productName: string = "Live AR Try-On Demo") => {
    setSelectedProduct(productName);
    setIsARModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    handleARClick(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onARClick={() => handleARClick()} />
      
      <main>
        <HeroSection onARClick={() => handleARClick("Featured Demo Item")} />
        <HowItWorks />
        <CategoryGrid onCategoryClick={handleCategoryClick} />
        <CTADemo onARClick={() => handleARClick("Featured Demo Item")} />
      </main>

      <ARModal 
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
};

export default Index;
