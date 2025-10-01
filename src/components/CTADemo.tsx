import { Button } from "@/components/ui/button";

interface CTADemoProps {
  onARClick: () => void;
}

const CTADemo = ({ onARClick }: CTADemoProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-5xl font-black text-white mb-6">
          Experience the Future: Start Your Try-On Now!
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Launch the Live Try-On Mode on your device to experience the realism 
          and speed of our AI-powered solution.
        </p>
        
        <Button 
          onClick={onARClick}
          size="lg"
          className="text-lg px-12 py-7 rounded-full bg-white text-primary hover:bg-white/90 shadow-xl transform hover:scale-105 transition-all"
        >
          🚀 Launch Live AR Demo
        </Button>
      </div>
    </section>
  );
};

export default CTADemo;
