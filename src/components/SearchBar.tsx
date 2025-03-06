'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchBarProps {
  initialSearch?: string
}

export function SearchBar({ initialSearch = '' }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(initialSearch)
  const debouncedSearch = useDebounce(search, 300)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      params.delete('page') // Reset to first page on new search
      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    if (debouncedSearch !== initialSearch) {
      const queryString = createQueryString('search', debouncedSearch)
      router.push(queryString ? `/?${queryString}` : '/')
    }
  }, [debouncedSearch, initialSearch, router, createQueryString])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryString = createQueryString('search', search)
    router.push(queryString ? `/?${queryString}` : '/')
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search companies by name or CIN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
} 