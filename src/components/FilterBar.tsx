import { motion } from 'motion/react';
import { Filter, ChevronDown } from 'lucide-react';
import { FragranceFamily } from '../types';

interface FilterBarProps {
  activeFamily: FragranceFamily | 'All';
  onFamilyChange: (family: FragranceFamily | 'All') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  brands: string[];
  activeBrand: string | 'All';
  onBrandChange: (brand: string | 'All') => void;
}

export default function FilterBar({ activeFamily, onFamilyChange, sortBy, onSortChange, brands, activeBrand, onBrandChange }: FilterBarProps) {
  const families: (FragranceFamily | 'All')[] = ['All', 'Floral', 'Woody', 'Fresh', 'Oriental', 'Spicy', 'Musky'];

  return (
    <div className="bg-white border-y border-black/5 py-6 mb-12 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Families */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
          <Filter size={16} className="text-gold flex-shrink-0" />
          {families.map((family) => (
            <button
              key={family}
              onClick={() => onFamilyChange(family)}
              className={`text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeFamily === family 
                ? 'bg-luxury-black text-white' 
                : 'bg-luxury-cream text-luxury-black/60 hover:text-luxury-black'
              }`}
            >
              {family}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          {/* Brand Filter */}
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-[10px] uppercase tracking-widest text-luxury-black/40">Brand:</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">{activeBrand}</span>
              <ChevronDown size={14} className="text-gold" />
            </div>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-2xl border border-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
              <button 
                onClick={() => onBrandChange('All')}
                className="w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-luxury-cream rounded-lg"
              >
                All Brands
              </button>
              {brands.map(brand => (
                <button 
                  key={brand}
                  onClick={() => onBrandChange(brand)}
                  className="w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-luxury-cream rounded-lg"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-[10px] uppercase tracking-widest text-luxury-black/40">Sort by:</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">
                {sortBy === 'price-asc' ? 'Price: Low to High' : 
                 sortBy === 'price-desc' ? 'Price: High to Low' : 
                 sortBy === 'newest' ? 'Newest Arrivals' : 'Most Popular'}
              </span>
              <ChevronDown size={14} className="text-gold" />
            </div>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-2xl border border-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
              {[
                { id: 'popular', label: 'Most Popular' },
                { id: 'newest', label: 'Newest Arrivals' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' }
              ].map(option => (
                <button 
                  key={option.id}
                  onClick={() => onSortChange(option.id)}
                  className="w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-luxury-cream rounded-lg"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
