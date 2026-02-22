import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Search, User, Heart, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export default function Navbar({ cartCount, wishlistCount, onOpenCart, onOpenWishlist }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Founders', path: '/founders' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-luxury-black p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl md:text-3xl font-serif tracking-widest uppercase">
              Maki <span className="text-gold">Perfumes</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  location.pathname === link.path ? 'text-gold' : 'hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 hover:text-gold transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : null}
                className="p-2 hover:text-gold transition-colors"
              >
                {user ? (
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-xs">
                    {profile?.full_name?.[0] || user.email?.[0].toUpperCase()}
                  </div>
                ) : (
                  <Link to="/auth">
                    <User size={20} />
                  </Link>
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl luxury-shadow border border-black/5 py-2 z-[100]"
                  >
                    <div className="px-4 py-2 border-b border-black/5 mb-2">
                      <p className="text-xs font-bold text-luxury-black truncate">{profile?.full_name || 'User'}</p>
                      <p className="text-[10px] text-luxury-black/40 truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/orders" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-luxury-cream transition-colors"
                    >
                      My Orders
                    </Link>
                    {profile?.is_admin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-luxury-cream transition-colors text-gold font-bold"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs uppercase tracking-widest hover:bg-luxury-cream transition-colors text-red-500 flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={onOpenWishlist}
              className="p-2 hover:text-gold transition-colors relative"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={onOpenCart}
              className="p-2 hover:text-gold transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm uppercase tracking-widest py-2 ${
                    location.pathname === link.path ? 'text-gold' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
