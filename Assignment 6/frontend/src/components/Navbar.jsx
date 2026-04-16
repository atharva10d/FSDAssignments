import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { ShoppingBag, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Add shadow/bg on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShopDropdown(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (err) { /* swallow */ }
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' },
  ];

  const shopLinks = [
    { label: 'Men', path: '/shop/men' },
    { label: 'Women', path: '/shop/women' },
    { label: 'Accessories', path: '/shop/accessories' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#121212]/95 backdrop-blur-md shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-2xl font-bold tracking-[0.3em] text-[#FAFAFA] uppercase">
            AZ
          </span>
          <span className="text-[10px] font-light tracking-[0.5em] text-[#D4AF37] uppercase">
            Apparel
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdown(true)}
            onMouseLeave={() => setShopDropdown(false)}
          >
            <button className="flex items-center gap-1 text-sm tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300">
              Shop <ChevronDown size={14} className={`transition-transform duration-300 ${shopDropdown ? 'rotate-180' : ''}`} />
            </button>
            {shopDropdown && (
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 w-40 z-50 animate-fade-in">
                <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-sm shadow-2xl py-2">
                  {shopLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-5 py-2.5 text-sm tracking-widest uppercase text-[#FAFAFA]/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#121212] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Links */}
          {userInfo ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300"
              >
                <User size={16} />
                {userInfo.name.split(' ')[0]}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm tracking-widest uppercase text-[#FAFAFA]/60 hover:text-red-400 transition-colors duration-300"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm tracking-widest uppercase bg-[#D4AF37] text-[#121212] px-4 py-2 font-semibold hover:bg-[#c49f30] transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#FAFAFA] hover:text-[#D4AF37] transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#121212]/98 backdrop-blur-md border-t border-[#D4AF37]/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37] transition-colors">
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#D4AF37]/10 pt-4">
            <p className="text-xs tracking-widest uppercase text-[#D4AF37] mb-3">Shop</p>
            {shopLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block py-2 text-sm tracking-widest uppercase text-[#FAFAFA]/70 hover:text-[#D4AF37] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#D4AF37]/10 pt-4">
            {userInfo ? (
              <>
                <Link to="/profile" className="block py-2 text-sm tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37]">
                  My Profile
                </Link>
                <button onClick={handleLogout} className="block py-2 text-sm tracking-widest uppercase text-red-400">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-sm tracking-widest uppercase text-[#FAFAFA]/80 hover:text-[#D4AF37]">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-sm tracking-widest uppercase text-[#D4AF37]">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
