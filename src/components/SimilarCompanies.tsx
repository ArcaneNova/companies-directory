'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface SimilarCompany {
  id: number
  company_name: string
  company_category: string | null
  reg_office_address: string | null
  url_title: string | null
  company_state_code: string | null
}

interface SimilarCompaniesProps {
  companyId: number
  category: string | null
  state: string | null
}

export function SimilarCompanies({ companyId, category, state }: SimilarCompaniesProps) {
  const [companies, setCompanies] = useState<SimilarCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSimilarCompanies() {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/companies/similar?companyId=${companyId}&category=${encodeURIComponent(category || '')}&state=${encodeURIComponent(state || '')}`
        )
        if (!response.ok) throw new Error('Failed to fetch similar companies')
        const data = await response.json()
        setCompanies(data.companies)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarCompanies()
  }, [companyId, category, state])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-lg shadow animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  if (companies.length === 0) {
    return <div className="text-gray-600">No similar companies found.</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Link
          key={company.id}
          href={`/company/${company.url_title || company.id}`}
          className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {company.company_name}
          </h3>
          {company.company_category && (
            <p className="text-sm text-gray-600 mb-1">
              Category: {company.company_category}
            </p>
          )}
          {company.reg_office_address && (
            <p className="text-sm text-gray-600 line-clamp-2">
              Address: {company.reg_office_address}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
} 