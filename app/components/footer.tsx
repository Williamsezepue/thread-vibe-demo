import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="font-bold text-lg text-white">Thread Vibe</div>
          <div className="text-sm text-slate-400 mt-2">Premium streetwear for the culture.</div>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Shop</div>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <a href="#products" className="hover:text-pink-400">T-Shirts</a>
            <a href="#products" className="hover:text-pink-400">Hoodies</a>
            <a href="#products" className="hover:text-pink-400">Bottoms</a>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Support</div>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <div>support@threadvibe.com</div>
            <div>+234 (0) 123 456 7890</div>
            <div>Lagos, Nigeria</div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Follow</div>
          <div className="flex gap-3">
            <a aria-label="facebook" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-blue-700"><SiFacebook className="w-4 h-4" /></a>
            <a aria-label="instagram" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] to-[#8134af]"><SiInstagram className="w-4 h-4" /></a>
            <a aria-label="twitter" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-black"><SiX className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">© 2025 Thread Vibe — Crafted with passion by Blue Circle</div>
    </footer>
  );
}