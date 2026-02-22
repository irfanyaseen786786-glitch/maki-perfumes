import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
}

export default function Wishlist({ isOpen, onClose, items, onRemove, onMoveToCart }: WishlistProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Wishlist Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-luxury-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <Heart size={24} className="text-red-500 fill-red-500" />
                <h2 className="text-2xl font-serif">Your Wishlist</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-luxury-cream rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Heart size={64} className="text-black/10 mb-4" />
                  <p className="text-luxury-black/50 font-light italic">Your wishlist is waiting for your favorite scents.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-gold uppercase tracking-widest text-sm border-b border-gold pb-1"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white p-4 rounded-xl luxury-shadow"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg">{item.name}</h3>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-black/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-gold uppercase tracking-widest">{item.brand}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">Rs. {item.sizes[0].price.toLocaleString()}</p>
                        <button 
                          onClick={() => onMoveToCart(item)}
                          className="flex items-center gap-2 bg-luxury-black text-white px-3 py-1.5 rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-colors"
                        >
                          <ShoppingBag size={12} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
