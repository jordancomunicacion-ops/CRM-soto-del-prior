'use client';

import { useEffect, useState } from 'react';
import { Users, Loader2 } from 'lucide-react';

interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    systemTags: string;
    totalSpend: number;
}

export default function AudiencePage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from CENTRAL SERVER (Port 3000)
        fetch('http://localhost:3000/api/crm/customers')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCustomers(data);
            })
            .catch(err => console.error("Failed to connect to Central CRM API", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Audiencia (Clientes)</h2>
                <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    Conectado a: Servidor Central (SOTOdelPRIOR DB)
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : customers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No se encontraron perfiles en la base de datos central.
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Identidad</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Origen</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Gasto Total (LTV)</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {customers.map((c) => (
                                        <tr key={c.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground font-bold text-xs">
                                                        {c.firstName?.[0]}{c.lastName?.[0]}
                                                    </div>
                                                    {c.firstName} {c.lastName}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                    {c.systemTags?.replace('_', ' ') || 'UNKNOWN'}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                €{Number(c.totalSpend).toFixed(2)}
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {c.email}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
