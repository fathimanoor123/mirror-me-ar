import { useState } from "react";

interface HeaderProps {
  onARClick: () => void;
}

const Header = ({ onARClick }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState("ar");

  const scrollToSection = (id: string) => {
    setActiveLink(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-7xl">
        <div className="text-3xl font-black text-foreground">
          AR Try-On Studio
        </div>
        
        <nav className="flex gap-8">
          <button
            onClick={() => scrollToSection("categories")}
            className={`text-lg font-semibold transition-colors hover:text-primary ${
              activeLink === "categories" ? "text-primary" : "text-foreground"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
          >
            Men
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
          >
            Kids
          </button>
          <button
            onClick={() => {
              setActiveLink("ar");
              onARClick();
            }}
            className={`text-lg font-semibold transition-colors hover:text-primary ${
              activeLink === "ar" ? "text-primary" : "text-foreground"
            }`}
          >
            AR Try-On
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
