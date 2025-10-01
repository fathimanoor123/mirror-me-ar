import { useNavigate } from "react-router-dom";
import womenImage from "@/assets/women-category.jpg";
import menImage from "@/assets/men-category.jpg";
import kidsImage from "@/assets/kids-category.jpg";

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
}

const CategoryGrid = ({ onCategoryClick }: CategoryGridProps) => {
  const navigate = useNavigate();
  
  const categories = [
    { name: "Women", image: womenImage, label: "Women's Collection", route: "/women" },
    { name: "Men", image: menImage, label: "Men's Collection", route: "/men" },
    { name: "Kids", image: kidsImage, label: "Kids' Collection", route: "/kids" }
  ];

  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <h1 className="text-5xl font-black text-primary mb-16">
          Start Your Virtual Try-On: Shop by Category
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => navigate(category.route)}
              className="group relative overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-card)] hover:shadow-[0_8px_30px_hsl(330_100%_71%/0.4)] transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-square relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <h2 className="absolute bottom-6 left-0 right-0 text-4xl font-black text-white group-hover:text-primary transition-colors">
                  {category.name}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
