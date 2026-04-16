import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare, Lightbulb, HelpCircle } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', improvements: '', doubts: '', suggestions: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/feedback', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', improvements: '', doubts: '', suggestions: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">

      {/* ── Hero Banner ── */}
      <div className="relative h-56 md:h-72 overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=85"
          alt="Contact AZ Apparel"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-[#121212]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">We're Listening</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight">Contact & Feedback</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ── Contact Info Panel ── */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div>
            <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-2">Get In Touch</p>
            <h2 className="text-2xl font-bold text-[#121212] tracking-tight mb-3">
              We Value Your Voice
            </h2>
            <p className="text-sm text-[#121212]/60 leading-relaxed">
              Share your thoughts, doubts, or suggestions — your feedback shapes the AZ Apparel experience. We read every submission personally.
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-0.5">Headquarters</p>
                <p className="text-sm text-[#121212]/70 leading-relaxed">
                  Near Thergaon, Pimpri-Chinchwad (PCMC),<br />Pune, Maharashtra, India.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-0.5">Email</p>
                <a href="mailto:contact@azapparel.in" className="text-sm text-[#121212]/70 hover:text-[#D4AF37] transition-colors">
                  contact@azapparel.in
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#121212]/40 mb-0.5">Phone</p>
                <p className="text-sm text-[#121212]/70">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* What to expect */}
          <div className="bg-[#121212] p-6 flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">What you can share</p>
            {[
              { icon: Lightbulb, label: 'Improvements', desc: 'Tell us what we can do better.' },
              { icon: HelpCircle, label: 'Doubts', desc: 'Ask anything about our products.' },
              { icon: MessageSquare, label: 'Suggestions', desc: 'Ideas for new styles or features.' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex gap-3 items-start">
                <Icon size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#FAFAFA] tracking-widest uppercase">{label}</p>
                  <p className="text-xs text-[#FAFAFA]/40 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Feedback Form ── */}
        <div className="lg:col-span-2">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center gap-5 bg-white border border-[#121212]/10 p-12 text-center">
              <div className="w-16 h-16 bg-green-50 border border-green-200 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-green-500" />
              </div>
              <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37]">Thank You!</p>
              <h3 className="text-2xl font-bold text-[#121212] tracking-tight">Feedback Received</h3>
              <p className="text-sm text-[#121212]/50 max-w-sm leading-relaxed">
                Your message has been saved to our records and synced to our feedback log. Our team will review it shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-2 border border-[#D4AF37] text-[#D4AF37] px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#121212]/10 p-8 md:p-10 flex flex-col gap-6">
              <div>
                <p className="text-xs tracking-[0.5em] uppercase text-[#D4AF37] mb-1">Feedback Form</p>
                <h2 className="text-xl font-bold text-[#121212] tracking-tight">Share Your Thoughts</h2>
              </div>

              {error && (
                <div className="px-4 py-3 border border-red-400/40 bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs tracking-[0.3em] uppercase text-[#121212]/60 font-medium">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Atharva Zope"
                    className="bg-[#f9f9f9] border border-[#121212]/10 text-[#121212] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition-all duration-300 placeholder:text-[#121212]/25"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs tracking-[0.3em] uppercase text-[#121212]/60 font-medium">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="bg-[#f9f9f9] border border-[#121212]/10 text-[#121212] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition-all duration-300 placeholder:text-[#121212]/25"
                  />
                </div>
              </div>

              {/* Improvements */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-improvements" className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#121212]/60 font-medium">
                  <Lightbulb size={12} className="text-[#D4AF37]" /> Improvements
                </label>
                <textarea
                  id="contact-improvements"
                  name="improvements"
                  rows={3}
                  value={formData.improvements}
                  onChange={handleChange}
                  placeholder="What can we do better? (website speed, product range, sizing...)"
                  className="bg-[#f9f9f9] border border-[#121212]/10 text-[#121212] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition-all duration-300 placeholder:text-[#121212]/25 resize-none"
                />
              </div>

              {/* Doubts */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-doubts" className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#121212]/60 font-medium">
                  <HelpCircle size={12} className="text-[#D4AF37]" /> Doubts / Questions
                </label>
                <textarea
                  id="contact-doubts"
                  name="doubts"
                  rows={3}
                  value={formData.doubts}
                  onChange={handleChange}
                  placeholder="Any questions about orders, sizing, materials, returns...?"
                  className="bg-[#f9f9f9] border border-[#121212]/10 text-[#121212] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition-all duration-300 placeholder:text-[#121212]/25 resize-none"
                />
              </div>

              {/* Suggestions */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-suggestions" className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#121212]/60 font-medium">
                  <MessageSquare size={12} className="text-[#D4AF37]" /> Suggestions
                </label>
                <textarea
                  id="contact-suggestions"
                  name="suggestions"
                  rows={3}
                  value={formData.suggestions}
                  onChange={handleChange}
                  placeholder="Ideas for new styles, collaborations, features you'd love to see..."
                  className="bg-[#f9f9f9] border border-[#121212]/10 text-[#121212] px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] focus:bg-white transition-all duration-300 placeholder:text-[#121212]/25 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="contact-submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 bg-[#121212] text-[#FAFAFA] px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#FAFAFA]/30 border-t-[#FAFAFA] rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={15} /> Submit Feedback
                  </>
                )}
              </button>

              <p className="text-xs text-[#121212]/30 tracking-wide text-center">
                Your feedback is saved securely to our records and synced to our internal logs.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
