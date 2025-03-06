import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = parseInt(searchParams.get('companyId') || '0')
    const category = searchParams.get('category') || ''
    const state = searchParams.get('state') || ''
    const limit = parseInt(searchParams.get('limit') || '6')

    // Get similar companies based on multiple factors
    const similarCompanies = await prisma.companiesData.findMany({
      where: {
        AND: [
          { id: { not: companyId } }, // Exclude current company
          {
            OR: [
              { company_category: category },
              { company_state_code: state },
            ],
          },
        ],
      },
      take: limit,
      select: {
        id: true,
        company_name: true,
        company_category: true,
        reg_office_address: true,
        url_title: true,
        company_state_code: true,
      },
      orderBy: [
        { company_category: category ? 'asc' : 'desc' }, // Prioritize same category
        { company_state_code: state ? 'asc' : 'desc' }, // Then same state
        { company_name: 'asc' }, // Then alphabetically
      ],
    })

    return NextResponse.json({ companies: similarCompanies })
  } catch (error) {
    console.error('Error fetching similar companies:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 