'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Hero3D from "@/components/hero/Hero3D";
import Navbar from "@/components/layout/Navbar";
import { X, ShoppingBag, Truck, CreditCard, Star, Clock } from 'lucide-react'
import { useCart, CartItem } from '@/components/providers/CartProvider'
import CheckoutModal from '@/components/layout/CheckoutModal'

const products = [
  {
    id: 1,
    name: "Midnight Bloom",
    description: "Experience the mystery of the night with our signature scent, distilled from rare moonflowers and midnight jasmine. A deep, floral experience that lingers in the soul.",
    price: 249,
    category: "Eau De Parfum",
    size: "100ml",
    rating: 4.9,
    delivery: "2-3 Business Days",
    payment: "Visa, Mastercard, Amex, Apple Pay",
    notes: ["Moonflower", "Midnight Jasmine", "Dark Vanilla"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    name: "Velvet Oud",
    description: "A rich, woody fragrance for the sophisticated elite, crafted with sustainably sourced oud wood and spiced with rare saffron and crimson rose.",
    price: 299,
    category: "Luxury Extract",
    size: "100ml",
    rating: 5.0,
    delivery: "1-2 Business Days",
    payment: "Visa, Mastercard, Amex, Crypto",
    notes: ["Sustainably Sourced Oud", "Saffron", "Crimson Rose"],
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    name: "Azure Breeze",
    description: "The freshness of the Mediterranean coast in a bottle. Crisp citrus notes blended with sea salt and sun-drenched cedarwood for the modern explorer.",
    price: 199,
    category: "Eau De Toilette",
    size: "100ml",
    rating: 4.8,
    delivery: "3-5 Business Days",
    payment: "Visa, Mastercard, GPay",
    notes: ["Mediterranean Citrus", "Sea Salt", "Cedarwood"],
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000"
  }
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { addToCart } = useCart()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const titleX = useTransform(smoothProgress, [0, 1], [0, -1000])
  const card1Y = useTransform(smoothProgress, [0, 0.5], [100, -100])
  const card2Y = useTransform(smoothProgress, [0, 0.5], [300, 0])
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.6], [0, 1, 1, 0])

  const handleBuyNow = (product: Omit<CartItem, 'quantity'>) => {
    addToCart(product)
    setSelectedProduct(null)
    setIsCheckoutOpen(true)
  }

  return (
    <main className="min-h-screen bg-bg selection:bg-accent selection:text-bg" ref={containerRef}>
      <Navbar />
      <Hero3D />
      
      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-bg/50 hover:bg-accent hover:text-bg rounded-full transition-all text-white"
              >
                <X size={20} />
              </button>

              {/* Product Image Section */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden bg-surface">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <span className="text-accent font-black tracking-[0.5em] text-[10px] uppercase mb-2 block">{selectedProduct.category}</span>
                   <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white">{selectedProduct.name}</h2>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-none">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="text-accent fill-accent" size={14} />
                    <span className="text-xs font-bold text-white tracking-widest">{selectedProduct.rating} / 5.0</span>
                  </div>
                  <span className="text-2xl font-playfair text-white">${selectedProduct.price}</span>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-10 font-inter uppercase tracking-wide">
                  {selectedProduct.description}
                </p>

                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/60 uppercase">
                    <Clock size={16} className="text-accent" />
                    <span>Delivery: {selectedProduct.delivery}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/60 uppercase">
                    <CreditCard size={16} className="text-accent" />
                    <span>Payment: {selectedProduct.payment}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/60 uppercase">
                    <Truck size={16} className="text-accent" />
                    <span>Complimentary Shipping & Gift Wrap</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct)
                      setSelectedProduct(null)
                    }}
                    className="bg-white text-bg py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={16} /> Add to Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(selectedProduct)}
                    className="bg-accent text-bg py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all active:scale-95"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />

      {/* Parallel Experience Section */}
      <section className="relative h-[200vh] bg-bg z-10">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background Ambient Lights */}
          <div className="absolute inset-0 pointer-events-none">
             <motion.div 
               style={{ opacity }}
               className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" 
             />
             <motion.div 
               style={{ opacity }}
               className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent3/5 blur-[150px] rounded-full" 
             />
          </div>

          <div className="relative w-full flex flex-col items-center justify-center py-20">
            <motion.h2 
              style={{ x: titleX }}
              className="absolute text-[15vw] font-playfair font-bold text-white/[0.02] whitespace-nowrap select-none pointer-events-none z-0"
            >
              PARALLEL EXPERIENCE LUXURY ELITE
            </motion.h2>
            
            <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
               <motion.div 
                 style={{ y: card1Y, opacity }}
                 className="w-full md:w-[45%] lg:w-1/3 bg-card/40 backdrop-blur-xl border border-border rounded-[2rem] overflow-hidden relative group"
               >
                  <img src={products[0].image} alt={products[0].name} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="p-10 md:p-14 min-h-[400px] flex flex-col justify-end relative z-10">
                    <span className="text-accent font-inter tracking-[0.4em] text-[10px] uppercase mb-4 block font-black">Collection 01</span>
                    <h3 className="text-4xl lg:text-5xl font-playfair mb-6 leading-tight text-white">{products[0].name}</h3>
                    <p className="text-muted font-inter text-sm leading-relaxed max-w-xs">{products[0].description.split('.')[0]}.</p>
                    <button 
                      onClick={() => setSelectedProduct(products[0])}
                      className="mt-8 text-white border-b border-white/20 pb-2 self-start hover:border-accent hover:text-accent transition-all uppercase tracking-widest text-[10px] font-black"
                    >
                      Explore
                    </button>
                  </div>
               </motion.div>

               <motion.div 
                 style={{ y: card2Y, opacity }}
                 className="hidden md:flex w-[45%] lg:w-1/3 bg-card/40 backdrop-blur-xl border border-border rounded-[2rem] overflow-hidden relative group"
               >
                  <img src={products[1].image} alt={products[1].name} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-accent3/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="p-10 md:p-14 min-h-[400px] flex flex-col justify-end relative z-10">
                    <span className="text-accent3 font-inter tracking-[0.4em] text-[10px] uppercase mb-4 block font-black">Collection 02</span>
                    <h3 className="text-4xl lg:text-5xl font-playfair mb-6 leading-tight text-white">{products[1].name}</h3>
                    <p className="text-muted font-inter text-sm leading-relaxed max-w-xs">{products[1].description.split('.')[0]}.</p>
                    <button 
                      onClick={() => setSelectedProduct(products[1])}
                      className="mt-8 text-white border-b border-white/20 pb-2 self-start hover:border-accent3 hover:text-accent3 transition-all uppercase tracking-widest text-[10px] font-black"
                    >
                      Explore
                    </button>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="collections" className="py-40 px-6 md:px-10 bg-bg relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <span className="text-accent font-inter tracking-[0.4em] text-[10px] uppercase block mb-6 font-black">Shop the elite</span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-bold leading-[0.9]">
                Featured <br /> <span className="text-accent italic">Products</span>
              </h2>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-muted hover:text-white transition-all flex items-center gap-6 text-[10px] tracking-[0.4em] uppercase group font-black mb-4"
            >
              VIEW ALL COLLECTIONS <span className="text-accent group-hover:translate-x-3 transition-transform duration-500">→</span>
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-[4/5] bg-surface border border-border rounded-2xl overflow-hidden relative">
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                   
                   {/* Product Image */}
                   <div className="w-full h-full flex items-center justify-center text-muted group-hover:scale-110 transition-transform duration-1000">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="w-32 h-48 bg-accent/5 rounded-full blur-3xl absolute group-hover:bg-accent/10 transition-colors" />
                   </div>
                   
                   {/* View Details Label */}
                   <div className="absolute top-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                     <span className="bg-accent text-bg px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                       View Details
                     </span>
                   </div>

                   {/* Quick Add Button */}
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                     <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="bg-white text-bg px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-accent transition-colors"
                      >
                       Quick Add
                     </button>
                   </div>
                </div>
                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-playfair mb-1">{product.name}</h4>
                    <p className="text-muted text-[10px] tracking-widest uppercase font-inter">{product.category} / {product.size}</p>
                  </div>
                  <p className="text-accent font-inter font-medium text-lg">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-24 bg-bg border-t border-border/30 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-24 mb-16">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-playfair font-bold tracking-widest text-white">ELITE</span>
              <span className="text-[10px] tracking-[0.8em] text-accent -mt-1 ml-2 uppercase font-black">Premium</span>
              <p className="text-muted text-[10px] uppercase tracking-[0.2em] mt-6 max-w-xs text-center md:text-left leading-relaxed">
                The essence of divine elegance in every drop. Crafted for those who seek the extraordinary.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 text-[10px] tracking-[0.3em] uppercase text-muted font-bold">
              <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-accent transition-colors">Contact Us</Link>
              <Link href="#" className="hover:text-accent transition-colors">Shipping Info</Link>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] tracking-[0.2em] text-muted/40 uppercase font-medium">
              © 2026 PREMIUM ELITE LUXURY. ALL RIGHTS RESERVED.
            </div>
            
            <div className="flex gap-8">
              <span className="text-[10px] tracking-[0.4em] text-muted/30 uppercase cursor-default">Instagram</span>
              <span className="text-[10px] tracking-[0.4em] text-muted/30 uppercase cursor-default">Twitter</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
