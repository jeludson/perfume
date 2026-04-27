'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Search, Menu, X, LogOut, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/components/providers/CartProvider'
import CartDrawer from './CartDrawer'
import CheckoutModal from './CheckoutModal'

export default function Navbar() {
  const { data: session } = useSession()
  const { cart, setIsCartOpen } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Collections', href: '#collections' },
    { name: 'Men', href: '#men' },
    { name: 'Women', href: '#women' },
    { name: 'Boutique', href: '#boutique' },
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? 'py-4 bg-bg/80 backdrop-blur-md border-b border-border' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Menu Button (Mobile) */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
            <span className="text-xl md:text-2xl font-playfair font-bold tracking-widest text-white">ELITE</span>
            <span className="text-[7px] md:text-[8px] tracking-[0.8em] text-accent -mt-1 ml-2 font-black">PREMIUM</span>
          </Link>

          {/* Icons */}
          <div className="flex gap-6 items-center">
            <button className="text-white hover:text-accent transition-colors">
              <Search size={20} />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-accent transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-bg text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-white hover:text-accent transition-colors flex items-center gap-2"
              >
                <User size={20} />
                {session?.user?.name && (
                  <span className="text-[10px] uppercase tracking-widest hidden md:block">{session.user.name.split(' ')[0]}</span>
                )}
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-card border border-border rounded-xl shadow-2xl py-2 z-[60]"
                  >
                    <div className="px-4 py-3 border-b border-border mb-2">
                      <p className="text-xs font-bold text-white truncate">{session?.user?.name}</p>
                      <p className="text-[9px] text-muted truncate">{session?.user?.email}</p>
                    </div>
                    {session?.user?.role === 'ADMIN' && (
                      <Link 
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-accent hover:bg-white/5 transition-colors"
                      >
                        Owner Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-white/5 transition-colors"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-bg z-[120] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <Link href="/" className="flex flex-col items-center">
                <span className="text-2xl font-playfair font-bold tracking-widest text-white">ELITE</span>
                <span className="text-[8px] tracking-[0.8em] text-accent -mt-1 ml-2">PREMIUM</span>
              </Link>
              <button 
                className="text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-playfair font-bold text-white hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <div className="flex gap-6">
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Instagram</span>
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Twitter</span>
              </div>
              <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em]">© 2026 PREMIUM ELITE LUXURY</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
