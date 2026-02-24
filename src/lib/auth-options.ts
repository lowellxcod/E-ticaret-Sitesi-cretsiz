/**
 * @license
 * Telif Hakkı (c) 2024-2026 lowellxcod & luwex13. Tüm hakları saklıdır.
 * Sızdırılması ve izinsiz kullanımı yasaktır.
 */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// @ts-ignore
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Geçersiz giriş bilgileri");
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Kullanıcı bulunamadı");
                }

                // Check if account is locked
                if (user.lockUntil && user.lockUntil > new Date()) {
                    const remainingMinutes = Math.ceil((user.lockUntil.getTime() - Date.now()) / (1000 * 60));
                    throw new Error(`Hesabınız çok fazla hatalı giriş denemesi nedeniyle kilitlendi. Lütfen ${remainingMinutes} dakika sonra tekrar deneyin.`);
                }

                if (!user.password) {
                    throw new Error("Şifre tanımlanmamış. Lütfen destekle iletişime geçin.");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    // Update failed attempts
                    const newAttempts = user.failedAttempts + 1;
                    const isLocking = newAttempts >= 5;

                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            failedAttempts: newAttempts,
                            lockUntil: isLocking ? new Date(Date.now() + 15 * 60 * 1000) : null, // 15 minutes lockout
                        }
                    });

                    if (isLocking) {
                        throw new Error("Güvenlik nedeniyle hesabınız 15 dakika donduruldu.");
                    }

                    const remaining = 5 - newAttempts;
                    throw new Error(`Hatalı şifre. ${remaining} deneme hakkınız kaldı.`);
                }

                // Success: Reset failure tracking
                if (user.failedAttempts > 0 || user.lockUntil) {
                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            failedAttempts: 0,
                            lockUntil: null,
                        }
                    });
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
};
