export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Configuración</h2>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <h3 className="text-lg font-medium mb-4">Preferencias del Sistema</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <span>Notificaciones por Email</span>
                        <div className="h-6 w-10 bg-primary rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
