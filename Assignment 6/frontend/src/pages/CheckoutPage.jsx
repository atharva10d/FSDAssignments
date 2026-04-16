import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';
import axiosInstance from '../api/axiosInstance';
import {
  CreditCard, MapPin, Lock, CheckCircle2, ChevronRight, Package
} from 'lucide-react';

// ── Step Indicator ────────────────────────────────────────────────────────────
const StepIndicator = ({ current }) => {
  const steps = ['Shipping', 'Payment', 'Confirm'];
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-colors ${
            i < current
              ? 'text-green-500'
              : i === current
              ? 'text-[#D4AF37]'
              : 'text-[#121212]/30'
          }`}>
            {i < current ? <CheckCircle2 size={14} /> : <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px]">{i + 1}</span>}
            {step}
          </div>
          {i < steps.length - 1 && <ChevronRight size={14} className="text-[#121212]/20" />}
        </div>
      ))}
    </div>
  );
};

// ── Input Field ───────────────────────────────────────────────────────────────
const FormField = ({ label, id, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs tracking-[0.3em] uppercase text-[#121212]/60 font-medium">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="bg-white border border-[#121212]/15 text-[#121212] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder:text-[#121212]/25 w-full"
    />
  </div>
);

// ──────────────────────────────────────────────────────────────────────────────

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [step, setStep] = useState(0); // 0=Shipping, 1=Payment, 2=Processing/Success
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const [shipping, setShipping] = useState({
    address: '', city: '', postalCode: '', country: 'India',
  });

  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingCost = subtotal > 2000 ? 0 : 199;
  const total = subtotal + shippingCost;

  // ── Shipping Step Handler ─────────────────────────────────────────────────
  const handleShippingNext = (e) => {
    e.preventDefault();
    setStep(1);
  };

  // ── Payment & Place Order ─────────────────────────────────────────────────
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    // Simulate payment gateway delay
    await new Promise((res) => setTimeout(res, 2500));

    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        product: item._id,
      }));

      const { data } = await axiosInstance.post('/orders', {
        orderItems,
        shippingAddress: shipping,
        totalPrice: total,
      });

      setOrderId(data._id);
      dispatch(clearCart());
      setStep(2);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
      setStep(1);
    } finally {
      setProcessing(false);
    }
  };

  // ── Format card number with spaces ───────────────────────────────────────
  const formatCardNum = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val) =>
    val.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');

  // ── Processing Overlay ────────────────────────────────────────────────────
  if (processing) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock size={20} className="text-[#D4AF37]" />
          </div>
        </div>
        <p className="text-xl font-bold tracking-[0.3em] uppercase text-[#FAFAFA]">
          Securing Payment
        </p>
        <p className="text-sm text-[#FAFAFA]/50 tracking-widest">
          Please do not close this window...
        </p>
      </div>
    );
  }

  // ── Order Success Screen ──────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center gap-6 px-6 pt-20">
        <div className="w-20 h-20 bg-green-50 border border-green-200 flex items-center justify-center">
          <CheckCircle2 size={36} className="text-green-500" />
        </div>
        <div className="text-center">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-2">Payment Successful</p>
          <h1 className="text-3xl font-bold text-[#121212] tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-sm text-[#121212]/50 max-w-sm mx-auto leading-relaxed">
            Thank you for shopping with AZ Apparel. Your order has been placed and is being processed.
          </p>
        </div>

        {orderId && (
          <div className="bg-white border border-[#121212]/10 px-8 py-4 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-1">Order ID</p>
            <p className="text-sm font-mono font-semibold text-[#121212] break-all">{orderId}</p>
          </div>
        )}

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 bg-[#121212] text-[#FAFAFA] px-6 py-3.5 text-sm tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
          >
            <Package size={15} /> Track Order
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border border-[#121212]/20 text-[#121212] px-6 py-3.5 text-sm tracking-widest uppercase font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Main Checkout Layout ──────────────────────────────────────────────────
  return (
    <div className="bg-[#f5f5f5] min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">Almost There</p>
          <h1 className="text-3xl font-bold text-[#121212] tracking-tight">Secure Checkout</h1>
        </div>

        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Form Panel ── */}
          <div className="lg:col-span-2">
            {error && (
              <div className="mb-4 px-4 py-3 border border-red-500/40 bg-red-500/10 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* STEP 0 — Shipping */}
            {step === 0 && (
              <form onSubmit={handleShippingNext} className="bg-white border border-[#121212]/10 p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#121212]/10">
                  <MapPin size={18} className="text-[#D4AF37]" />
                  <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#121212]">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <FormField
                      label="Street Address"
                      id="checkout-address"
                      required
                      placeholder="123, MG Road, Apartment 4B"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    />
                  </div>
                  <FormField
                    label="City"
                    id="checkout-city"
                    required
                    placeholder="Pune"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  />
                  <FormField
                    label="PIN Code"
                    id="checkout-pincode"
                    required
                    placeholder="411044"
                    maxLength={6}
                    value={shipping.postalCode}
                    onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value.replace(/\D/g, '') })}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      label="Country"
                      id="checkout-country"
                      required
                      value={shipping.country}
                      onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="shipping-continue"
                  className="mt-8 w-full flex items-center justify-center gap-3 bg-[#121212] text-[#FAFAFA] py-4 text-sm tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
                >
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </form>
            )}

            {/* STEP 1 — Payment */}
            {step === 1 && (
              <form onSubmit={handlePlaceOrder} className="bg-white border border-[#121212]/10 p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#121212]/10">
                  <CreditCard size={18} className="text-[#D4AF37]" />
                  <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#121212]">
                    Card Details
                  </h2>
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-600">
                    <Lock size={11} /> SSL Secured
                  </span>
                </div>

                {/* Mock Card Preview */}
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-lg p-6 mb-8 h-40 overflow-hidden">
                  <div className="absolute top-4 right-4 opacity-20 text-[#FAFAFA] text-5xl font-bold tracking-widest">AZ</div>
                  <p className="text-[#FAFAFA]/40 text-xs tracking-[0.4em] uppercase mb-4">AZ Apparel Secure Pay</p>
                  <p className="text-[#FAFAFA] text-lg tracking-[0.25em] font-mono mb-4">
                    {payment.cardNumber || '•••• •••• •••• ••••'}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[#FAFAFA]/40 text-[10px] uppercase tracking-widest">Card Holder</p>
                      <p className="text-[#FAFAFA] text-sm tracking-widest uppercase">
                        {payment.cardName || 'YOUR NAME'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#FAFAFA]/40 text-[10px] uppercase tracking-widest">Expires</p>
                      <p className="text-[#D4AF37] text-sm tracking-widest">
                        {payment.expiry || 'MM/YY'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <FormField
                      label="Name on Card"
                      id="payment-card-name"
                      required
                      placeholder="Atharva Gajanan Zope"
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormField
                      label="Card Number"
                      id="payment-card-number"
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNum(e.target.value) })}
                    />
                  </div>
                  <FormField
                    label="Expiry Date"
                    id="payment-expiry"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                  />
                  <FormField
                    label="CVV"
                    id="payment-cvv"
                    required
                    placeholder="•••"
                    maxLength={3}
                    type="password"
                    value={payment.cvv}
                    onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                  />
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 border border-[#121212]/20 text-[#121212] py-3.5 text-xs tracking-widest uppercase font-semibold hover:border-[#121212] transition-border duration-300"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    id="pay-now-btn"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-[#121212] py-3.5 text-sm tracking-widest uppercase font-bold hover:bg-[#c49f30] transition-colors duration-300"
                  >
                    <Lock size={14} />
                    Pay ₹{total.toLocaleString('en-IN')}
                  </button>
                </div>

                <p className="text-center text-xs text-[#121212]/30 tracking-wide mt-4">
                  🔒 This is a simulated payment. No real transaction occurs.
                </p>
              </form>
            )}
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#121212]/10 p-6 sticky top-28">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#121212] mb-5 pb-4 border-b border-[#121212]/10">
                Your Order ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h3>
              <div className="flex flex-col gap-4 mb-5 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-3 items-start">
                    <div className="w-14 h-16 bg-[#f0f0f0] shrink-0 overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#121212] leading-snug">{item.name}</p>
                      <p className="text-[10px] text-[#121212]/40 mt-0.5">Qty: {item.qty}</p>
                    </div>
                    <p className="text-xs font-bold text-[#121212] shrink-0">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#121212]/10 pt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#121212]/50">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#121212]/50">Shipping</span>
                  <span className="font-semibold text-green-600">
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-[#121212]/10">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
