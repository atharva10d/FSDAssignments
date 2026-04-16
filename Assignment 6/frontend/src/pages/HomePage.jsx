import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, RefreshCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

// ─── Product Data (Embedded) ─────────────────────────────────────────────────
const featuredProducts = [
  {
    _id: 'f1',
    name: 'Luxe Linen Blazer',
    category: 'men',
    price: 8499,
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
    description: 'Tailored Italian linen blazer for effortless refinement.',
  },
  {
    _id: 'f2',
    name: 'Silk Evening Drape',
    category: 'women',
    price: 11299,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    description: 'Floor-sweeping silk dress with a fluid, editorial silhouette.',
  },
  {
    _id: 'f3',
    name: 'Artisan Leather Tote',
    category: 'accessories',
    price: 6799,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    description: 'Hand-stitched full-grain leather tote. Ageless investment.',
  },
  {
    _id: 'f4',
    name: 'Merino Turtleneck',
    category: 'men',
    price: 4599,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    description: 'Superfine merino wool in a classic ribbed turtleneck cut.',
  },
];

const categories = [
  {
    label: "Men's",
    path: '/shop/men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    subtitle: 'Structured. Sharp. Singular.',
  },
  {
    label: "Women's",
    path: '/shop/women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    subtitle: 'Fluid. Fierce. Feminine.',
  },
  {
    label: 'Accessories',
    path: '/shop/accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    subtitle: 'The details that define you.',
  },
];

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On all orders above ₹2,000' },
  { icon: Shield, title: 'Secure Payments', desc: '100% safe & encrypted checkout' },
  { icon: RefreshCcw, title: '30-Day Returns', desc: 'Hassle-free return policy' },
  { icon: Star, title: 'Premium Quality', desc: 'Curated luxury materials only' },
];

// ─── Product Card Component ───────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="group relative bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#121212]/0 group-hover:bg-[#121212]/20 transition-all duration-500" />
        <button
          onClick={() => dispatch(addToCart(product))}
          className="absolute bottom-0 left-0 right-0 bg-[#121212] text-[#FAFAFA] text-xs tracking-[0.3em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 hover:bg-[#D4AF37] hover:text-[#121212] font-semibold"
        >
          Add to Cart
        </button>
      </div>
      <div className="p-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-[#121212] tracking-wide mb-1">{product.name}</h3>
        <p className="text-base font-bold text-[#121212]">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};

// ─── HomePage ────────────────────────────────────────────────────────────────
const HomePage = () => {
  return (
    <div className="bg-[#FAFAFA]">

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90"
          alt="AZ Apparel Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/85 via-[#121212]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] animate-fade-in">
              New Collection — Spring/Summer 2026
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-[#FAFAFA] leading-tight tracking-tight max-w-2xl">
              Wear Your<br />
              <span className="text-[#D4AF37]">Legacy.</span>
            </h1>
            <p className="text-[#FAFAFA]/70 text-lg max-w-md leading-relaxed mt-2">
              Premium fashion, curated for those who refuse to be ordinary. Designed in Pune. Worn by the world.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop/men"
              className="flex items-center gap-3 bg-[#D4AF37] text-[#121212] px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-[#c49f30] transition-colors duration-300"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop/women"
              className="flex items-center gap-3 border border-[#FAFAFA] text-[#FAFAFA] px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#FAFAFA] hover:text-[#121212] transition-all duration-300"
            >
              Women's Edit
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Banners ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-2">Explore</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className="group relative overflow-hidden aspect-[3/4]"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-[#121212]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-1">
                <p className="text-xs tracking-[0.4em] uppercase text-[#D4AF37]">{cat.subtitle}</p>
                <h3 className="text-2xl font-bold text-[#FAFAFA] tracking-wide">{cat.label}</h3>
                <span className="flex items-center gap-2 text-xs text-[#FAFAFA]/70 tracking-widest uppercase mt-1 group-hover:text-[#D4AF37] transition-colors">
                  Shop Collection <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="bg-[#f5f5f5] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-2">Handpicked</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight">Featured Pieces</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section className="bg-[#121212] py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 border border-[#D4AF37]/40 flex items-center justify-center">
                <Icon size={20} className="text-[#D4AF37]" />
              </div>
              <h4 className="text-sm font-semibold text-[#FAFAFA] tracking-widest uppercase">{title}</h4>
              <p className="text-xs text-[#FAFAFA]/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Editorial Banner ── */}
      <section className="relative h-[50vh] overflow-hidden flex items-center">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
          alt="Editorial Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#121212]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full flex flex-col items-center gap-5">
          <p className="text-xs tracking-[0.6em] uppercase text-[#D4AF37]">Limited Edition — SS26</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight max-w-xl">
            Timeless Luxury, Modern Edge.
          </h2>
          <Link
            to="/shop/women"
            className="mt-2 border border-[#D4AF37] text-[#D4AF37] px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
          >
            Explore Women's Edit
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
