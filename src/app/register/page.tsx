'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Loader2, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react'

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        let message = result.message || "Registration failed"
        if (result.error?.includes("timeout") || result.error?.includes("selection") || result.message?.includes("timeout") || result.message?.includes("selection")) {
          message = "Database connection error. Please ensure your IP is whitelisted in MongoDB Atlas."
        } else if (result.error) {
          message = `${result.message}: ${result.error}`
        }
        setError(message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center relative overflow-hidden font-inter py-12">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent2/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/10 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[520px] px-6 relative z-10"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors mb-6 font-black ml-4"
        >
          <ChevronLeft size={14} /> Back to Home
        </Link>
        <div className="bg-[#0c0c14]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-8 group">
              <span className="text-3xl font-playfair font-bold tracking-widest text-white group-hover:text-accent transition-colors">ELITE</span>
              <span className="text-[9px] tracking-[0.8em] text-accent -mt-1 ml-2 block uppercase font-black">Premium</span>
            </Link>
            <h1 className="text-3xl font-playfair font-bold text-white mb-3">Join the Elite</h1>
            <p className="text-muted text-[10px] uppercase tracking-[0.3em] font-medium">Create your exclusive account</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-accent2/10 border border-accent2/20 rounded-2xl flex items-center gap-3 text-accent2 text-xs"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-2xl flex items-center gap-3 text-accent text-xs"
            >
              <CheckCircle2 size={18} />
              Registration successful! Redirecting...
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted font-black ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                <input 
                  {...register('fullName')}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-[#050508]/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm text-white placeholder:text-white/10"
                />
              </div>
              {errors.fullName && <p className="text-accent2 text-[10px] mt-1 ml-1 font-medium">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-muted font-black ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                <input 
                  {...register('email')}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#050508]/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm text-white placeholder:text-white/10"
                />
              </div>
              {errors.email && <p className="text-accent2 text-[10px] mt-1 ml-1 font-medium">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted font-black ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                  <input 
                    {...register('password')}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#050508]/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm text-white placeholder:text-white/10"
                  />
                </div>
                {errors.password && <p className="text-accent2 text-[10px] mt-1 ml-1 font-medium">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted font-black ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                  <input 
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#050508]/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm text-white placeholder:text-white/10"
                  />
                </div>
                {errors.confirmPassword && <p className="text-accent2 text-[10px] mt-1 ml-1 font-medium">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading || success}
              className="w-full bg-accent text-bg font-black py-4 rounded-2xl transition-all duration-500 uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-white hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-white/5" />
            <span className="text-[9px] text-muted uppercase tracking-[0.2em] font-bold">Or</span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>

          <button 
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="mt-8 w-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google Account
          </button>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-muted text-[10px] uppercase tracking-[0.2em] font-medium">
              Already elite? 
              <Link href="/login" className="text-accent hover:text-white transition-colors ml-2 font-black underline underline-offset-4 decoration-accent/30">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
