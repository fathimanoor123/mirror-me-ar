import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  subcategory: string;
  stock: number;
}

const Kids = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "kids")
      .order("subcategory");

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.subcategory]) {
      acc[product.subcategory] = [];
    }
    acc[product.subcategory].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const subcategoryTitles: Record<string, string> = {
    dress: "Clothing",
    accessories: "Accessories"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-2"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>
          <h1 className="text-5xl font-black text-primary">Kids' Collection</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Fun and colorful clothing and accessories for children
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(groupedProducts).map(([subcategory, items]) => (
              <section key={subcategory}>
                <h2 className="text-4xl font-black mb-8 text-foreground">
                  {subcategoryTitles[subcategory] || subcategory}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[0_8px_30px_hsl(330_100%_71%/0.4)] transition-all"
                    >
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <ShoppingBag size={64} className="text-purple-500 opacity-50" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {product.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-black text-primary">
                            ${product.price}
                          </span>
                          <Button
                            onClick={() => navigate("/", { state: { openAR: true, product: product.name } })}
                            className="rounded-full"
                          >
                            Try On AR
                          </Button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-3">
                          {product.stock} in stock
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kids;
