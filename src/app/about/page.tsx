import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Companies Directory and our mission to provide comprehensive information about registered companies in India.',
}

const TEAM_MEMBERS = [
  {
    name: 'Md Arshad Noor',
    role: 'Chief Executive Officer',
    image: '/team/ceo.jpg',
    bio: 'He is a software engineer who is passionate about building products that help people.',
  }
]

export default function AboutPage() {
  return (
    <PageLayout
      title="About Us"
      description="Empowering businesses with comprehensive company information"
    >
      <div className="space-y-12">
        {/* Mission Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Companies Directory, we are committed to providing transparent and comprehensive 
            information about registered companies in India. Our mission is to empower businesses, 
            investors, and researchers with accurate and up-to-date company data, making it easier 
            to make informed decisions and conduct thorough market research.
          </p>
        </section>

        {/* What We Do Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Collection</h3>
              <p className="text-gray-600">
                We aggregate and verify company information from official government sources, 
                ensuring the highest level of accuracy in our database.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Information Access</h3>
              <p className="text-gray-600">
                Our platform provides easy access to company details, financial information, 
                and registration data through a user-friendly interface.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Updates</h3>
              <p className="text-gray-600">
                We maintain current information by regularly updating our database with the 
                latest company filings and changes.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Analysis</h3>
              <p className="text-gray-600">
                Our tools help users analyze company data, identify trends, and make 
                data-driven decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Leadership Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="rounded-full bg-gray-200 w-full h-full" />
                  {/* Note: Add actual team member images in public/team/ directory */}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-50 -mx-6 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">30L+</p>
              <p className="text-gray-600">Companies Listed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">1M+</p>
              <p className="text-gray-600">Monthly Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">99.9%</p>
              <p className="text-gray-600">Data Accuracy</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">24/7</p>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 