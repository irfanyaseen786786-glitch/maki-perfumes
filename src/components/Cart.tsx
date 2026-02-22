import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number, size: string) => void;
  onRemove: (id: string, size: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.selectedPrice * item.quantity, 0);

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

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-luxury-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-gold" />
                <h2 className="text-2xl font-serif">Your Selection</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-luxury-cream rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag size={64} className="text-black/10 mb-4" />
                  <p className="text-luxury-black/50 font-light italic">Your cart is as empty as a scentless garden.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-gold uppercase tracking-widest text-sm border-b border-gold pb-1"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={`${item.id}-${item.selectedSize}`} 
                    className="flex gap-4 bg-white p-4 rounded-xl luxury-shadow"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-lg">{item.name}</h3>
                            <p className="text-[10px] text-luxury-black/40 uppercase tracking-widest">{item.selectedSize}</p>
                          </div>
                          <button 
                            onClick={() => onRemove(item.id, item.selectedSize)}
                            className="text-black/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-gold uppercase tracking-widest">{item.brand}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-black/5 rounded-full px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1, item.selectedSize)}
                            className="p-1 hover:text-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1, item.selectedSize)}
                            className="p-1 hover:text-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-medium">Rs. {(item.selectedPrice * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-black/5 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-light uppercase tracking-widest text-sm">Subtotal</span>
                  <span className="font-serif text-2xl">Rs. {total.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-luxury-black/40 text-center uppercase tracking-widest">
                  Shipping and taxes calculated at checkout
                </p>
                <button className="w-full bg-luxury-black text-white py-4 rounded-full uppercase tracking-widest text-sm hover:bg-gold transition-all transform active:scale-95">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
