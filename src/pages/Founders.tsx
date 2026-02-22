import { motion } from 'motion/react';

export default function Founders() {
  return (
    <div className="pt-32 pb-24 bg-luxury-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">The Visionaries</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Meet Our Founders</h2>
          <p className="text-luxury-black/40 font-light italic">The heart and mind behind Lahore's most exquisite scents.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Founder 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden luxury-shadow mb-8 relative bg-luxury-black">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" 
                alt="Maki Irfan" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 brightness-[1.1] group-hover:brightness-120 contrast-[1.05] saturate-[1.1]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[40px]" />
              
              <div className="absolute inset-0 flex items-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white/80 text-sm italic border-l-2 border-gold pl-4">"Fragrance is the most intense form of memory. We share a piece of Lahore's soul in every bottle."</p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-serif mb-2 text-luxury-black">Maki Irfan</h3>
              <p className="text-gold uppercase tracking-widest text-xs font-bold">Founder & Master Perfumer</p>
            </div>
          </motion.div>

          {/* Co-Founder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden luxury-shadow mb-8 relative bg-luxury-black">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Co-Founder" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 brightness-[1.1] group-hover:brightness-120 contrast-[1.05] saturate-[1.1]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[40px]" />
              
              <div className="absolute inset-0 flex items-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white/80 text-sm italic border-l-2 border-gold pl-4">"Our mission is to bring the timeless elegance of traditional attars to the modern world."</p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-serif mb-2 text-luxury-black">Zaid Ahmed</h3>
              <p className="text-gold uppercase tracking-widest text-xs font-bold">Co-Founder & Creative Director</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-serif mb-8 text-luxury-black">Our Philosophy</h3>
          <p className="text-luxury-black/60 font-light text-lg leading-relaxed">
            We believe that a fragrance is more than just a scent; it's an identity. Our founders have spent decades traveling the world to source the finest ingredients, from the deep forests of Cambodia to the rose valleys of Bulgaria, all to bring you a collection that is truly unique.
          </p>
        </div>
      </div>
    </div>
  );
}
