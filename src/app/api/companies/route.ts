import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { handleDatabaseError } from '@/lib/error-handler'

export const dynamic = 'force-dynamic'

type CompanyResponse = {
  id: number
  company_name: string | null
  cin: string | null
  company_category: string | null
  company_subcategory: string | null
  reg_office_address: string | null
  url_title: string | null
  company_status: string | null
  company_state_code: string | null
  authorized_capital: Prisma.Decimal | null
  paidup_capital: Prisma.Decimal | null
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '50')))
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Build the where clause
    const where: Prisma.CompaniesDataWhereInput = search
      ? {
          OR: [
            { company_name: { contains: search, mode: 'insensitive' } },
            { cin: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}

    // Execute queries in parallel with a timeout
    const [companies, total] = await Promise.race([
      Promise.all([
        prisma.companiesData.findMany({
          where,
          skip,
          take: limit,
          orderBy: { company_name: 'asc' },
          select: {
            id: true,
            company_name: true,
            cin: true,
            company_category: true,
            company_subcategory: true,
            reg_office_address: true,
            url_title: true,
            company_status: true,
            company_state_code: true,
            authorized_capital: true,
            paidup_capital: true,
          },
        }) as Promise<CompanyResponse[]>,
        prisma.companiesData.count({ where }),
      ]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database query timeout')), 10000)
      ),
    ]) as [CompanyResponse[], number]

    return NextResponse.json({
      companies,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + companies.length < total,
      limit,
    })
  } catch (error) {
    return handleDatabaseError(error)
  }
} 