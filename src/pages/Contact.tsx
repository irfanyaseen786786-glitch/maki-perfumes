import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-luxury-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Contact Us</h2>
          <p className="text-luxury-black/40 font-light italic">We would love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white rounded-[40px] p-8 md:p-12 luxury-shadow">
            <h3 className="text-2xl font-serif mb-8">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Full Name</label>
                  <input type="text" className="w-full bg-luxury-cream border-none rounded-2xl py-4 px-6 focus:ring-1 focus:ring-gold outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Email Address</label>
                  <input type="email" className="w-full bg-luxury-cream border-none rounded-2xl py-4 px-6 focus:ring-1 focus:ring-gold outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Subject</label>
                <input type="text" className="w-full bg-luxury-cream border-none rounded-2xl py-4 px-6 focus:ring-1 focus:ring-gold outline-none" placeholder="Inquiry about Oud Al-Malaki" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Message</label>
                <textarea rows={6} className="w-full bg-luxury-cream border-none rounded-2xl py-4 px-6 focus:ring-1 focus:ring-gold outline-none resize-none" placeholder="Your message here..."></textarea>
              </div>
              <button className="w-full bg-luxury-black text-white py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-gold transition-all">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 md:p-12 luxury-shadow flex items-start gap-6">
              <div className="bg-luxury-cream p-4 rounded-2xl text-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Our Boutique</h4>
                <p className="text-xl font-serif">Bhatti Chowk, Lahore</p>
                <p className="text-luxury-black/40 text-sm">Punjab, Pakistan</p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 md:p-12 luxury-shadow flex items-start gap-6">
              <div className="bg-luxury-cream p-4 rounded-2xl text-gold">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Call Us</h4>
                <p className="text-xl font-serif">03004301223</p>
                <p className="text-luxury-black/40 text-sm">Mon - Sat, 10am - 8pm</p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 md:p-12 luxury-shadow flex items-start gap-6">
              <div className="bg-luxury-cream p-4 rounded-2xl text-gold">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Email Us</h4>
                <p className="text-xl font-serif">perfumes@maki.com</p>
                <p className="text-luxury-black/40 text-sm">We reply within 24 hours</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center luxury-shadow hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center luxury-shadow hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center luxury-shadow hover:text-gold transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
