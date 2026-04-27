'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Activity,
  CreditCard,
  Clock
} from 'lucide-react'

const stats = [
  { name: 'Total Revenue', value: '$124,592.00', icon: DollarSign, change: '+12.5%', color: 'text-accent' },
  { name: 'Active Users', value: '2,842', icon: Users, change: '+18.2%', color: 'text-accent3' },
  { name: 'New Orders', value: '456', icon: ShoppingBag, change: '+5.4%', color: 'text-accent2' },
  { name: 'Avg. Order Value', value: '$273.22', icon: TrendingUp, change: '-2.1%', color: 'text-muted' },
]

const recentTransactions = [
  { id: '#ORD-7231', user: 'Alex Morgan', amount: '$498.00', status: 'COMPLETED', date: '2 mins ago' },
  { id: '#ORD-7230', user: 'Sarah Jenkins', amount: '$249.00', status: 'PENDING', date: '15 mins ago' },
  { id: '#ORD-7229', user: 'Michael Chen', amount: '$1,245.00', status: 'COMPLETED', date: '1 hour ago' },
  { id: '#ORD-7228', user: 'Emma Watson', amount: '$747.00', status: 'FAILED', date: '3 hours ago' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">Admin Overview</h1>
          <p className="text-muted text-xs uppercase tracking-widest font-inter">Real-time performance analytics</p>
        </div>
        <button className="bg-accent text-bg font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
          Export Report <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card/40 backdrop-blur-xl border border-border p-6 rounded-3xl group hover:border-accent/30 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-surface border border-border group-hover:bg-accent/10 group-hover:border-accent/20 transition-all ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-bold font-inter ${stat.change.startsWith('+') ? 'text-accent' : 'text-accent2'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-muted text-[10px] uppercase tracking-widest font-inter mb-1 font-bold">{stat.name}</h3>
            <p className="text-2xl font-bold text-white font-inter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-playfair font-bold text-white flex items-center gap-3">
              <CreditCard size={20} className="text-accent" />
              Recent Transactions
            </h2>
            <button className="text-muted hover:text-white transition-colors text-[10px] uppercase tracking-widest">View All</button>
          </div>
          
          <div className="bg-card/40 backdrop-blur-xl border border-border rounded-3xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface/50">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-bold">Order ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-bold">Customer</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-bold">Amount</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-bold">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-muted font-bold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 text-xs font-mono text-muted group-hover:text-accent transition-colors">{tx.id}</td>
                    <td className="px-6 py-4 text-xs font-bold text-white">{tx.user}</td>
                    <td className="px-6 py-4 text-xs font-bold text-accent">{tx.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-bold px-2 py-1 rounded-full border ${
                        tx.status === 'COMPLETED' ? 'bg-accent/10 border-accent/20 text-accent' :
                        tx.status === 'PENDING' ? 'bg-accent3/10 border-accent3/20 text-accent3' :
                        'bg-accent2/10 border-accent2/20 text-accent2'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted flex items-center gap-2">
                      <Clock size={12} /> {tx.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-playfair font-bold text-white flex items-center gap-3">
            <Activity size={20} className="text-accent3" />
            Live Activity
          </h2>
          <div className="bg-card/40 backdrop-blur-xl border border-border rounded-3xl p-6 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 4 && <div className="absolute left-5 top-10 bottom-0 w-[1px] bg-border" />}
                <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 z-10">
                  <Users size={16} className="text-muted" />
                </div>
                <div>
                  <p className="text-xs text-white leading-relaxed">
                    <span className="font-bold">New user registration</span> from Los Angeles, CA.
                  </p>
                  <p className="text-[10px] text-muted mt-1 uppercase tracking-widest font-bold font-inter">5 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
