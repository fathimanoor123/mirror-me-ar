const HowItWorks = () => {
  const steps = [
    {
      icon: "🔍",
      number: "1.",
      title: "Scan Your Face",
      description: "Our AI detects your facial features with precision for perfect object placement."
    },
    {
      icon: "🛍️",
      number: "2.",
      title: "Try Products",
      description: "See realistic AR overlays of glasses, watches, and more on your body in real-time."
    },
    {
      icon: "🔗",
      number: "3.",
      title: "Share & Buy",
      description: "Capture, share with friends, and purchase with confidence knowing the fit is right."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <h2 className="text-5xl font-black mb-4">How AR Try-On Works</h2>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
          Experience our revolutionary virtual try-on technology in three simple steps.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-background border-4 border-secondary flex items-center justify-center text-5xl mb-6 shadow-[var(--shadow-pink)]">
                {step.icon}
              </div>
              
              <span className="text-lg font-black text-primary mb-2">{step.number}</span>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
