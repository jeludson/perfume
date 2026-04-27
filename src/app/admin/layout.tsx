'use client'

import { 
  Users, 
  ShoppingBag, 
  Package, 
  Bell,
  Search,
  LayoutDashboard,
  Settings,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
  { name: 'Products', icon: Package, href: '/admin/products' },
  { name: 'Users', icon: Users, href: '/admin/users' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#050508] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/20 backdrop-blur-xl sticky top-0 h-screen hidden lg:flex flex-col">
        <div className="p-8">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-playfair font-bold tracking-widest">ELITE</span>
            <span className="text-[7px] tracking-[0.8em] text-accent -mt-1 ml-1 uppercase">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-inter transition-all ${
                  isActive 
                    ? 'bg-accent text-bg font-bold' 
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-border">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 text-muted hover:text-accent2 transition-colors text-sm font-inter w-full px-4"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-bg/50 backdrop-blur-md sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search data, orders, users..."
              className="w-full bg-surface border border-border rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:border-accent transition-colors text-xs font-inter"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-muted hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent2 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Official Owner</p>
                <p className="text-[10px] text-accent uppercase tracking-widest font-inter">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent3 flex items-center justify-center font-bold text-bg">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
