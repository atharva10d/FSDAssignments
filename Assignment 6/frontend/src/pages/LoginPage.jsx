import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { setCredentials } from '../store/authSlice';
import axiosInstance from '../api/axiosInstance';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/login', formData);
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85"
          alt="AZ Apparel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/70 via-[#121212]/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-14 gap-3">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37]">Welcome Back</p>
          <h2 className="text-4xl font-bold text-[#FAFAFA] leading-tight">
            Your style.<br />Your story.
          </h2>
          <p className="text-[#FAFAFA]/60 text-sm leading-relaxed max-w-xs">
            Sign in to access your exclusive wardrobe, track orders, and discover new arrivals curated just for you.
          </p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* AZ Logo */}
          <Link to="/" className="flex flex-col leading-none mb-10">
            <span className="text-3xl font-bold tracking-[0.3em] text-[#FAFAFA] uppercase">AZ</span>
            <span className="text-[10px] font-light tracking-[0.5em] text-[#D4AF37] uppercase">Apparel</span>
          </Link>

          <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight mb-1">Sign In</h1>
          <p className="text-sm text-[#FAFAFA]/50 mb-8 tracking-wide">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#D4AF37] hover:underline">
              Create one
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/40 bg-red-500/10 text-red-400 text-sm tracking-wide rounded-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.3em] uppercase text-[#FAFAFA]/70">Email Address</label>
              <input
                type="email"
                name="email"
                id="login-email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-[#1a1a1a] border border-[#FAFAFA]/10 text-[#FAFAFA] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder:text-[#FAFAFA]/20"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.3em] uppercase text-[#FAFAFA]/70">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="login-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-[#FAFAFA]/10 text-[#FAFAFA] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder:text-[#FAFAFA]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FAFAFA]/40 hover:text-[#D4AF37] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="flex items-center justify-center gap-3 mt-2 bg-[#D4AF37] text-[#121212] px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-[#c49f30] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#121212]/30 border-t-[#121212] rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-[#FAFAFA]/20 tracking-widest mt-10 text-center uppercase">
            AZ Apparel &mdash; Crafted by Atharva Gajanan Zope
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
