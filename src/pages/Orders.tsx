import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ShoppingBag, Package, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(name, image_url))')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (!error) setOrders(data);
    setLoading(false);
  };

  if (authLoading) return <div className="pt-32 text-center">Loading...</div>;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="pt-32 pb-24 bg-luxury-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <ShoppingBag size={32} className="text-gold" />
          <h2 className="text-4xl font-serif">Your Orders</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 italic text-luxury-black/40">Fetching your order history...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[40px] p-16 text-center luxury-shadow">
            <Package size={64} className="mx-auto text-gold/20 mb-6" />
            <h3 className="text-2xl font-serif mb-4">No orders yet</h3>
            <p className="text-luxury-black/40 mb-8 max-w-xs mx-auto">Your fragrance journey is just beginning. Explore our collection to find your first signature scent.</p>
            <a href="/collection" className="inline-block bg-luxury-black text-white px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all">
              Explore Collection
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[40px] p-8 luxury-shadow overflow-hidden"
              >
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-black/5">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Order ID</p>
                      <p className="font-mono text-xs">#{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Date</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-luxury-black/40" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-gold/10 text-gold px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold">
                      {order.status}
                    </span>
                    <p className="text-xl font-bold">Rs. {order.total_amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-luxury-cream flex-shrink-0">
                        <img src={item.products?.image_url} alt={item.products?.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-serif text-lg">{item.products?.name}</h4>
                        <p className="text-xs text-luxury-black/40 uppercase tracking-widest">{item.size} | Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">Rs. {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 flex justify-end">
                  <button className="text-gold text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Track Shipment <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
