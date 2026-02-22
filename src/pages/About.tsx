export default function About() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div className="flex-1 relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden luxury-shadow">
              <img 
                src="https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Fragrance Art" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl luxury-shadow hidden lg:block max-w-xs">
              <p className="font-serif italic text-xl mb-2">"Lahore is Lahore."</p>
              <p className="text-[10px] uppercase tracking-widest text-gold">— Traditional Proverb</p>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Lahore's Finest Olfactory Art</h2>
            <p className="text-luxury-black/60 font-light text-lg leading-relaxed mb-8">
              Maki Perfumes began as a small boutique in the heart of Bhatti Chowk, Lahore, dedicated to preserving the ancient art of Pakistani attar making while embracing modern olfactory innovations.
            </p>
            <p className="text-luxury-black/60 font-light text-lg leading-relaxed mb-10">
              Every bottle is a testament to our commitment to quality, using only the finest natural extracts, sustainably sourced from the valleys of Pakistan to the forests of Cambodia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8 bg-luxury-cream rounded-[40px]">
            <h3 className="text-xl font-serif mb-4">Craftsmanship</h3>
            <p className="text-sm text-luxury-black/60 font-light">Each fragrance is hand-blended in small batches to ensure the highest level of quality and consistency.</p>
          </div>
          <div className="text-center p-8 bg-luxury-cream rounded-[40px]">
            <h3 className="text-xl font-serif mb-4">Sourcing</h3>
            <p className="text-sm text-luxury-black/60 font-light">We work directly with farmers and distillers around the world to source the rarest and most precious ingredients.</p>
          </div>
          <div className="text-center p-8 bg-luxury-cream rounded-[40px]">
            <h3 className="text-xl font-serif mb-4">Innovation</h3>
            <p className="text-sm text-luxury-black/60 font-light">While we respect tradition, we are always exploring new techniques and scent profiles to push the boundaries of perfumery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
