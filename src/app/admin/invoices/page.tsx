import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import InvoiceList from "./InvoiceList";

export default async function AdminInvoicesPage() {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!session || session.user?.email !== adminEmail) {
        redirect("/");
    }

    // Fetch orders that need invoices (Paid but Invoice Pending)
    const pendingInvoices = await prisma.order.findMany({
        where: {
            // @ts-ignore
            invoiceStatus: "PENDING",
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            items: true
        }
    });

    // Fetch already issued invoices (Logs)
    const issuedInvoices = await prisma.order.findMany({
        where: {
            // @ts-ignore
            invoiceStatus: "ISSUED",
        },
        orderBy: {
            updatedAt: "desc"
        },
        take: 50, // Limit log to last 50 for performance
        include: {
            items: true
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">Fatura Yönetimi</h1>
                    <p className="text-gray-400">GİB Portal entegrasyonu ve fatura geçmişi.</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
                    <span className="text-2xl font-black text-primary">{pendingInvoices.length}</span>
                    <span className="text-xs uppercase font-bold text-primary ml-2">Bekleyen</span>
                </div>
            </div>

            <InvoiceList initialOrders={pendingInvoices} issuedOrders={issuedInvoices} />
        </div>
    );
}
