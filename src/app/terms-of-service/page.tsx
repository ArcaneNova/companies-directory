import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service - Companies Directory',
  description: 'Read our terms of service to understand the rules and guidelines for using Companies Directory.',
}

const TERMS_SECTIONS = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing and using Companies Directory ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our service.

We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page. Continued use of the Service after changes constitutes acceptance of the modified terms.`,
  },
  {
    title: 'User Registration',
    content: `To access certain features of the Service, you may be required to register for an account. You agree to:
    • Provide accurate and complete information
    • Maintain and update your information
    • Keep your account credentials secure
    • Not share your account with others
    • Notify us immediately of any unauthorized access`,
  },
  {
    title: 'Acceptable Use',
    content: `You agree not to:
    • Use the Service for any illegal purpose
    • Violate any laws or regulations
    • Impersonate any person or entity
    • Interfere with the Service's operation
    • Attempt to gain unauthorized access
    • Collect user information without consent
    • Engage in automated data collection without permission
    • Transmit malware or harmful code`,
  },
  {
    title: 'Content and Data',
    content: `The Service provides access to company information and related data. While we strive for accuracy:
    • We do not guarantee the accuracy of information
    • Data is provided "as is" without warranties
    • Users should verify critical information independently
    • We may update or modify data without notice
    • Users are responsible for their use of the data`,
  },
  {
    title: 'Intellectual Property',
    content: `All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are owned by Companies Directory and protected by intellectual property laws.

You may not:
    • Copy, modify, or distribute our content
    • Use our trademarks without permission
    • Reverse engineer our software
    • Remove copyright or proprietary notices`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, Companies Directory shall not be liable for:
    • Direct, indirect, or consequential damages
    • Loss of profits or data
    • Business interruption
    • Any damages arising from use of the Service
    • Accuracy of information provided
    • Third-party content or websites`,
  },
  {
    title: 'Termination',
    content: `We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including:
    • Violation of these Terms
    • Fraudulent or illegal activities
    • Harmful behavior to other users
    • Non-payment of fees (if applicable)
    • At our sole discretion`,
  },
  {
    title: 'Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.`,
  },
]

export default function TermsOfServicePage() {
  return (
    <PageLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our service"
    >
      <div className="space-y-12">
        {/* Last Updated */}
        <div className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Introduction */}
        <section className="prose max-w-none">
          <p className="text-lg text-gray-700">
            These Terms of Service ("Terms") govern your access to and use of Companies Directory, including any 
            content, functionality, and services offered through our website. Please read these Terms carefully 
            before using our service.
          </p>
        </section>

        {/* Terms Sections */}
        <div className="space-y-8">
          {TERMS_SECTIONS.map((section) => (
            <section key={section.title} className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700">{section.content}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Contact Information */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="mt-4">
            <p className="text-gray-700">Companies Directory</p>
            <p className="text-gray-700">123 Business Avenue</p>
            <p className="text-gray-700">Tech Park, Suite 456</p>
            <p className="text-gray-700">Bangalore, Karnataka 560001</p>
            <p className="text-gray-700">India</p>
            <p className="text-gray-700 mt-2">Email: legal@companiesdirectory.com</p>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 