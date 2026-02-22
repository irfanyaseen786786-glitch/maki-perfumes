import { useMemo } from 'react';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { Product, FragranceFamily } from '../types';

interface CollectionProps {
  products: Product[];
  activeCategory: 'All' | 'Perfume' | 'Attar';
  setActiveCategory: (cat: 'All' | 'Perfume' | 'Attar') => void;
  activeFamily: FragranceFamily | 'All';
  setActiveFamily: (family: FragranceFamily | 'All') => void;
  activeBrand: string | 'All';
  setActiveBrand: (brand: string | 'All') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  wishlist: string[];
  addToCart: (product: Product) => void;
  toggleWishlist: (id: string) => void;
  setSelectedProduct: (product: Product) => void;
}

export default function Collection({
  products,
  activeCategory,
  setActiveCategory,
  activeFamily,
  setActiveFamily,
  activeBrand,
  setActiveBrand,
  sortBy,
  setSortBy,
  wishlist,
  addToCart,
  toggleWishlist,
  setSelectedProduct
}: CollectionProps) {
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const catMatch = activeCategory === 'All' || p.category === activeCategory;
      const familyMatch = activeFamily === 'All' || p.fragranceFamily === activeFamily;
      const brandMatch = activeBrand === 'All' || p.brand === activeBrand;
      return catMatch && familyMatch && brandMatch;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return result;
  }, [products, activeCategory, activeFamily, activeBrand, sortBy]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">The Collection</h2>
          <div className="flex justify-center gap-8 mb-8">
            {(['All', 'Perfume', 'Attar'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-widest pb-2 transition-all ${
                  activeCategory === cat 
                  ? 'text-gold border-b-2 border-gold' 
                  : 'text-luxury-black/40 hover:text-luxury-black'
                }`}
              >
                {cat}s
              </button>
            ))}
          </div>
        </div>

        <FilterBar 
          activeFamily={activeFamily}
          onFamilyChange={setActiveFamily}
          sortBy={sortBy}
          onSortChange={setSortBy}
          brands={brands}
          activeBrand={activeBrand}
          onBrandChange={setActiveBrand}
        />

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {filteredAndSortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isInWishlist={wishlist.includes(product.id)}
              onAddToCart={addToCart} 
              onToggleWishlist={toggleWishlist}
              onClick={setSelectedProduct}
            />
          ))}
        </motion.div>
        
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-luxury-black/40 italic font-light">No fragrances match your current selection.</p>
            <button 
              onClick={() => { setActiveFamily('All'); setActiveBrand('All'); setActiveCategory('All'); }}
              className="mt-4 text-gold uppercase tracking-widest text-xs border-b border-gold pb-1"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
