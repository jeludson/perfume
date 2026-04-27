'use client'

import { useState, useEffect } from 'react'
import { Users, Mail, Shield, Trash2, Edit } from 'lucide-react'

interface User {
  id: string
  name: string | null
  email: string | null
  role: string
  createdAt: string
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch users", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-playfair font-bold text-white mb-2">User Management</h1>
        <p className="text-muted text-xs uppercase tracking-widest font-inter">Manage all registered users and their roles</p>
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-border rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center bg-surface/30">
          <h2 className="text-xl font-playfair font-bold text-white flex items-center gap-3">
            <Users size={20} className="text-accent" />
            Active Users
          </h2>
          <span className="bg-accent/10 border border-accent/20 text-accent text-[10px] px-3 py-1 rounded-full font-bold">
            Total: {users.length}
          </span>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-muted font-bold">Full Name</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-muted font-bold">Email Address</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-muted font-bold">Role</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-muted font-bold">Joined</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-muted font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center text-muted font-inter uppercase text-xs tracking-widest animate-pulse">
                  Loading elite database...
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-accent">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-bold text-white font-inter">{user.name || 'Unknown User'}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-xs text-muted font-inter">
                    <Mail size={14} className="text-accent/50" />
                    {user.email}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`text-[9px] font-bold px-3 py-1 rounded-full border flex items-center gap-2 w-fit ${
                    user.role === 'ADMIN' 
                      ? 'bg-accent3/10 border-accent3/20 text-accent3' 
                      : 'bg-accent/10 border-accent/20 text-accent'
                  }`}>
                    <Shield size={10} />
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5 text-xs text-muted font-inter">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg bg-surface border border-border text-muted hover:text-accent hover:border-accent/30 transition-all">
                      <Edit size={14} />
                    </button>
                    <button className="p-2 rounded-lg bg-surface border border-border text-muted hover:text-accent2 hover:border-accent2/30 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
