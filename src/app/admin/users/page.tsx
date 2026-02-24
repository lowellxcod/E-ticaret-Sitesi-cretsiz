'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { User, Shield, Mail, Calendar } from 'lucide-react';

interface UserData {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
    _count: {
        orders: number;
    };
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black mb-2">Kullanıcı Yönetimi</h1>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Yükleniyor...</div>
                ) : users.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">Kullanıcı bulunamadı.</div>
                ) : (
                    users.map((user) => (
                        <GlassCard key={user.id} className="p-6 flex items-center justify-between group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center text-white border border-white/10">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg text-white">{user.name || 'İsimsiz Kullanıcı'}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black tracking-widest ${user.role === 'ADMIN' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-gray-500/20 text-gray-400 border border-white/5'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Mail size={12} /> {user.email}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} /> {new Date(user.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">TOPLAM SİPARİŞ</span>
                                <span className="text-2xl font-black text-white font-mono">{user._count.orders}</span>
                            </div>
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}
