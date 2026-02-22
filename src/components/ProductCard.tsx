import React from 'react';
import { motion } from 'motion/react';
import { Plus, Heart, Star } from 'lucide-react';
import { Product } from '../types';

export interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isInWishlist, onAddToCart, onToggleWishlist, onClick }) => {
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    : 0;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={item}
      className="group relative"
    >
      <div 
        className="aspect-[3/4] overflow-hidden bg-luxury-cream relative rounded-2xl cursor-pointer" 
        onClick={() => onClick(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="bg-white text-luxury-black p-4 rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110"
          >
            <Plus size={20} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
            className={`p-4 rounded-full transition-all transform hover:scale-110 ${isInWishlist ? 'bg-gold text-white' : 'bg-white text-luxury-black hover:bg-red-500 hover:text-white'}`}
          >
            <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-1 font-semibold">{product.brand}</p>
        <h3 className="text-xl font-serif mb-1 group-hover:text-gold transition-colors cursor-pointer" onClick={() => onClick(product)}>{product.name}</h3>
        
        {/* Rating */}
        <div className="flex justify-center items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < Math.round(averageRating) ? "text-gold fill-gold" : "text-black/10"} 
            />
          ))}
          {product.reviews.length > 0 && (
            <span className="text-[10px] text-luxury-black/40 ml-1">({product.reviews.length})</span>
          )}
        </div>

        <p className="text-sm text-luxury-black/60 font-light mb-3 line-clamp-1">{product.description}</p>
        <p className="text-lg font-medium">Rs. {product.sizes[0].price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
