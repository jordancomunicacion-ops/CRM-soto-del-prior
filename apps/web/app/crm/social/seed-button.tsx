"use client"

import { seedSocialData } from "../../actions/social-mock"
import { useState } from "react"

export default function SeedButton() {
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const run = async () => {
        setLoading(true)
        await seedSocialData()
        setLoading(false)
        setDone(true)
        window.location.reload()
    }

    if (done) return <span className="text-green-600 text-sm font-medium">✓ Data Seeded</span>

    return (
        <button
            onClick={run}
            disabled={loading}
            className="text-xs bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800 disabled:opacity-50"
        >
            {loading ? 'Seeding...' : 'Load Mock Data'}
        </button>
    )
}
