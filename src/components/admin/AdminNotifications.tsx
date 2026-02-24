'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AdminNotifications() {
    const [hasNewOrders, setHasNewOrders] = useState(false);
    // Track IDs of orders we have already alerted about or user has seen
    const acknowledgedOrderIds = useRef<Set<string>>(new Set());
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Initialize audio
        const audio = new Audio("https://cdn.freesound.org/previews/316/316847_4939433-lq.mp3");
        audio.loop = true;
        audioRef.current = audio;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Logic to handle checking orders
    useEffect(() => {
        const checkOrders = async () => {
            try {
                const res = await fetch('/api/admin/orders');
                if (res.ok) {
                    const orders = await res.json();

                    // Filter critical orders (PENDING or PAID)
                    const criticalOrders = orders.filter((o: any) => o.status === 'PENDING' || o.status === 'PAID');

                    // IF USER IS ON ORDERS PAGE: Acknowledge everything immediately and maintain silence
                    if (window.location.pathname === '/admin/orders') {
                        criticalOrders.forEach((o: any) => acknowledgedOrderIds.current.add(o.id));
                        setHasNewOrders(false);
                        return;
                    }

                    // Check for ANY ID that is NOT in our acknowledged list
                    let hasUnseen = false;
                    for (const order of criticalOrders) {
                        if (!acknowledgedOrderIds.current.has(order.id)) {
                            hasUnseen = true;
                            break;
                        }
                    }

                    if (hasUnseen) {
                        setHasNewOrders(true);
                    } else {
                        // If all critical orders are acknowledged (e.g. we saw them, and no new ones came), silence.
                        setHasNewOrders(false);
                    }
                }
            } catch (error) {
                console.error("Error checking orders:", error);
            }
        };

        checkOrders();
        // Check every 5 seconds for faster response
        const interval = setInterval(checkOrders, 5000);
        return () => clearInterval(interval);
    }, [pathname]); // Re-run effect when pathname changes to immediately trigger acknowledgement logic

    useEffect(() => {
        // Audio Control
        if (hasNewOrders) {
            audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
        } else {
            audioRef.current?.pause();
            if (audioRef.current) audioRef.current.currentTime = 0;
        }
    }, [hasNewOrders]);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {hasNewOrders && (
                <div
                    onClick={() => {
                        setHasNewOrders(false);
                        // Manually acknowledge current orders if user clicks dismiss
                        // This prevents it from ringing again immediately for the same orders
                        fetch('/api/admin/orders').then(res => res.json()).then(orders => {
                            const critical = orders.filter((o: any) => o.status === 'PENDING' || o.status === 'PAID');
                            critical.forEach((o: any) => acknowledgedOrderIds.current.add(o.id));
                        });
                    }}
                    className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-lg animate-pulse flex items-center gap-4 cursor-pointer hover:bg-red-700 transition-colors"
                >
                    <span className="text-xl">🔔</span>
                    <div>
                        <p className="font-bold">Yeni Sipariş!</p>
                        <p className="text-xs">Bildirimi kapatmak için tıklayın veya sayfaya gidin.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
