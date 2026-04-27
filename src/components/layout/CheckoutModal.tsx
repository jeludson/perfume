'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Truck, ShieldCheck, MapPin, Phone, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react'
import { useCart } from '@/components/providers/CartProvider'

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setStep(4)
        clearCart()
      }, 2000)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-bg/95 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-card border border-border rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]"
        >
          {/* Left Side: Order Summary */}
          <div className="w-full md:w-2/5 p-8 md:p-12 bg-surface/30 border-b md:border-b-0 md:border-r border-border flex flex-col">
            <h2 className="text-2xl font-playfair font-bold text-white mb-10 tracking-widest uppercase">Order Summary</h2>
            
            <div className="flex-1 space-y-6 overflow-y-auto max-h-[300px] pr-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-surface rounded-lg overflow-hidden border border-border shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-playfair text-white truncate">{item.name}</h4>
                    <p className="text-[9px] text-muted tracking-widest uppercase mt-1">Qty: {item.quantity}</p>
                    <p className="text-xs font-bold text-accent mt-2">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border space-y-4">
              <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-muted font-bold">
                <span>Subtotal</span>
                <span className="text-white">${cartTotal}</span>
              </div>
              <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-muted font-bold">
                <span>Shipping</span>
                <span className="text-accent">Complimentary</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-[10px] tracking-[0.3em] uppercase font-black text-white">Total</span>
                <span className="text-3xl font-playfair font-bold text-white">${cartTotal}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Checkout Steps */}
          <div className="flex-1 p-8 md:p-12 flex flex-col">
            <div className="flex justify-between items-center mb-12">
               <div className="flex items-center gap-4">
                 {[1, 2, 3].map((i) => (
                   <div 
                    key={i}
                    className={`w-8 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-accent' : 'bg-border'}`}
                   />
                 ))}
               </div>
               {step < 4 && (
                 <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                   <X size={20} />
                 </button>
               )}
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-3xl font-playfair font-bold text-white mb-2">Delivery Details</h3>
                      <p className="text-[10px] text-muted tracking-[0.3em] uppercase font-bold">Where should we send your essence?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-black flex items-center gap-2">
                          <MapPin size={10} /> Full Address
                        </label>
                        <input type="text" placeholder="123 Elite Avenue" className="w-full bg-surface/50 border border-border rounded-xl py-4 px-6 text-xs text-white focus:outline-none focus:border-accent transition-colors tracking-widest uppercase" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-black flex items-center gap-2">
                          <Phone size={10} /> Contact Number
                        </label>
                        <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-surface/50 border border-border rounded-xl py-4 px-6 text-xs text-white focus:outline-none focus:border-accent transition-colors tracking-widest uppercase" />
                      </div>
                    </div>

                    <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 flex items-start gap-4">
                       <Truck className="text-accent shrink-0" size={20} />
                       <div>
                         <h4 className="text-[10px] tracking-[0.2em] uppercase font-black text-white">Complimentary Delivery</h4>
                         <p className="text-[10px] text-muted mt-1 leading-relaxed">Your order will arrive within 2-3 business days in our signature luxury packaging.</p>
                       </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-3xl font-playfair font-bold text-white mb-2">Secure Payment</h3>
                      <p className="text-[10px] text-muted tracking-[0.3em] uppercase font-bold">Select your preferred method</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <button className="flex items-center justify-between p-6 bg-surface/50 border border-accent rounded-2xl group">
                        <div className="flex items-center gap-4">
                          <CreditCard className="text-accent" size={24} />
                          <div className="text-left">
                            <p className="text-xs font-bold text-white uppercase tracking-widest">Credit Card</p>
                            <p className="text-[9px] text-muted uppercase tracking-widest">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-4 border-accent bg-accent" />
                      </button>
                      <button className="flex items-center justify-between p-6 bg-surface/10 border border-border rounded-2xl hover:bg-surface/20 transition-all group">
                        <div className="flex items-center gap-4">
                          <CreditCard className="text-white/40" size={24} />
                          <div className="text-left">
                            <p className="text-xs font-bold text-white uppercase tracking-widest">Digital Wallet</p>
                            <p className="text-[9px] text-muted uppercase tracking-widest">Apple Pay, Google Pay</p>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-border" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[9px] tracking-[0.2em] uppercase text-muted/60 font-black justify-center">
                       <ShieldCheck size={14} className="text-accent" />
                       End-to-End Encrypted Secure Transaction
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-3xl font-playfair font-bold text-white mb-2">Final Review</h3>
                      <p className="text-[10px] text-muted tracking-[0.3em] uppercase font-bold">Confirm your luxury experience</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-surface/30 p-6 rounded-2xl border border-border flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <MapPin size={16} className="text-accent" />
                          <div className="text-left">
                            <p className="text-[8px] text-muted uppercase tracking-widest mb-1">Shipping to</p>
                            <p className="text-[10px] font-bold text-white uppercase tracking-widest">123 Elite Avenue, New York, NY</p>
                          </div>
                        </div>
                        <button onClick={() => setStep(1)} className="text-[8px] text-accent uppercase font-black border-b border-accent/20">Edit</button>
                      </div>
                      <div className="bg-surface/30 p-6 rounded-2xl border border-border flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <CreditCard size={16} className="text-accent" />
                          <div className="text-left">
                            <p className="text-[8px] text-muted uppercase tracking-widest mb-1">Paying with</p>
                            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Visa ending in 4242</p>
                          </div>
                        </div>
                        <button onClick={() => setStep(2)} className="text-[8px] text-accent uppercase font-black border-b border-accent/20">Edit</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12"
                  >
                    <div className="relative">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                        className="w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,245,196,0.3)]"
                      >
                        <CheckCircle2 size={48} className="text-bg" />
                      </motion.div>
                      <div className="absolute -inset-4 border border-accent/30 rounded-full animate-ping opacity-20" />
                    </div>

                    <div>
                      <h3 className="text-4xl font-playfair font-bold text-white mb-4 italic">Thank You for Your Trust</h3>
                      <p className="text-xs text-muted tracking-[0.3em] uppercase max-w-sm mx-auto leading-relaxed">
                        Your order has been received and is being prepared with divine elegance.
                      </p>
                    </div>

                    <div className="space-y-2">
                       <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Order ID: #PE-9827341</p>
                       <p className="text-[10px] text-accent uppercase tracking-widest font-black">Confirmation sent to your email</p>
                    </div>

                    <button 
                      onClick={onClose}
                      className="bg-white text-bg px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all mt-8"
                    >
                      Return to Gallery
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step < 4 && (
              <div className="mt-12 flex gap-4">
                {step > 1 && (
                  <button 
                    onClick={handleBack}
                    className="flex-1 border border-border text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                <button 
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="flex-[2] bg-white text-bg py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
                >
                  {isProcessing ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <ShieldCheck size={18} />
                    </motion.div>
                  ) : (
                    <>
                      {step === 3 ? 'Confirm Order' : 'Continue'} <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
