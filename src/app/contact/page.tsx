import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Companies Directory. We are here to help with your inquiries about company information and our services.',
}

const CONTACT_METHODS = [
  {
    name: 'Email Support',
    description: 'For general inquiries and assistance',
    email: 'arshadnoor585@gmail.com',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Business Inquiries',
    description: 'For partnerships and business opportunities',
    email: 'business@companiesdirectory.com',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Technical Support',
    description: 'For technical issues and bug reports',
    email: 'tech@companiesdirectory.com',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact Us"
      description="We're here to help and answer any questions you might have"
    >
      <div className="space-y-12">
        {/* Contact Methods */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {CONTACT_METHODS.map((method) => (
              <div
                key={method.name}
                className="relative bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
              >
                <div className="absolute top-6 left-6">{method.icon}</div>
                <div className="pl-12">
                  <h3 className="text-lg font-medium text-gray-900">{method.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{method.description}</p>
                  <a
                    href={`mailto:${method.email}`}
                    className="mt-3 inline-flex text-sm text-blue-600 hover:text-blue-500"
                  >
                    {method.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>

        {/* Office Location */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Office</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Headquarters</h3>
                <address className="mt-3 text-gray-600 not-italic">
                  123 Business Avenue<br />
                  Tech Park, Suite 456<br />
                  Bangalore, Karnataka 560001<br />
                  India
                </address>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                <div className="mt-3 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 