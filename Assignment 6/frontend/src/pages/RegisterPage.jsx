import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { setCredentials } from '../store/authSlice';
import axiosInstance from '../api/axiosInstance';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85"
          alt="AZ Apparel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/70 via-[#121212]/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-14 gap-3">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37]">Join AZ Apparel</p>
          <h2 className="text-4xl font-bold text-[#FAFAFA] leading-tight">
            Begin your<br />style journey.
          </h2>
          <p className="text-[#FAFAFA]/60 text-sm leading-relaxed max-w-xs">
            Create your account and unlock a world of premium fashion, exclusive offers, and a personalised wardrobe.
          </p>
        </div>
      </div>

      {/* Right — Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* AZ Logo */}
          <Link to="/" className="flex flex-col leading-none mb-10">
            <span className="text-3xl font-bold tracking-[0.3em] text-[#FAFAFA] uppercase">AZ</span>
            <span className="text-[10px] font-light tracking-[0.5em] text-[#D4AF37] uppercase">Apparel</span>
          </Link>

          <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight mb-1">Create Account</h1>
          <p className="text-sm text-[#FAFAFA]/50 mb-8 tracking-wide">
            Already have an account?{' '}
            <Link to="/login" className="text-[#D4AF37] hover:underline">
              Sign in
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 border border-red-500/40 bg-red-500/10 text-red-400 text-sm tracking-wide rounded-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.3em] uppercase text-[#FAFAFA]/70">Full Name</label>
              <input
                type="text"
                name="name"
                id="register-name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Atharva Zope"
                className="bg-[#1a1a1a] border border-[#FAFAFA]/10 text-[#FAFAFA] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder:text-[#FAFAFA]/20"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.3em] uppercase text-[#FAFAFA]/70">Email Address</label>
              <input
                type="email"
                name="email"
                id="register-email"
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
                  id="register-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-[0.3em] uppercase text-[#FAFAFA]/70">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="register-confirm-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="bg-[#1a1a1a] border border-[#FAFAFA]/10 text-[#FAFAFA] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder:text-[#FAFAFA]/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="register-submit"
              disabled={loading}
              className="flex items-center justify-center gap-3 mt-2 bg-[#D4AF37] text-[#121212] px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-[#c49f30] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#121212]/30 border-t-[#121212] rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={16} /> Create Account
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

export default RegisterPage;
