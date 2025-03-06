import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Careers at Companies Directory',
  description: 'Join our team and help build the future of company information accessibility. Explore current job openings and learn about our culture.',
}

const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '5+ years',
    description: 'We are looking for a Senior Full Stack Developer to join our engineering team and help build scalable solutions for processing and presenting company data.',
  },
  {
    id: 2,
    title: 'Data Analyst',
    department: 'Data Science',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Join our data science team to analyze and derive insights from our vast database of company information.',
  },
  {
    id: 3,
    title: 'Product Manager',
    department: 'Product',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Lead product initiatives and work closely with engineering and design teams to deliver exceptional user experiences.',
  },
]

const BENEFITS = [
  {
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance for you and your family',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Learning & Development',
    description: 'Annual learning budget and regular training programs',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible working hours and remote work options',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Stock Options',
    description: 'Employee stock ownership program',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

export default function CareersPage() {
  return (
    <PageLayout
      title="Join Our Team"
      description="Help us make company information more accessible and transparent"
    >
      <div className="space-y-12">
        {/* Mission Statement */}
        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At Companies Directory, we're building the most comprehensive and accessible platform for company information in India. 
            We believe in transparency, innovation, and making data accessible to everyone. Join us in our mission to transform 
            how people access and understand company information.
          </p>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Join Us?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>
          <div className="space-y-6">
            {OPEN_POSITIONS.map((position) => (
              <div
                key={position.id}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{position.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {position.department}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {position.location}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500">
                        <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
                <p className="mt-4 text-gray-600">{position.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Experience: {position.experience}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Hiring Process</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-medium text-gray-900">Application Review</h3>
              <p className="mt-2 text-sm text-gray-500">We review your application and resume</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-medium text-gray-900">Initial Interview</h3>
              <p className="mt-2 text-sm text-gray-500">Virtual chat with our hiring team</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-medium text-gray-900">Technical Round</h3>
              <p className="mt-2 text-sm text-gray-500">Skills assessment and team interaction</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">4</div>
              <h3 className="font-medium text-gray-900">Final Decision</h3>
              <p className="mt-2 text-sm text-gray-500">Offer letter and onboarding</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 