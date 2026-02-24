'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import NeonInput from '@/components/ui/NeonInput';
import GlassButton from '@/components/ui/GlassButton';
import { Lock, AlertOctagon } from 'lucide-react';

export default function AdminLockScreen() {
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/verify-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key }),
            });

            if (res.ok) {
                router.refresh();
            } else {
                setError('Geçersiz Erişim Anahtarı!');
            }
        } catch (err) {
            setError('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-red-900/10 animate-pulse pointer-events-none" />

            <GlassCard className="w-full max-w-md p-8 border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/50 shadow-neon">
                        <Lock size={40} className="text-red-500" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-black text-white uppercase tracking-widest">Yönetici Erişimi</h1>
                        <p className="text-red-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                            <AlertOctagon size={14} />
                            Güvenlik Protokolü Devrede
                        </p>
                    </div>

                    <form onSubmit={handleUnlock} className="w-full space-y-4">
                        <NeonInput
                            type="password"
                            placeholder="Güvenlik Anahtarını Girin"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="text-center tracking-[0.5em] font-mono text-lg"
                            autoFocus
                        />

                        {error && (
                            <p className="text-red-500 text-xs font-bold animate-shake">{error}</p>
                        )}

                        <GlassButton
                            variant="primary"
                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black tracking-widest"
                            disabled={loading}
                        >
                            {loading ? 'DOĞRULANIYOR...' : 'KİLİDİ AÇ'}
                        </GlassButton>
                    </form>

                    <div className="text-[10px] text-gray-600 font-mono">
                        IP ADRESİNİZ LOGLANIYOR
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
