import React from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Prisma } from '@prisma/client'
import { SearchBar } from '@/components/SearchBar'
import { CompanyList } from '@/components/CompanyList'

export const metadata: Metadata = {
  title: 'Companies Directory - Browse Indian Companies',
  description: 'Browse through millions of registered companies in India. Access company information, financial data, and registration details.',
}

async function getCompanies(page: number = 1, search: string = '') {
  const limit = 50
  const skip = (page - 1) * limit

  const where: Prisma.CompaniesDataWhereInput = search
    ? {
        OR: [
          { company_name: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
          { cin: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
        ],
      }
    : {}

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
        reg_office_address: true,
        url_title: true,
        company_status: true,
      },
    }),
    prisma.companiesData.count({ where }),
  ])

  return {
    companies,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    hasMore: skip + companies.length < total,
  }
}

function createQueryString(name: string, value: string, searchParams: { [key: string]: string | string[] | undefined }) {
  const params = new URLSearchParams()
  // Preserve existing search parameters
  for (const [key, val] of Object.entries(searchParams)) {
    if (key !== name && val) { // Skip the parameter we're updating
      if (Array.isArray(val)) {
        val.forEach(v => params.append(key, v))
      } else {
        params.set(key, val)
      }
    }
  }
  // Add the new parameter
  params.set(name, value)
  return params.toString()
}

function getPaginationRange(currentPage: number, totalPages: number): (number | string)[] {
  const delta = 2; // Number of pages to show before and after current page
  const range: (number | string)[] = [];

  // Always add first page
  range.push(1);

  // Calculate start and end of the middle range
  let startPage = Math.max(2, currentPage - delta);
  let endPage = Math.min(totalPages - 1, currentPage + delta);

  // Add dots after 1 if there's a gap
  if (startPage > 2) {
    range.push('...');
  }

  // Add middle range
  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  // Add dots before last page if there's a gap
  if (endPage < totalPages - 1) {
    range.push('...');
  }

  // Always add last page if it's not already included
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}

const INDUSTRY_CATEGORIES = [
  {
    name: 'Technology',
    count: '50,000+',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Manufacturing',
    count: '75,000+',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    name: 'Financial Services',
    count: '45,000+',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Healthcare',
    count: '35,000+',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

const FEATURES = [
  {
    title: 'Comprehensive Database',
    description: 'Access detailed information about 30 lakh+ registered companies in India',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: 'Real-time Updates',
    description: 'Stay informed with the latest company registrations and updates',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Advanced Search',
    description: 'Find companies by name, CIN, directors, location, and more',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
]

const STATS = [
  { label: 'Companies Listed', value: '30L+' },
  { label: 'Monthly Searches', value: '1M+' },
  { label: 'Data Accuracy', value: '99.9%' },
  { label: 'Daily Updates', value: '1000+' },
]

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const search = (searchParams.search as string) || ''
  const { companies, total, totalPages, currentPage } = await getCompanies(page, search)
  const paginationRange = getPaginationRange(currentPage, totalPages)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Companies Directory</span>
          <span className="block text-blue-600">Find Company Information</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Access detailed information about {total.toLocaleString()}+ registered companies in India.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar initialSearch={search} />
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {companies.length} of {total.toLocaleString()} companies
          {search && ` matching "${search}"`}
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/company/${company.url_title || company.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {company.company_name}
            </h2>
            {company.cin && (
              <p className="text-sm text-gray-600 mb-2">CIN: {company.cin}</p>
            )}
            {company.company_category && (
              <p className="text-sm text-gray-600 mb-2">
                Category: {company.company_category}
              </p>
            )}
            {company.company_status && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                company.company_status.toLowerCase() === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {company.company_status}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-2">
          {/* Previous Button */}
          <Link
            href={`/?${createQueryString('page', (currentPage - 1).toString(), searchParams)}`}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          >
            Previous
          </Link>

          {/* Page Numbers */}
          {getPaginationRange(currentPage, totalPages).map((pageNum, i) => (
            <React.Fragment key={i}>
              {pageNum === '...' ? (
                <span className="px-4 py-2 text-gray-700">...</span>
              ) : (
                <Link
                  href={`/?${createQueryString('page', pageNum.toString(), searchParams)}`}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    currentPage === pageNum
                      ? 'z-10 bg-blue-600 text-white'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* Next Button */}
          <Link
            href={`/?${createQueryString('page', (currentPage + 1).toString(), searchParams)}`}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
          >
            Next
          </Link>
        </nav>
      </div>
    </div>
  )
} 