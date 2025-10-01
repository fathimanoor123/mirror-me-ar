import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onARClick: () => void;
}

const Header = ({ onARClick }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState("ar");

  const navigate = useNavigate();

  const handleNavigation = (route: string, linkName: string) => {
    setActiveLink(linkName);
    navigate(route);
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-7xl">
        <div className="text-3xl font-black text-foreground">
          AR Try-On Studio
        </div>
        
        <nav className="flex gap-8">
          <button
            onClick={() => handleNavigation("/women", "women")}
            className={`text-lg font-semibold transition-colors hover:text-primary ${
              activeLink === "women" ? "text-primary" : "text-foreground"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => handleNavigation("/men", "men")}
            className={`text-lg font-semibold transition-colors hover:text-primary ${
              activeLink === "men" ? "text-primary" : "text-foreground"
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleNavigation("/kids", "kids")}
            className={`text-lg font-semibold transition-colors hover:text-primary ${
              activeLink === "kids" ? "text-primary" : "text-foreground"
            }`}
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
