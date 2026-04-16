import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingBag } from 'lucide-react';

const menProducts = [
  { _id: 'm1', name: 'Luxe Linen Blazer', category: 'men', price: 8499, imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80', description: 'Tailored Italian linen blazer for effortless refinement.' },
  { _id: 'm2', name: 'Merino Turtleneck', category: 'men', price: 4599, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', description: 'Superfine merino wool in a classic ribbed turtleneck cut.' },
  { _id: 'm3', name: 'Slim Chino Trousers', category: 'men', price: 3799, imageUrl: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80', description: 'Stretch-cotton chinos with a precise, tapered silhouette.' },
  { _id: 'm4', name: 'Oxford Button-Down', category: 'men', price: 2999, imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', description: 'Crisp Oxford cotton shirt, effortlessly formal or casual.' },
  { _id: 'm5', name: 'Cashmere Crew Knit', category: 'men', price: 7299, imageUrl: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&q=80', description: 'Pure cashmere crewneck — warmth without compromise.' },
  { _id: 'm6', name: 'Structured Overcoat', category: 'men', price: 13999, imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80', description: 'Wool-blend structured coat, the cornerstone of any wardrobe.' },
  { _id: 'm7', name: 'Relaxed Linen Shirt', category: 'men', price: 3299, imageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80', description: 'Breathable linen shirt for warm-weather elegance.' },
  { _id: 'm8', name: 'Premium Jogger Set', category: 'men', price: 5499, imageUrl: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=600&q=80', description: 'Elevated French terry jogger and hoodie co-ord set.' },
];

const MenPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600&q=85"
          alt="Men's Collection"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-[#121212]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">AZ Apparel</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight">Men's Collection</h1>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/50">{menProducts.length} Products</p>
          <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/50">Spring / Summer 2026</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {menProducts.map((product) => (
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

export default MenPage;
