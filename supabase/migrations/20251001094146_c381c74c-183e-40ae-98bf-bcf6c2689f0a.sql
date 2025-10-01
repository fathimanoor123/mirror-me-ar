-- Create products table with categories
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('women', 'men', 'kids')),
  subcategory TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view products (public catalog)
CREATE POLICY "Anyone can view products"
  ON public.products
  FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_subcategory ON public.products(subcategory);

-- Insert sample data for Women
INSERT INTO public.products (name, description, price, category, subcategory, stock) VALUES
('Elegant Summer Dress', 'Flowy floral dress perfect for summer', 79.99, 'women', 'dress', 50),
('Classic Black Dress', 'Timeless little black dress', 99.99, 'women', 'dress', 30),
('Gold Statement Necklace', 'Bold gold chain necklace', 45.00, 'women', 'accessories', 100),
('Leather Crossbody Bag', 'Premium leather handbag', 120.00, 'women', 'accessories', 40),
('Luxury Lipstick Set', 'Set of 5 long-lasting lipsticks', 65.00, 'women', 'makeup', 80),
('Foundation Kit', 'All-in-one foundation and concealer', 55.00, 'women', 'makeup', 60);

-- Insert sample data for Men
INSERT INTO public.products (name, description, price, category, subcategory, stock) VALUES
('Slim Fit Suit', 'Modern navy blue suit', 299.99, 'men', 'dress', 25),
('Casual Button-Down Shirt', 'Cotton oxford shirt', 49.99, 'men', 'dress', 70),
('Luxury Chronograph Watch', 'Stainless steel automatic watch', 450.00, 'men', 'watch', 15),
('Sport Smart Watch', 'Fitness tracking smartwatch', 199.99, 'men', 'watch', 50),
('Leather Oxford Shoes', 'Classic brown leather shoes', 149.99, 'men', 'shoe', 40),
('Casual Sneakers', 'Comfortable canvas sneakers', 79.99, 'men', 'shoe', 100);

-- Insert sample data for Kids
INSERT INTO public.products (name, description, price, category, subcategory, stock) VALUES
('Rainbow Party Dress', 'Colorful tutu dress for girls', 39.99, 'kids', 'dress', 60),
('Cool Graphic T-Shirt', 'Fun dinosaur print tee', 19.99, 'kids', 'dress', 120),
('Cute Hair Accessories Set', 'Bows, clips, and bands', 24.99, 'kids', 'accessories', 90),
('Mini Backpack', 'Small colorful backpack', 34.99, 'kids', 'accessories', 70);