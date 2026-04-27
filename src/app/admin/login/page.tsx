'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Loader2, AlertCircle, ChevronLeft, Terminal } from 'lucide-react'

const adminLoginSchema = z.object({
  email: z.string().min(1, "Official ID required"),
  password: z.string().min(1, "Access key required"),
})

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
  })

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        setError(`System authorization failed: ${result.error}`)
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("System authorization failed. Please contact administrator.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#050508] text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden font-inter">
      
      {/* BACKGROUND LAYER: Absolute and pointer-events-none ensures it never overlaps text */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,196,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,196,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* MAIN CONTENT CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="bg-[#0c0c14]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_80px_rgba(0,245,196,0.05)]">
          
          {/* Back Navigation */}
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-accent transition-colors mb-8 font-black"
          >
            <ChevronLeft size={14} /> User Login
          </Link>

          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
               <ShieldCheck className="text-accent" size={32} />
               <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#00f5c4]" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-white mb-2">Owner Terminal</h1>
            <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-black">Authorized Personnel Only</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-[11px] font-medium"
            >
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black ml-1">System Identifier</label>
              <div className="relative">
                <Terminal className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  {...register('email')}
                  type="text"
                  placeholder="admin_id"
                  className="w-full bg-[#050508]/50 border border-white/5 rounded-xl py-4 pl-14 pr-6 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all text-sm text-white font-mono placeholder:text-white/10"
                />
              </div>
              {errors.email && <p className="text-red-400 text-[10px] mt-1 ml-1 font-medium">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black ml-1">Master Access Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  {...register('password')}
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-[#050508]/50 border border-white/5 rounded-xl py-4 pl-14 pr-6 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all text-sm text-white font-mono placeholder:text-white/10"
                />
              </div>
              {errors.password && <p className="text-red-400 text-[10px] mt-1 ml-1 font-medium">{errors.password.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-[#050508] font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,245,196,0.2)] hover:brightness-110 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Initiate Authorization"}
            </button>
          </form>

          {/* Footer Security Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-full">
              <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
              <p className="text-[8px] text-white/20 uppercase tracking-[0.5em] font-medium">
                Secure Protocol RSA-4096
              </p>
              <span className="w-1 h-1 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}