import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import axiosInstance from '../api/axiosInstance';
import {
  Package, Clock, CheckCircle2, Truck, User, LogOut,
  ChevronDown, ChevronUp, ShoppingBag, CalendarDays
} from 'lucide-react';

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ isPaid, isDelivered }) => {
  if (isDelivered) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1 bg-green-50 text-green-600 border border-green-200">
        <CheckCircle2 size={11} /> Delivered
      </span>
    );
  }
  if (isPaid) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200">
        <Truck size={11} /> Processing
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200">
      <Clock size={11} /> Pending
    </span>
  );
};

// ── Order Card ────────────────────────────────────────────────────────────────
const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-white border border-[#121212]/10 overflow-hidden transition-all duration-300">
      {/* Order Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 p-5 cursor-pointer hover:bg-[#f9f9f9] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#f5f5f5] flex items-center justify-center shrink-0">
            <Package size={18} className="text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-0.5">Order ID</p>
            <p className="text-xs font-mono font-semibold text-[#121212] break-all">
              #{order._id.slice(-10).toUpperCase()}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-[#121212]/40 mt-1">
              <CalendarDays size={11} /> {orderDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <StatusBadge isPaid={order.isPaid} isDelivered={order.isDelivered} />
          <div className="text-right">
            <p className="text-xs text-[#121212]/40 tracking-widest uppercase">Total</p>
            <p className="text-base font-bold text-[#121212]">
              ₹{order.totalPrice.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-[#121212]/30">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>

      {/* Expanded Order Items */}
      {expanded && (
        <div className="border-t border-[#121212]/10 px-5 py-5 bg-[#fafafa]">
          {/* Live Status Timeline */}
          <div className="mb-6">
            <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-3">Order Status</p>
            <div className="flex items-center gap-0">
              {[
                { label: 'Order Placed', done: true },
                { label: 'Payment Confirmed', done: order.isPaid },
                { label: 'Shipped', done: order.isDelivered },
                { label: 'Delivered', done: order.isDelivered },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                      s.done ? 'bg-[#D4AF37] border-[#D4AF37]' : 'bg-white border-[#121212]/20'
                    }`} />
                    <p className={`text-[9px] tracking-wider uppercase whitespace-nowrap ${
                      s.done ? 'text-[#D4AF37] font-semibold' : 'text-[#121212]/30'
                    }`}>
                      {s.label}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-1 mb-4 transition-colors ${
                      arr[i + 1].done ? 'bg-[#D4AF37]' : 'bg-[#121212]/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Items List */}
          <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-3">Items Ordered</p>
          <div className="flex flex-col gap-3">
            {order.orderItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-[#121212]/5 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-[#121212]">{item.name}</p>
                  <p className="text-xs text-[#121212]/40 mt-0.5">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-bold text-[#121212]">
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mt-4 pt-4 border-t border-[#121212]/10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-1">Ship to</p>
            <p className="text-sm text-[#121212]/70">
              {order.shippingAddress.address}, {order.shippingAddress.city} – {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ProfilePage ───────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        setError('Could not load your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo, navigate]);

  const handleLogout = async () => {
    try { await axiosInstance.post('/auth/logout'); } catch (_) {}
    dispatch(logout());
    navigate('/login');
  };

  if (!userInfo) return null;

  return (
    <div className="bg-[#f5f5f5] min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Profile Header ── */}
        <div className="bg-[#121212] p-8 md:p-10 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
              <User size={28} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">Member Profile</p>
              <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">{userInfo.name}</h1>
              <p className="text-sm text-[#FAFAFA]/50 mt-0.5">{userInfo.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[#FAFAFA]/20 text-[#FAFAFA]/60 px-5 py-2.5 text-xs tracking-widest uppercase hover:border-red-500/50 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>

        {/* ── Order Stats ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
            { label: 'Processing', value: orders.filter(o => o.isPaid && !o.isDelivered).length, icon: Truck },
            { label: 'Delivered', value: orders.filter(o => o.isDelivered).length, icon: CheckCircle2 },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white border border-[#121212]/10 p-5 flex flex-col gap-2">
              <Icon size={18} className="text-[#D4AF37]" />
              <p className="text-2xl font-bold text-[#121212]">{value}</p>
              <p className="text-xs tracking-widest uppercase text-[#121212]/40">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Orders List ── */}
        <div>
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#121212] mb-5">
            Order History
          </h2>

          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="px-5 py-4 border border-red-300 bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="bg-white border border-[#121212]/10 p-12 flex flex-col items-center gap-4 text-center">
              <Package size={32} className="text-[#D4AF37]/50" />
              <p className="text-sm text-[#121212]/50 tracking-wide">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/')}
                className="text-xs tracking-widest uppercase text-[#D4AF37] hover:underline"
              >
                Start Shopping →
              </button>
            </div>
          )}

          {!loading && orders.length > 0 && (
            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
