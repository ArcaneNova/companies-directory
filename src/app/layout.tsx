import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Companies Directory',
    template: '%s | Companies Directory',
  },
  description: 'Find detailed information about registered companies in India',
  keywords: ['companies', 'business', 'directory', 'india', 'registration'],
  authors: [{ name: 'Companies Directory' }],
  creator: 'Companies Directory',
  publisher: 'Companies Directory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Companies Directory',
              description: 'Find detailed information about registered companies in India',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} h-full flex flex-col`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 