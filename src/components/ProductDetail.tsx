import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Heart, MessageSquare, Lock } from 'lucide-react';
import { Product, Review, ProductSize } from '../types';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSize: string, selectedPrice: number) => void;
  onToggleWishlist: (id: string) => void;
  isInWishlist: boolean;
  onSubmitReview: (productId: string, rating: number, comment: string) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart, onToggleWishlist, isInWishlist, onSubmitReview }: ProductDetailProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) return null;

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (comment.trim()) {
      onSubmitReview(product.id, rating, comment);
      setComment('');
      setRating(5);
      setShowReviewForm(false);
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-luxury-cream z-[90] rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full z-10 hover:bg-gold hover:text-white transition-all"
            >
              <X size={24} />
            </button>

            {/* Image Section */}
            <div className="md:w-1/2 h-1/2 md:h-full relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold">
                  {product.category}
                </span>
                <span className="bg-gold text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold">
                  {product.fragranceFamily}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 h-1/2 md:h-full overflow-y-auto p-8 md:p-12 lg:p-16 bg-white">
              <div className="max-w-xl">
                <p className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-2">{product.brand}</p>
                <h2 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h2>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < Math.round(averageRating) ? "text-gold fill-gold" : "text-black/10"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-luxury-black/40 font-light">
                    {product.reviews.length} Verified Reviews
                  </span>
                </div>

                <div className="mb-8">
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Select Size</h4>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all border ${
                          selectedSize?.label === size.label
                            ? 'bg-luxury-black text-white border-luxury-black'
                            : 'bg-white text-luxury-black border-black/10 hover:border-gold'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-3xl font-medium mb-8">Rs. {selectedSize?.price.toLocaleString()}</p>

                <p className="text-luxury-black/60 text-lg leading-relaxed mb-10 font-light">
                  {product.description}
                </p>

                {/* Scent Notes */}
                <div className="grid grid-cols-3 gap-8 mb-12">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">Top Notes</h4>
                    <ul className="text-sm space-y-1 font-light">
                      {product.notes.top.map(note => <li key={note}>{note}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">Heart Notes</h4>
                    <ul className="text-sm space-y-1 font-light">
                      {product.notes.middle.map(note => <li key={note}>{note}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">Base Notes</h4>
                    <ul className="text-sm space-y-1 font-light">
                      {product.notes.base.map(note => <li key={note}>{note}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-16">
                  <button 
                    onClick={() => selectedSize && onAddToCart(product, selectedSize.label, selectedSize.price)}
                    className="flex-1 bg-luxury-black text-white py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-gold transition-all flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={20} />
                    Add to Selection
                  </button>
                  <button 
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-5 rounded-full border transition-all ${isInWishlist ? 'bg-gold border-gold text-white' : 'border-black/10 hover:border-gold hover:text-gold'}`}
                  >
                    <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-black/5 pt-12">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-serif">Customer Reviews</h3>
                    <button 
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-gold text-sm uppercase tracking-widest font-bold flex items-center gap-2"
                    >
                      <MessageSquare size={16} />
                      {showReviewForm ? 'Cancel' : 'Write a Review'}
                    </button>
                  </div>

                  {showReviewForm && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-12 bg-luxury-cream p-8 rounded-[32px] border border-black/5"
                    >
                      {!user ? (
                        <div className="text-center py-4">
                          <Lock size={32} className="mx-auto text-gold/20 mb-4" />
                          <p className="text-luxury-black/60 mb-6 font-light">Please sign in to share your experience with this fragrance.</p>
                          <Link 
                            to="/auth" 
                            className="inline-block bg-luxury-black text-white px-8 py-4 rounded-full uppercase tracking-widest text-[10px] font-bold hover:bg-gold transition-all"
                          >
                            Sign In to Review
                          </Link>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit}>
                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm font-light mr-4">Your Rating:</span>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button 
                                key={s} 
                                type="button"
                                onClick={() => setRating(s)}
                                className="transition-transform hover:scale-125"
                              >
                                <Star 
                                  size={24} 
                                  className={s <= rating ? "text-gold fill-gold" : "text-black/10"} 
                                />
                              </button>
                            ))}
                          </div>
                          <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={`Hi ${profile?.full_name || 'there'}, what did you think of this scent?`}
                            className="w-full bg-white border border-black/5 rounded-2xl p-6 text-sm focus:outline-none focus:border-gold transition-colors mb-6 min-h-[120px] font-light"
                            required
                          />
                          <button 
                            type="submit"
                            className="bg-luxury-black text-white px-10 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all"
                          >
                            Post Review
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}

                  <div className="space-y-8">
                    {product.reviews.length === 0 ? (
                      <p className="text-luxury-black/40 italic font-light">No reviews yet. Be the first to share your thoughts.</p>
                    ) : (
                      product.reviews.map((review) => (
                        <div key={review.id} className="border-b border-black/5 pb-8 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-sm">{review.userName}</p>
                              <div className="flex gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    className={i < review.rating ? "text-gold fill-gold" : "text-black/10"} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] text-luxury-black/30 uppercase tracking-widest">{review.date}</span>
                          </div>
                          <p className="text-luxury-black/60 font-light text-sm leading-relaxed italic">
                            "{review.comment}"
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
