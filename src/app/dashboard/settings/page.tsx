'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import NeonInput from '@/components/ui/NeonInput';
import GlassButton from '@/components/ui/GlassButton';
import { useSession } from 'next-auth/react';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import Skeleton from '@/components/ui/Skeleton';

export default function SettingsPage() {
    const { data: session, update, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/user/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
                // Update local session
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        name: data.name,
                        email: data.email
                    }
                });
                setTimeout(() => setSuccess(false), 3000);
            } else {
                alert('Güncelleme başarısız.');
            }
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
                <Skeleton className="h-10 w-48" />
                <GlassCard className="p-8 space-y-6">
                    <div className="flex justify-center mb-8">
                        <Skeleton className="w-24 h-24 rounded-full" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-20 w-full mt-4" />
                    <Skeleton className="h-14 w-full mt-6" />
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-black mb-8 text-white">Hesap Ayarları</h1>

            <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white shadow-neon border-4 border-black">
                            {session?.user?.name?.charAt(0) || 'U'}
                        </div>
                    </div>

                    <NeonInput
                        label="Ad Soyad"
                        name="name"
                        defaultValue={session?.user?.name || ''}
                        placeholder="Adınız Soyadınız"
                        required
                    />

                    <NeonInput
                        label="E-posta Adresi"
                        name="email"
                        type="email"
                        defaultValue={session?.user?.email || ''}
                        placeholder="ornek@email.com"
                        required
                    />

                    <div className="pt-4 border-t border-white/10 mt-4">
                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Şifre Değiştir (İsteğe Bağlı)</h3>
                        <NeonInput
                            label="Yeni Şifre"
                            name="password"
                            type="password"
                            placeholder="Değiştirmek istemiyorsanız boş bırakın"
                        />
                    </div>

                    <div className="pt-6">
                        <GlassButton
                            variant="primary"
                            className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? 'GÜNCELLENİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
                            {success && <CheckCircle className="text-white" size={20} />}
                        </GlassButton>
                    </div>

                    {success && (
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center font-bold text-sm">
                            Profiliniz başarıyla güncellendi!
                        </div>
                    )}
                </form>
            </GlassCard>
        </div>
    );
}
