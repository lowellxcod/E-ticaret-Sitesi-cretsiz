/**
 * @license
 * Telif Hakkı (c) 2024-2026 lowellxcod & luwex13. Tüm hakları saklıdır.
 * Bu yazılımın izinsiz satılması, sızdırılması veya üzerinde hak iddia edilmesi kesinlikle yasaktır.
 * Daha fazla bilgi için projenin kök dizinindeki LICENSE.md dosyasını inceleyin.
 */
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
