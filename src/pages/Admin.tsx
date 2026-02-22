import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Package, MessageSquare, ShoppingCart, Trash2, CheckCircle } from 'lucide-react';

export default function Admin() {
  const { user, profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'reviews' | 'orders'>('users');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.is_admin) {
      fetchData();
    }
  }, [profile, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    let query;
    switch (activeTab) {
      case 'users':
        query = supabase.from('profiles').select('*');
        break;
      case 'products':
        query = supabase.from('products').select('*, product_sizes(*)');
        break;
      case 'reviews':
        query = supabase.from('reviews').select('*, products(name)');
        break;
      case 'orders':
        query = supabase.from('orders').select('*, profiles(full_name)');
        break;
    }

    const { data: result, error } = await query!;
    if (!error) setData(result);
    setLoading(false);
  };

  if (authLoading) return <div className="pt-32 text-center">Loading...</div>;
  if (!user || !profile?.is_admin) return <Navigate to="/auth" />;

  return (
    <div className="pt-32 pb-24 bg-luxury-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif mb-12">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <button 
            onClick={() => setActiveTab('users')}
            className={`p-8 rounded-[32px] luxury-shadow flex flex-col items-center gap-4 transition-all ${activeTab === 'users' ? 'bg-luxury-black text-white' : 'bg-white text-luxury-black hover:bg-gold/5'}`}
          >
            <Users size={32} />
            <span className="uppercase tracking-widest text-xs font-bold">Users</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`p-8 rounded-[32px] luxury-shadow flex flex-col items-center gap-4 transition-all ${activeTab === 'products' ? 'bg-luxury-black text-white' : 'bg-white text-luxury-black hover:bg-gold/5'}`}
          >
            <Package size={32} />
            <span className="uppercase tracking-widest text-xs font-bold">Products</span>
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`p-8 rounded-[32px] luxury-shadow flex flex-col items-center gap-4 transition-all ${activeTab === 'reviews' ? 'bg-luxury-black text-white' : 'bg-white text-luxury-black hover:bg-gold/5'}`}
          >
            <MessageSquare size={32} />
            <span className="uppercase tracking-widest text-xs font-bold">Reviews</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`p-8 rounded-[32px] luxury-shadow flex flex-col items-center gap-4 transition-all ${activeTab === 'orders' ? 'bg-luxury-black text-white' : 'bg-white text-luxury-black hover:bg-gold/5'}`}
          >
            <ShoppingCart size={32} />
            <span className="uppercase tracking-widest text-xs font-bold">Orders</span>
          </button>
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-12 luxury-shadow overflow-x-auto">
          {loading ? (
            <div className="text-center py-20 italic text-luxury-black/40">Fetching data...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/5">
                  {activeTab === 'users' && (
                    <>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Name</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Admin</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Actions</th>
                    </>
                  )}
                  {activeTab === 'products' && (
                    <>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Product</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Brand</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Category</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Actions</th>
                    </>
                  )}
                  {activeTab === 'reviews' && (
                    <>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">User</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Product</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Rating</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Comment</th>
                    </>
                  )}
                  {activeTab === 'orders' && (
                    <>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Order ID</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Customer</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Total</th>
                      <th className="pb-4 uppercase tracking-widest text-[10px] text-gold font-bold">Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {data.map((item) => (
                  <tr key={item.id} className="group">
                    {activeTab === 'users' && (
                      <>
                        <td className="py-6 font-serif">{item.full_name}</td>
                        <td className="py-6">{item.is_admin ? <CheckCircle className="text-green-500" size={16} /> : '-'}</td>
                        <td className="py-6"><button className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></td>
                      </>
                    )}
                    {activeTab === 'products' && (
                      <>
                        <td className="py-6 font-serif">{item.name}</td>
                        <td className="py-6 text-sm">{item.brand}</td>
                        <td className="py-6 text-sm">{item.category}</td>
                        <td className="py-6"><button className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></td>
                      </>
                    )}
                    {activeTab === 'reviews' && (
                      <>
                        <td className="py-6 font-serif">{item.user_name}</td>
                        <td className="py-6 text-sm">{item.products?.name}</td>
                        <td className="py-6 text-gold font-bold">{item.rating}/5</td>
                        <td className="py-6 text-sm text-luxury-black/60 italic">"{item.comment}"</td>
                      </>
                    )}
                    {activeTab === 'orders' && (
                      <>
                        <td className="py-6 font-mono text-xs">{item.id.slice(0, 8)}...</td>
                        <td className="py-6 font-serif">{item.profiles?.full_name}</td>
                        <td className="py-6 font-bold">Rs. {item.total_amount.toLocaleString()}</td>
                        <td className="py-6"><span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">{item.status}</span></td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
