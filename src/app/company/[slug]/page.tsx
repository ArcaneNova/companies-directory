import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Script from 'next/script'
import Link from 'next/link'
import { SimilarCompanies } from '@/components/SimilarCompanies'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues with Leaflet
const CompanyMap = dynamic(() => import('@/components/CompanyMap').then(mod => mod.CompanyMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
  ),
})

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = await prisma.companiesData.findFirst({
    where: {
      OR: [
        { url_title: params.slug },
        { id: parseInt(params.slug) || 0 },
      ],
    },
  })

  if (!company) {
    return {
      title: 'Company Not Found',
      description: 'The requested company could not be found.',
    }
  }

  return {
    title: company.company_name,
    description: `View detailed information about ${company.company_name}, including registration details, financial data, and more.`,
    openGraph: {
      title: company.company_name,
      description: `View detailed information about ${company.company_name}, including registration details, financial data, and more.`,
      type: 'website',
    },
  }
}

async function getNearbyCompanies(companyId: number, state: string | null, limit: number = 6) {
  if (!state) return []
  
  return prisma.companiesData.findMany({
    where: {
      AND: [
        { company_state_code: state },
        { id: { not: companyId } }
      ]
    },
    take: limit,
    select: {
      id: true,
      company_name: true,
      url_title: true,
      company_status: true,
      company_category: true,
    }
  })
}

const FAQ_ITEMS = [
  {
    question: "What is a CIN number?",
    answer: "A Corporate Identity Number (CIN) is a unique 21-digit identification number issued by the Registrar of Companies (ROC) to companies registered in India."
  },
  {
    question: "What is authorized capital?",
    answer: "Authorized capital is the maximum amount of share capital that a company is authorized to issue to shareholders, as specified in its memorandum of association."
  },
  {
    question: "What is paid-up capital?",
    answer: "Paid-up capital is the amount of money a company has received from shareholders in exchange for shares of stock."
  },
  {
    question: "What does company status mean?",
    answer: "Company status indicates whether a company is currently active, dormant, under liquidation, or struck off from the register of companies."
  }
]

export default async function CompanyPage({ params }: Props) {
  const company = await prisma.companiesData.findFirst({
    where: {
      OR: [
        { url_title: params.slug },
        { id: parseInt(params.slug) || 0 },
      ],
    },
  })

  if (!company) {
    notFound()
  }

  const nearbyCompanies = await getNearbyCompanies(company.id, company.company_state_code)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.company_name,
    description: `Detailed information about ${company.company_name}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.reg_office_address,
    },
    foundingDate: company.company_reg_date ? new Date(company.company_reg_date).toISOString().split('T')[0] : undefined,
    identifier: company.cin,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/company/${company.url_title || company.id}`,
  }

  return (
    <>
      <Script
        id="company-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {company.company_name}
            </h1>
            {company.cin && (
              <p className="mt-2 text-blue-100">CIN: {company.cin}</p>
            )}
            {company.company_status && (
              <span className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                company.company_status.toLowerCase() === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {company.company_status}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                  <p className="mt-1 text-lg text-gray-900">{company.company_name}</p>
                </div>
                {company.company_roc_code && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ROC Code</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.company_roc_code}</p>
                  </div>
                )}
                {company.company_category && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.company_category}</p>
                  </div>
                )}
                {company.company_subcategory && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Sub Category</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.company_subcategory}</p>
                  </div>
                )}
                {company.company_class && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Class</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.company_class}</p>
                  </div>
                )}
                {company.company_reg_date && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(company.company_reg_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Financial Information */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-600">Authorized Capital</h3>
                  <p className="mt-1 text-2xl font-semibold text-blue-900">
                    ₹{company.authorized_capital?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-600">Paid Up Capital</h3>
                  <p className="mt-1 text-2xl font-semibold text-green-900">
                    ₹{company.paidup_capital?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                {company.listing_status && (
                  <div className="col-span-2 bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-600">Listing Status</h3>
                    <p className="mt-1 text-xl font-semibold text-gray-900">{company.listing_status}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Location Information */}
            {company.reg_office_address && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Registered Office Address</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.reg_office_address}</p>
                  </div>
                  {company.company_state_code && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">State</h3>
                      <p className="mt-1 text-lg text-gray-900">{company.company_state_code}</p>
                    </div>
                  )}
                  {company.company_country && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Country</h3>
                      <p className="mt-1 text-lg text-gray-900">{company.company_country}</p>
                    </div>
                  )}
                  <CompanyMap
                    address={`${company.reg_office_address}, ${company.company_state_code}, India`}
                    companyName={company.company_name}
                  />
                </div>
              </section>
            )}

            {/* Industrial Classification */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Industrial Classification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.nic_code && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">NIC Code</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.nic_code}</p>
                  </div>
                )}
                {company.company_industrial_classification && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Industrial Classification</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.company_industrial_classification}</p>
                  </div>
                )}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Company Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Status</h2>
              <div className="space-y-4">
                {company.company_status && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Current Status</h3>
                    <p className={`mt-1 text-lg font-medium ${
                      company.company_status.toLowerCase() === 'active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {company.company_status}
                    </p>
                  </div>
                )}
                {company.listing_status && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Listing Status</h3>
                    <p className="mt-1 text-lg text-gray-900">{company.listing_status}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Companies */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Companies</h2>
              <SimilarCompanies
                companyId={company.id}
                category={company.company_category}
                state={company.company_state_code}
              />
            </section>

            {/* Nearby Companies */}
            {nearbyCompanies.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Nearby Companies</h2>
                <div className="space-y-4">
                  {nearbyCompanies.map((nearbyCompany) => (
                    <Link
                      key={nearbyCompany.id}
                      href={`/company/${nearbyCompany.url_title || nearbyCompany.id}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                    >
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {nearbyCompany.company_name}
                      </h3>
                      {nearbyCompany.company_category && (
                        <p className="mt-1 text-xs text-gray-500">{nearbyCompany.company_category}</p>
                      )}
                      {nearbyCompany.company_status && (
                        <span className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                          nearbyCompany.company_status.toLowerCase() === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {nearbyCompany.company_status}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 