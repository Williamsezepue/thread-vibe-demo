"use client";


import { Heart, ShoppingBag } from "lucide-react";
import { provider } from "@/app/components/provider";

export default function Navbar() {
  const { cart, favorites } = provider();
  const cartTotal = Object.keys(cart).length;

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/80 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-linear-to-br from-pink-500 to-purple-600 p-2 w-10 h-10 flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Thread Vibe</div>
            <div className="text-xs text-slate-400">Premium Streetwear</div>
          </div>
        </div>
        <nav className="hidden mdlg:flex gap-6 text-sm text-slate-300">
          <a href="#products" className="hover:text-pink-400 transition">Shop</a>
          <a href="#collection" className="hover:text-pink-400 transition">Collection</a>
          <a href="#stats" className="hover:text-pink-400 transition">Sales</a>
          <a href="#contact" className="hover:text-pink-400 transition">Contact</a>
        </nav>
        <div className="flex justify-end sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-800/50 hover:bg-slate-700 transition">
                <Heart className="w-5 h-5 text-pink-400" />
              </button>
              {favorites.size > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favorites.size}</span>
              )}
            </div>
            <div className="relative">
              <button className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-800/50 hover:bg-slate-700 transition">
                <ShoppingBag className="w-5 h-5 text-purple-400" />
              </button>
              {cartTotal > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartTotal}</span>
              )}
            </div>
            <a href="#contact" className="px-4 py-2 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

