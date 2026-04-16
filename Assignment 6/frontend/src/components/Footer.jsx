import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] text-[#FAFAFA]/60 border-t border-[#D4AF37]/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <Link to="/" className="flex flex-col leading-none w-fit">
            <span className="text-3xl font-bold tracking-[0.3em] text-[#FAFAFA] uppercase">
              AZ
            </span>
            <span className="text-[10px] font-light tracking-[0.5em] text-[#D4AF37] uppercase">
              Apparel
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-[#FAFAFA]/50 max-w-xs">
            Premium, curated fashion designed for those who define their own standards. Craft. Elegance. Identity.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
              <Instagram size={15} />
            </a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
              <Twitter size={15} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 border border-[#D4AF37]/30 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
              <Linkedin size={15} />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold mb-6">
            Collections
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Men's Collection", path: '/shop/men' },
              { label: "Women's Collection", path: '/shop/women' },
              { label: 'Accessories', path: '/shop/accessories' },
              { label: 'New Arrivals', path: '/' },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-sm hover:text-[#D4AF37] hover:tracking-widest transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold mb-6">
            Account
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'My Profile', path: '/profile' },
              { label: 'My Orders', path: '/profile' },
              { label: 'Login', path: '/login' },
              { label: 'Register', path: '/register' },
              { label: 'Contact Us', path: '/contact' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-sm hover:text-[#D4AF37] hover:tracking-widest transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Address */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold mb-6">
            Contact
          </h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3 text-sm">
              <MapPin size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
              <span>HQ: Near Thergaon, Pimpri-Chinchwad (PCMC), Pune, Maharashtra, India.</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail size={15} className="text-[#D4AF37] shrink-0" />
              <a href="mailto:contact@azapparel.in" className="hover:text-[#D4AF37] transition-colors">
                contact@azapparel.in
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone size={15} className="text-[#D4AF37] shrink-0" />
              <span>+91 98765 43210</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D4AF37]/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs tracking-widest uppercase text-[#FAFAFA]/30">
            &copy; {year} AZ Apparel. All Rights Reserved.
          </p>
          <p className="text-xs tracking-widest uppercase text-[#D4AF37]/60">
            Designed &amp; Developed by{' '}
            <span className="text-[#D4AF37] font-semibold">Atharva Gajanan Zope</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
