import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import ProductDetail from './components/ProductDetail';
import { PRODUCTS, Product, CartItem, FragranceFamily, Review } from './types';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import Founders from './pages/Founders';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Orders from './pages/Orders';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Perfume' | 'Attar'>('All');
  const [activeFamily, setActiveFamily] = useState<FragranceFamily | 'All'>('All');
  const [activeBrand, setActiveBrand] = useState<string | 'All'>('All');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, selectedSize?: string, selectedPrice?: number) => {
    const size = selectedSize || product.sizes[0].label;
    const price = selectedPrice || product.sizes[0].price;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const { sizes, ...productInfo } = product;
      return [...prev, { ...productInfo, quantity: 1, selectedSize: size, selectedPrice: price }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const submitReview = (productId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userName: 'You',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, reviews: [newReview, ...p.reviews] } : p
    ));

    if (selectedProduct?.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, reviews: [newReview, ...prev.reviews] } : null);
    }
  };

  const wishlistProducts = useMemo(() => 
    products.filter(p => wishlist.includes(p.id)),
  [products, wishlist]);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent 
          products={products}
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishlist={wishlist}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isWishlistOpen={isWishlistOpen}
          setIsWishlistOpen={setIsWishlistOpen}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeFamily={activeFamily}
          setActiveFamily={setActiveFamily}
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          submitReview={submitReview}
          wishlistProducts={wishlistProducts}
        />
      </Router>
    </AuthProvider>
  );
}

function AppContent({ 
  products, cartItems, setCartItems, wishlist, isCartOpen, setIsCartOpen, 
  isWishlistOpen, setIsWishlistOpen, activeCategory, setActiveCategory, 
  activeFamily, setActiveFamily, activeBrand, setActiveBrand, sortBy, setSortBy, 
  selectedProduct, setSelectedProduct, addToCart, toggleWishlist, submitReview, 
  wishlistProducts 
}: any) {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartItems.reduce((a: number, b: any) => a + b.quantity, 0)} 
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/collection" 
            element={
              <Collection 
                products={products}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeFamily={activeFamily}
                setActiveFamily={setActiveFamily}
                activeBrand={activeBrand}
                setActiveBrand={setActiveBrand}
                sortBy={sortBy}
                setSortBy={setSortBy}
                wishlist={wishlist}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                setSelectedProduct={setSelectedProduct}
              />
            } 
          />
          <Route path="/founders" element={<Founders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>

        {/* Footer */}
        <footer className="bg-luxury-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-3xl font-serif tracking-widest uppercase mb-6">
                  Maki <span className="text-gold">Perfumes</span>
                </h2>
                <p className="text-white/50 font-light max-w-md mb-8">
                  Elevate your presence with our exquisite range of luxury fragrances from the heart of Lahore. 
                  Subscribe to our newsletter for exclusive launches and olfactory insights.
                </p>
                <div className="flex flex-col gap-4 text-white/40 text-xs uppercase tracking-widest">
                  <p>Bhatti Chowk, Lahore, Pakistan</p>
                  <p>03004301223 | perfumes@maki.com</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <a href="#" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="hover:text-gold transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="hover:text-gold transition-colors"><Twitter size={20} /></a>
                </div>
              </div>
              <div>
                <h3 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Quick Links</h3>
                <ul className="space-y-4 text-white/60 font-light text-sm">
                  <li><a href="/collection" className="hover:text-white transition-colors">Shop All</a></li>
                  <li><a href="/collection" className="hover:text-white transition-colors">Attar Collection</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">Newsletter</h3>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gold">
                    <Mail size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
              <p>© 2026 Maki Perfumes. All Rights Reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onUpdateQuantity={(id, delta, size) => {
            setCartItems(prev => prev.map(item => {
              if (item.id === id && item.selectedSize === size) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
              }
              return item;
            }));
          }}
          onRemove={(id, size) => {
            setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
          }}
        />

        <ProductDetail 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isInWishlist={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
          onSubmitReview={submitReview}
        />
        <Wishlist 
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={wishlistProducts}
          onRemove={toggleWishlist}
          onMoveToCart={(product) => {
            addToCart(product);
            toggleWishlist(product.id);
          }}
        />
      </div>
  );
}
