import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '50')))
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Log the query parameters for debugging
    console.log('Query params:', { page, limit, skip, search })

    // Build the where clause
    const where: Prisma.CompaniesDataWhereInput = search
      ? {
          OR: [
            { company_name: { contains: search, mode: 'insensitive' } },
            { cin: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}

    // Execute queries in parallel
    const [companies, total] = await Promise.all([
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
      }).catch(error => {
        console.error('Error fetching companies:', error)
        throw new Error('Failed to fetch companies')
      }),
      prisma.companiesData.count({ where }).catch(error => {
        console.error('Error counting companies:', error)
        throw new Error('Failed to count companies')
      }),
    ])

    // Log the results for debugging
    console.log('Query results:', {
      totalCompanies: total,
      fetchedCompanies: companies.length,
      totalPages: Math.ceil(total / limit),
    })

    if (!companies) {
      throw new Error('No companies data received')
    }

    return NextResponse.json({
      companies,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + companies.length < total,
      limit,
    })
  } catch (error) {
    console.error('Error in companies API:', error)
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
} 