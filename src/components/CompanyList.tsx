'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface Company {
  id: number
  company_name: string
  cin: string | null
  company_category: string | null
  company_subcategory: string | null
  reg_office_address: string | null
  url_title: string | null
  company_status: string | null
  company_state_code: string | null
}

interface CompanyListProps {
  initialPage: number
  initialSearch: string
}

function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 2; // Number of pages to show before and after current page
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l = 0; // Initialize l with 0

  range.push(1);

  if (totalPages <= 1) return range;

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < totalPages && i > 1) {
      range.push(i);
    }
  }
  range.push(totalPages);

  for (let i = 0; i < range.length; i++) {
    if (l) {
      if (range[i] - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (range[i] - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(range[i]);
    l = range[i];
  }

  return rangeWithDots;
}

export function CompanyList({ initialPage, initialSearch }: CompanyListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [retryCount, setRetryCount] = useState(0)

  const currentPage = Number(searchParams.get('page')) || initialPage
  const search = searchParams.get('search') || initialSearch

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function fetchCompanies(retry = 0) {
      try {
        if (isMounted) setLoading(true)
        if (isMounted) setError(null)
        
        console.log('Fetching companies:', {
          page: currentPage,
          search,
          retry
        })

        const response = await fetch(
          `/api/companies?page=${currentPage}&limit=50&search=${encodeURIComponent(search)}`,
          {
            signal: controller.signal,
            headers: {
              'Cache-Control': 'no-cache',
            }
          }
        )

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (!data.companies || !Array.isArray(data.companies)) {
          throw new Error('Invalid response format: companies data is missing or invalid')
        }

        if (isMounted) {
          setCompanies(data.companies)
          setTotalPages(data.totalPages)
          setTotal(data.total)
          setError(null)
        }
      } catch (err) {
        console.error('Error fetching companies:', err)
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching companies'
          setError(errorMessage)
          
          // Retry logic for network errors
          if (retry < 2 && errorMessage.includes('network')) {
            console.log('Retrying due to network error...')
            setTimeout(() => fetchCompanies(retry + 1), 1000 * (retry + 1))
          }
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCompanies()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [currentPage, search, retryCount])

  const handleRetry = () => {
    setRetryCount(count => count + 1)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-center text-gray-600">Loading companies...</div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <p className="font-semibold">Error loading companies</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          {search
            ? `No companies found matching "${search}"`
            : 'No companies found'}
        </p>
      </div>
    )
  }

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <div className="mt-4 text-sm text-gray-600">
        Showing {companies.length} of {total.toLocaleString()} companies
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {currentPage > 1 && (
            <Link
              href={`/?page=${currentPage - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Previous
            </Link>
          )}
          
          {paginationRange.map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === '...' ? (
                <span className="px-4 py-2">...</span>
              ) : (
                <Link
                  href={`/?page=${pageNum}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                  className={`px-4 py-2 rounded ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </Link>
              )}
            </React.Fragment>
          ))}

          {currentPage < totalPages && (
            <Link
              href={`/?page=${currentPage + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
} 