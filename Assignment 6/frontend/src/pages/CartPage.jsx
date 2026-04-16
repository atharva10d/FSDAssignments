import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQty, clearCart } from '../store/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center gap-6 pt-20">
        <div className="w-20 h-20 border border-[#D4AF37]/30 flex items-center justify-center">
          <ShoppingBag size={32} className="text-[#D4AF37]" />
        </div>
        <h1 className="text-2xl font-bold text-[#121212] tracking-tight">Your Bag is Empty</h1>
        <p className="text-sm text-[#121212]/50 tracking-wide">
          Discover our curated collections and add something extraordinary.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-[#121212] text-[#FAFAFA] px-8 py-3.5 text-sm tracking-widest uppercase font-semibold hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
        >
          Start Shopping <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">Your Selection</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight">Shopping Bag</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 flex flex-col gap-0 divide-y divide-[#121212]/10">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-5 py-6 first:pt-0">
                {/* Product Image */}
                <div className="w-24 h-32 md:w-32 md:h-40 bg-[#f0f0f0] overflow-hidden shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-1">{item.category}</p>
                    <h3 className="text-sm md:text-base font-semibold text-[#121212] tracking-wide">{item.name}</h3>
                    <p className="text-sm font-bold text-[#121212] mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Qty Controls */}
                    <div className="flex items-center border border-[#121212]/20">
                      <button
                        onClick={() =>
                          item.qty > 1
                            ? dispatch(updateQty({ id: item._id, qty: item.qty - 1 }))
                            : dispatch(removeFromCart(item._id))
                        }
                        className="w-8 h-8 flex items-center justify-center text-[#121212]/60 hover:text-[#121212] hover:bg-[#121212]/5 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#121212]">{item.qty}</span>
                      <button
                        onClick={() => dispatch(updateQty({ id: item._id, qty: item.qty + 1 }))}
                        className="w-8 h-8 flex items-center justify-center text-[#121212]/60 hover:text-[#121212] hover:bg-[#121212]/5 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Line Total + Remove */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-[#121212]">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-[#121212]/30 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="pt-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs tracking-widest uppercase text-[#121212]/40 hover:text-red-500 transition-colors"
              >
                Clear Bag
              </button>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#121212]/10 p-8 sticky top-28">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#121212] mb-6 pb-4 border-b border-[#121212]/10">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-[#121212]/60">Subtotal</span>
                  <span className="font-semibold text-[#121212]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#121212]/60">Shipping</span>
                  <span className="font-semibold text-[#121212]">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#D4AF37]">
                    Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center text-base font-bold text-[#121212] pt-4 border-t border-[#121212]/10 mb-6">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={handleCheckout}
                id="proceed-to-checkout"
                className="w-full flex items-center justify-center gap-3 bg-[#121212] text-[#FAFAFA] py-4 text-sm tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
              >
                Proceed to Checkout <ArrowRight size={15} />
              </button>

              {!userInfo && (
                <p className="text-xs text-center text-[#121212]/40 mt-3 tracking-wide">
                  You'll be asked to sign in before paying.
                </p>
              )}

              <Link
                to="/"
                className="block text-center mt-4 text-xs tracking-widest uppercase text-[#121212]/40 hover:text-[#D4AF37] transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
