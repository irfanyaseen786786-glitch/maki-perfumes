import { motion } from 'motion/react';
import Hero from '../components/Hero';
import { Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

export default function Home() {
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const getAiRecommendation = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "You are a luxury fragrance expert for 'Maki Perfumes'. Suggest a unique scent profile for someone who loves the desert, warm evenings, and mystery. Keep it poetic and short (2 sentences).",
      });
      setAiRecommendation(response.text || "A blend of ancient oud and desert rose awaits your discovery.");
    } catch (error) {
      console.error("AI Error:", error);
      setAiRecommendation("Discover the timeless elegance of our signature Oud and Rose blends.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <Hero />
      
      {/* AI Fragrance Finder Section */}
      <section className="py-20 bg-luxury-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-[40px] p-8 md:p-16 luxury-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-gold mb-4">
                  <Sparkles size={20} />
                  <span className="uppercase tracking-[0.3em] text-xs font-bold">AI Fragrance Curator</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Find Your Signature Scent</h2>
                <p className="text-luxury-black/60 font-light mb-8 text-lg leading-relaxed">
                  Our AI-powered curator analyzes your preferences to suggest the perfect Maki fragrance for your unique personality.
                </p>
                <button 
                  onClick={getAiRecommendation}
                  disabled={isAiLoading}
                  className="bg-luxury-black text-white px-8 py-4 rounded-full uppercase tracking-widest text-sm hover:bg-gold transition-all disabled:opacity-50"
                >
                  {isAiLoading ? "Consulting the Oracle..." : "Get Recommendation"}
                </button>
              </div>
              <div className="flex-1 w-full">
                <AnimatePresence mode="wait">
                  {aiRecommendation ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-luxury-cream p-8 rounded-3xl border border-gold/20 italic font-serif text-2xl text-center leading-relaxed"
                    >
                      "{aiRecommendation}"
                    </motion.div>
                  ) : (
                    <div className="aspect-video bg-luxury-cream rounded-3xl flex items-center justify-center border border-dashed border-gold/20">
                      <p className="text-luxury-black/30 italic">Your personalized recommendation will appear here...</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-8">Experience Luxury</h2>
          <p className="text-luxury-black/60 max-w-2xl mx-auto mb-12">
            From the bustling streets of Lahore to the quiet valleys of the North, our scents capture the essence of Pakistan's rich heritage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="aspect-video rounded-[40px] overflow-hidden luxury-shadow"
            >
              <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" alt="Perfume" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="aspect-video rounded-[40px] overflow-hidden luxury-shadow"
            >
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200" alt="Perfume" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
