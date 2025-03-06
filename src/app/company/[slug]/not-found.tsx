import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Not Found</h1>
        <p className="text-gray-600 mb-8">
          The company you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  )
} 