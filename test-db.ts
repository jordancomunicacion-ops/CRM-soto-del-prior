
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Testing DB connection...')
        const profileCount = await prisma.customerProfile.count()
        console.log(`Connection successful. Profile count: ${profileCount}`)

        console.log('Testing query with items...')
        const sales = await prisma.sale.findMany({
            take: 1,
            include: { items: true }
        })
        console.log('Query successful.')
    } catch (e) {
        console.error('Diagnostic failed:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
