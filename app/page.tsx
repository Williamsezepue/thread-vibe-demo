"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { provider } from "@/app/components/provider";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Heart, Share2, ShoppingBag, Star, TrendingUp, Users, Zap, Filter } from "lucide-react";
import { PRODUCTS } from "./lib/data";

const salesData = [
  { month: "Jan", tshirts: 2400, hoodies: 1200, bottoms: 980, outerwear: 2210 },
  { month: "Feb", tshirts: 3210, hoodies: 1290, bottoms: 2000, outerwear: 2290 },
  { month: "Mar", tshirts: 2290, hoodies: 1000, bottoms: 2181, outerwear: 2500 },
  { month: "Apr", tshirts: 2000, hoodies: 9800, bottoms: 2500, outerwear: 2100 },
  { month: "May", tshirts: 2181, hoodies: 1200, bottoms: 2100, outerwear: 2200 },
  { month: "Jun", tshirts: 2500, hoodies: 1300, bottoms: 2400, outerwear: 2600 },
];

const categoryData = [
  { name: "T-Shirts", value: 35 },
  { name: "Hoodies", value: 20 },
  { name: "Bottoms", value: 25 },
  { name: "Outerwear", value: 20 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

export default function Page() {
  const { cart, favorites, setCart, setFavorites } = provider();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.category)));
  }, []);

  function toggleFavorite(id: string) {
    const updated = new Set(favorites);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    setFavorites(updated);
  }

  function addToCart(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 3000);
    setContactForm({ name: "", email: "", subject: "", message: "" });
  }

  const filteredProducts = PRODUCTS.filter((p) => (activeCategory ? p.category === activeCategory : true));
  const cartTotal = Object.keys(cart).length;

  return (
    <div className="min-h-screen mt-0 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8 py-8">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="text-sm font-semibold text-pink-400 mb-2">Street Style Revolution</div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight text-white">
              Thread Vibe Premium Streetwear
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-xl">
              Elevate your wardrobe with our curated collection of premium t-shirts, hoodies, and jackets. Comfort meets style. Limited drops. Exclusive designs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products" className="px-6 py-3 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg">Shop Now</a>
              <a href="#stats" className="px-6 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-slate-200 font-semibold hover:bg-slate-700">View Stats</a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="bg-slate-800/60 backdrop-blur rounded-lg p-3 shadow-sm border border-slate-700">
                <div className="text-lg font-bold text-pink-400">{PRODUCTS.length}</div>
                <div className="text-xs text-slate-400">Products</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur rounded-lg p-3 shadow-sm border border-slate-700">
                <div className="text-lg font-bold text-purple-400">45K+</div>
                <div className="text-xs text-slate-400">Happy Customers</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur rounded-lg p-3 shadow-sm border border-slate-700">
                <div className="text-lg font-bold text-blue-400">4.8★</div>
                <div className="text-xs text-slate-400">Avg. Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80&auto=format&fit=crop"
              alt="Premium clothing"
              width={900}
              height={700}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* COLLECTION FILTERS */}
      <section id="collection" className="bg-slate-800/50 border-t border-b border-slate-700 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-300">Filter by</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-full font-medium transition ${activeCategory === null ? "bg-linear-to-r from-pink-500 to-purple-600 text-white shadow" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
              All Products
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory((s) => (s === c ? null : c))}
                className={`px-4 py-2 rounded-full font-medium transition ${activeCategory === c ? "bg-linear-to-r from-pink-500 to-purple-600 text-white shadow" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Collection</h2>
            <p className="text-sm text-slate-400 mt-1">Hand-picked premium pieces. Shop our latest arrivals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <motion.article
                key={prod.id}
                whileHover={{ y: -4 }}
                className="bg-slate-800/40 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-pink-500/10 transition group border border-slate-700"
              >
                <div className="relative h-56">
                  <Image src={prod.img} alt={prod.name} fill className="object-cover group-hover:scale-105 transition duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      onClick={() => toggleFavorite(prod.id)}
                      className={`p-2 rounded-full backdrop-blur transition ${favorites.has(prod.id) ? "bg-pink-500 text-white" : "bg-slate-900/80 text-slate-300 hover:text-white"}`}
                    >
                      <Heart className="w-4 h-4" fill={favorites.has(prod.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white transition backdrop-blur">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-xs font-semibold text-pink-400">{prod.category}</div>

                  <div className="absolute bottom-3 left-3 right-3 bg-linear-to-t from-black/60 to-transparent p-3 rounded-lg">
                    <div className="text-white font-bold text-lg">{prod.price}</div>
                    <div className="text-white/80 text-xs flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {prod.rating} ({prod.reviews} reviews)
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-white">{prod.name}</h3>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {prod.colors.map((c) => (
                      <div key={c} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">{c}</div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{prod.stock} in stock</span>
                    <span>{prod.sizes.length} sizes</span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => addToCart(prod.id)}
                      className="flex-1 py-2 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-300 font-semibold hover:bg-slate-700 transition"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
            <div className="relative h-72">
              <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/90 flex items-center justify-center hover:bg-slate-800 transition text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-white">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mt-2 text-slate-400">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{selectedProduct.price}</div>
                  <div className="text-xs text-slate-400 mt-1">{selectedProduct.stock} in stock</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <div className="text-sm text-slate-400">Category</div>
                  <div className="text-lg font-bold text-pink-400 mt-1">{selectedProduct.category}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <div className="text-sm text-slate-400">Colors</div>
                  <div className="text-lg font-bold text-purple-400 mt-1">{selectedProduct.colors.length}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <div className="text-sm text-slate-400">Sizes</div>
                  <div className="text-lg font-bold text-blue-400 mt-1">{selectedProduct.sizes.length}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <div className="text-sm text-slate-400">Stock</div>
                  <div className="text-lg font-bold text-green-400 mt-1">{selectedProduct.stock}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg text-white mb-3">Available Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((c) => (
                        <span key={c} className="px-3 py-1 rounded-full bg-slate-700 text-slate-200 text-sm">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Sizes</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <span key={s} className="px-3 py-1 rounded-full bg-slate-700 text-slate-200 text-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <button onClick={() => { addToCart(selectedProduct.id); setSelectedProduct(null); }} className="py-2 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button className="py-2 rounded-lg border border-slate-600 text-slate-300 font-semibold hover:bg-slate-700 transition">
                  Save for Later
                </button>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full py-2 rounded-lg text-slate-400 hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* SALES ANALYTICS */}
      <section id="stats" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-2">Sales & Performance</h2>
          <p className="text-sm text-slate-400 mb-8">Real-time insights into our collection performance.</p>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Trends */}
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="block sm:hidden">
              <h3 className="font-semibold text-lg text-white mb-4">Monthly Sales Trends</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    <Legend />
                    <Line type="monotone" dataKey="tshirts" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="hoodies" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="bottoms" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="outerwear" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-slate-400 mt-4">Steady growth across all categories. Hoodies peak in Q1.</p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="hidden sm:block bg-slate-800/50 p-6 rounded-2xl shadow-md border border-slate-700">
              <h3 className="font-semibold text-lg text-white mb-4">Monthly Sales Trends</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                    <Legend />
                    <Line type="monotone" dataKey="tshirts" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="hoodies" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="bottoms" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="outerwear" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-slate-400 mt-4">Steady growth across all categories. Hoodies peak in Q1.</p>
            </motion.div>

            {/* Category Mix */}
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="block sm:hidden">
              <h3 className="font-semibold text-lg text-white mb-4">Sales by Category</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-slate-400 mt-4">T-Shirts lead at 35% of total sales volume.</p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="hidden sm:block bg-slate-800/50 p-6 rounded-2xl shadow-md border border-slate-700">
              <h3 className="font-semibold text-lg text-white mb-4">Sales by Category</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-slate-400 mt-4">T-Shirts lead at 35% of total sales volume.</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-lg shadow p-4 border border-slate-700">
              <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-semibold text-slate-300">Monthly Growth</div>
              <div className="text-2xl font-bold text-blue-400 mt-1">+28%</div>
              <div className="text-xs text-slate-500 mt-1">vs. last month</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow p-4 border border-slate-700">
              <Zap className="w-6 h-6 text-pink-400 mb-2" />
              <div className="text-sm font-semibold text-slate-300">Best Seller</div>
              <div className="text-2xl font-bold text-pink-400 mt-1">Premium Hoodie</div>
              <div className="text-xs text-slate-500 mt-1">189 reviews</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow p-4 border border-slate-700">
              <Users className="w-6 h-6 text-purple-400 mb-2" />
              <div className="text-sm font-semibold text-slate-300">Active Customers</div>
              <div className="text-2xl font-bold text-purple-400 mt-1">12,400</div>
              <div className="text-xs text-slate-500 mt-1">This month</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow p-4 border border-slate-700">
              <Star className="w-6 h-6 text-yellow-400 mb-2" />
              <div className="text-sm font-semibold text-slate-300">Avg. Rating</div>
              <div className="text-2xl font-bold text-yellow-400 mt-1">4.8/5</div>
              <div className="text-xs text-slate-500 mt-1">3,200+ reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-slate-900/50 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="sm:bg-linear-to-br sm:from-slate-800 sm:to-slate-900 sm:rounded-2xl sm:p-8 md:p-12 sm:shadow-lg sm:border sm:border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-slate-400 mb-8">Questions about sizing, shipping, or custom orders? We&rsquo;re here to help.</p>

            <form onSubmit={handleContact} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your Name"
                  className="px-4 py-3 rounded-lg bg-slate-700/50 placeholder-slate-500 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  required
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Email"
                  className="px-4 py-3 rounded-lg bg-slate-700/50 placeholder-slate-500 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <input
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 placeholder-slate-500 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <textarea
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 placeholder-slate-500 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />

              <div className="flex items-center gap-4">
                <button type="submit" className="px-6 py-3 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition">
                  Send Message
                </button>
                {contactSuccess && (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-green-400 font-semibold">
                    ✓ Message sent! We&rsquo;ll reply within 24 hours.
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}