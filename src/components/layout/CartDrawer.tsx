'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '@/components/providers/CartProvider'

export default function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-bg/60 backdrop-blur-md z-[110]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-[120] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-border flex justify-between items-center bg-surface/30">
              <div className="flex items-center gap-4">
                <div className="relative">
                   <ShoppingBag size={24} className="text-accent" />
                   {cart.length > 0 && (
                     <span className="absolute -top-2 -right-2 bg-white text-bg text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                       {cart.length}
                     </span>
                   )}
                </div>
                <h2 className="text-xl font-playfair font-bold text-white uppercase tracking-widest">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={64} className="mb-6 stroke-[1]" />
                  <p className="text-[10px] tracking-[0.3em] uppercase font-black">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-32 bg-surface rounded-xl overflow-hidden border border-border/50 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-playfair text-white">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/20 hover:text-accent transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-muted tracking-widest uppercase mb-4">{item.category}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-border rounded-lg p-1 bg-bg/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:text-accent transition-colors text-white/40"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:text-accent transition-colors text-white/40"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-accent">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-surface/50 border-t border-border space-y-6">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] text-muted tracking-[0.3em] uppercase font-black">Subtotal</p>
                  <p className="text-3xl font-playfair font-bold text-white">${cartTotal}</p>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false)
                    onCheckout()
                  }}
                  className="w-full bg-white text-bg py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
