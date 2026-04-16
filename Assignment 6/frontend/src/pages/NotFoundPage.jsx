import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-center gap-6 px-6">
    <p className="text-8xl font-bold text-[#D4AF37] tracking-widest">404</p>
    <h1 className="text-2xl tracking-[0.4em] uppercase text-[#FAFAFA]">Page Not Found</h1>
    <p className="text-[#FAFAFA]/50 max-w-sm">
      The page you are looking for doesn't exist or has been moved.
    </p>
    <Link
      to="/"
      className="mt-4 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
    >
      Return Home
    </Link>
  </div>
);

export default NotFoundPage;
