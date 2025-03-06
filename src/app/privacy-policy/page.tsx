import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy - Companies Directory',
  description: 'Learn about how Companies Directory collects, uses, and protects your personal information.',
}

const PRIVACY_SECTIONS = [
  {
    title: 'Information We Collect',
    content: `We collect information that you provide directly to us, including:
    • Personal information such as name and email address when you create an account
    • Usage information when you interact with our services
    • Communication data when you contact us
    • Technical data such as IP address and browser information`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the collected information for:
    • Providing and maintaining our services
    • Improving and personalizing user experience
    • Communicating with you about updates and changes
    • Analyzing usage patterns and trends
    • Ensuring security and preventing fraud`,
  },
  {
    title: 'Information Sharing',
    content: `We may share your information with:
    • Service providers who assist in our operations
    • Legal authorities when required by law
    • Business partners with your consent
    We do not sell your personal information to third parties.`,
  },
  {
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to protect your data:
    • Encryption of sensitive information
    • Regular security assessments
    • Access controls and authentication
    • Secure data storage and transmission`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to:
    • Access your personal information
    • Correct inaccurate data
    • Request deletion of your data
    • Opt-out of marketing communications
    • Export your data
    Contact us to exercise these rights.`,
  },
  {
    title: 'Cookies and Tracking',
    content: `We use cookies and similar technologies to:
    • Remember your preferences
    • Analyze site traffic and usage
    • Personalize content and ads
    You can control cookie settings through your browser.`,
  },
  {
    title: 'Children\'s Privacy',
    content: `Our services are not intended for children under 13 years of age. We do not knowingly collect or maintain information from persons under 13 years of age.`,
  },
  {
    title: 'Changes to Privacy Policy',
    content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      description="How we handle and protect your information"
    >
      <div className="space-y-12">
        {/* Last Updated */}
        <div className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Introduction */}
        <section className="prose max-w-none">
          <p className="text-lg text-gray-700">
            At Companies Directory, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you visit our website or use our services. Please read this 
            privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access 
            the site.
          </p>
        </section>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {PRIVACY_SECTIONS.map((section) => (
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
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-4">
            <p className="text-gray-700">Companies Directory</p>
            <p className="text-gray-700">123 Business Avenue</p>
            <p className="text-gray-700">Tech Park, Suite 456</p>
            <p className="text-gray-700">Bangalore, Karnataka 560001</p>
            <p className="text-gray-700">India</p>
            <p className="text-gray-700 mt-2">Email: privacy@companiesdirectory.com</p>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 