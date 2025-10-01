import heroImage from "@/assets/hero-woman.jpg";
import promoImage from "@/assets/promo-sale.jpg";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onARClick: () => void;
}

const HeroSection = ({ onARClick }: HeroSectionProps) => {
  const scrollToCategories = () => {
    const element = document.getElementById("categories");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-[90vh] bg-background py-20 flex items-center">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              Try Before You <br />
              Buy with <span className="text-primary">AR Magic</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Experience the future of shopping. See how glasses, watches, and cosmetics 
              look on you in real-time with our cutting-edge AR technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onARClick}
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-[0_4px_15px_hsl(330_100%_71%/0.4)] hover:shadow-[0_6px_20px_hsl(330_100%_71%/0.5)] transition-all"
              >
                🔴 Start AR Try-On
              </Button>
              
              <Button 
                onClick={scrollToCategories}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full border-2 border-primary text-primary hover:bg-secondary"
              >
                Browse Products
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div>
                <h3 className="text-4xl font-black text-primary">50K+</h3>
                <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-4xl font-black text-primary">100K+</h3>
                <p className="text-sm text-muted-foreground mt-1">Products Tried</p>
              </div>
              <div>
                <h3 className="text-4xl font-black text-primary">4.8 ⭐</h3>
                <p className="text-sm text-muted-foreground mt-1">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Promo Box */}
          <div className="relative rounded-[var(--radius)] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
            <div 
              className="relative h-[500px] bg-gradient-to-br from-[#2c002c] to-[#4a004a] flex flex-col items-center justify-center text-white"
              style={{
                backgroundImage: `linear-gradient(rgba(44, 0, 44, 0.7), rgba(74, 0, 74, 0.7)), url(${promoImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h2 className="text-4xl font-black text-pink-100 mb-4">SALE</h2>
              <h4 className="text-8xl font-black text-primary" style={{ textShadow: '2px 2px 0 #fff' }}>
                50%
              </h4>
              
              <div className="absolute bottom-8 text-center">
                <p className="text-xl font-semibold mb-2">Live AR Preview</p>
                <p className="text-sm text-pink-200">Try products instantly</p>
                <Button 
                  onClick={onARClick}
                  className="mt-4 rounded-full px-8 bg-primary hover:bg-primary/90"
                >
                  Try Now
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
