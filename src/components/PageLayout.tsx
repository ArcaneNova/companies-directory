import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
}

export function PageLayout({ children, title, description, className = '' }: PageLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 text-xl text-gray-600">{description}</p>
          )}
        </div>
        <div className={`bg-white rounded-lg shadow-sm px-6 py-8 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  )
} 