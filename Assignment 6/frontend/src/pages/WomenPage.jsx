import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingBag } from 'lucide-react';

const womenProducts = [
  { _id: 'w1', name: 'Silk Evening Drape', category: 'women', price: 11299, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', description: 'Floor-sweeping silk dress with a fluid, editorial silhouette.' },
  { _id: 'w2', name: 'Linen Co-ord Set', category: 'women', price: 6499, imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', description: 'Matching linen blazer and trouser set for the modern woman.' },
  { _id: 'w3', name: 'Structured Knit Dress', category: 'women', price: 8799, imageUrl: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80', description: 'A body-hugging ribbed knit dress that speaks volumes.' },
  { _id: 'w4', name: 'Wrap Midi Skirt', category: 'women', price: 4299, imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', description: 'Flowy wrap skirt in premium viscose — effortlessly chic.' },
  { _id: 'w5', name: 'Printed Satin Blouse', category: 'women', price: 3799, imageUrl: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80', description: 'Lightweight satin blouse with a subtle, artisanal print.' },
  { _id: 'w6', name: 'Tailored Wide-Leg Pant', category: 'women', price: 5499, imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80', description: 'Wide-leg palazzo trousers tailored for the boardroom or beyond.' },
  { _id: 'w7', name: 'Cashmere Longline Coat', category: 'women', price: 16999, imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80', description: 'A statement cashmere coat that defines every silhouette.' },
  { _id: 'w8', name: 'Off-Shoulder Lace Top', category: 'women', price: 3299, imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', description: 'Delicate off-shoulder lace top for romantic evenings.' },
];

const WomenPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85"
          alt="Women's Collection"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-[#121212]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">AZ Apparel</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight">Women's Collection</h1>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/50">{womenProducts.length} Products</p>
          <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/50">Spring / Summer 2026</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {womenProducts.map((product) => (
            <div key={product._id} className="group bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#121212]/0 group-hover:bg-[#121212]/10 transition-all duration-500" />
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-[#121212] text-[#FAFAFA] text-xs tracking-[0.3em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#D4AF37] hover:text-[#121212] font-semibold"
                >
                  <ShoppingBag size={13} /> Add to Cart
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[#121212] tracking-wide mb-1">{product.name}</h3>
                <p className="text-xs text-[#121212]/50 mb-2 leading-relaxed">{product.description}</p>
                <p className="text-base font-bold text-[#121212]">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenPage;
