import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Help Center - Companies Directory',
  description: 'Get help with using Companies Directory. Find guides, tutorials, and answers to common questions.',
}

const HELP_CATEGORIES = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using Companies Directory',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    guides: [
      { title: 'Creating an Account', link: '/help-center/account-creation' },
      { title: 'Basic Search Guide', link: '/help-center/basic-search' },
      { title: 'Understanding Company Profiles', link: '/help-center/company-profiles' },
      { title: 'Navigation Tips', link: '/help-center/navigation' },
    ],
  },
  {
    title: 'Advanced Features',
    description: 'Master advanced search and analysis tools',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    guides: [
      { title: 'Advanced Search Techniques', link: '/help-center/advanced-search' },
      { title: 'Data Export Options', link: '/help-center/data-export' },
      { title: 'Custom Alerts Setup', link: '/help-center/alerts' },
      { title: 'Comparative Analysis', link: '/help-center/analysis' },
    ],
  },
  {
    title: 'Account Management',
    description: 'Manage your account and subscription',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    guides: [
      { title: 'Profile Settings', link: '/help-center/profile-settings' },
      { title: 'Subscription Management', link: '/help-center/subscription' },
      { title: 'Billing & Invoices', link: '/help-center/billing' },
      { title: 'Security Settings', link: '/help-center/security' },
    ],
  },
  {
    title: 'API Documentation',
    description: 'Integrate with our API',
    icon: (
      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    guides: [
      { title: 'API Overview', link: '/help-center/api-overview' },
      { title: 'Authentication', link: '/help-center/api-auth' },
      { title: 'Endpoints Reference', link: '/help-center/api-endpoints' },
      { title: 'Rate Limits', link: '/help-center/api-limits' },
    ],
  },
]

const POPULAR_ARTICLES = [
  {
    title: 'How to Search for Companies',
    description: 'Learn different ways to search and filter company information',
    link: '/help-center/search-guide',
  },
  {
    title: 'Understanding Company Data',
    description: 'A guide to interpreting company information and financial data',
    link: '/help-center/data-guide',
  },
  {
    title: 'Subscription Plans Comparison',
    description: 'Compare different subscription plans and their features',
    link: '/help-center/plans',
  },
  {
    title: 'Data Export Guide',
    description: 'How to export and download company information',
    link: '/help-center/export-guide',
  },
]

export default function HelpCenterPage() {
  return (
    <PageLayout
      title="Help Center"
      description="Find the help you need to make the most of Companies Directory"
    >
      <div className="space-y-12">
        {/* Search Section */}
        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How can we help you?</h2>
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="absolute right-3 top-3">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse Help Topics</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HELP_CATEGORIES.map((category) => (
              <div key={category.title} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-500 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.guides.map((guide) => (
                    <li key={guide.title}>
                      <a
                        href={guide.link}
                        className="text-blue-600 hover:text-blue-500 text-sm"
                      >
                        {guide.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {POPULAR_ARTICLES.map((article) => (
              <a
                key={article.title}
                href={article.link}
                className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-500">{article.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Can't find what you're looking for?</h2>
              <p className="text-gray-700">Our support team is here to help you</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 