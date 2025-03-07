import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error'],
    errorFormat: 'minimal'
  })
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Handle cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

// Handle unexpected errors
process.on('unhandledRejection', async (error) => {
  console.error('Unhandled Promise Rejection:', error)
  await prisma.$disconnect()
})

process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception:', error)
  await prisma.$disconnect()
  process.exit(1)
}) 