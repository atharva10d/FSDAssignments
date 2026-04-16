import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingBag } from 'lucide-react';

const accessoriesProducts = [
  { _id: 'a1', name: 'Artisan Leather Tote', category: 'accessories', price: 6799, imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', description: 'Hand-stitched full-grain leather tote. Ageless investment.' },
  { _id: 'a2', name: 'Silk Scarf', category: 'accessories', price: 2499, imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', description: 'Hand-painted pure silk scarf, a canvas you can wear.' },
  { _id: 'a3', name: 'Minimalist Watch', category: 'accessories', price: 18499, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', description: 'Swiss-movement minimalist watch with a brushed steel case.' },
  { _id: 'a4', name: 'Gold-Plated Necklace', category: 'accessories', price: 3299, imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', description: 'Delicate 18K gold-plated layering necklace.' },
  { _id: 'a5', name: 'Leather Belt', category: 'accessories', price: 2799, imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', description: 'Full-grain leather belt with a polished gunmetal buckle.' },
  { _id: 'a6', name: 'Sunglasses', category: 'accessories', price: 4999, imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', description: 'UV400 Italian acetate frames — vintage-modern luxury.' },
  { _id: 'a7', name: 'Canvas Backpack', category: 'accessories', price: 3999, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', description: 'Wax-coated canvas backpack with leather trim accents.' },
  { _id: 'a8', name: 'Beaded Bracelet Set', category: 'accessories', price: 1799, imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80', description: 'Premium gemstone bead bracelets — energy and elegance.' },
];

const AccessoriesPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&q=85"
          alt="Accessories Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-[#121212]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">AZ Apparel</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight">Accessories</h1>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/50">{accessoriesProducts.length} Products</p>
          <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/50">The Details That Define You</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {accessoriesProducts.map((product) => (
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

export default AccessoriesPage;
