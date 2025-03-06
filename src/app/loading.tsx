import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      {/* Hero Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm px-6 py-8 sm:py-12 mb-8">
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto"></div>
          <div className="mt-6 h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="mt-3 sm:flex">
            <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
            <div className="mt-3 sm:mt-0 sm:ml-3 h-12 w-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Results Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm px-6 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm overflow-hidden ring-1 ring-gray-200 p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gray-200 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 