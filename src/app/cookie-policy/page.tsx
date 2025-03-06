import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy - Companies Directory',
  description: 'Learn about how Companies Directory uses cookies and similar technologies to improve your experience.',
}

const COOKIE_CATEGORIES = [
  {
    title: 'Essential Cookies',
    description: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.',
    examples: [
      'Session cookies for user authentication',
      'Security cookies for fraud prevention',
      'Load balancing cookies',
      'User interface customization cookies',
    ],
  },
  {
    title: 'Performance Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    examples: [
      'Analytics cookies to measure visitor traffic',
      'Error monitoring cookies',
      'Performance measurement cookies',
      'A/B testing cookies',
    ],
  },
  {
    title: 'Functionality Cookies',
    description: 'These cookies enable the website to provide enhanced functionality and personalization based on your preferences and choices.',
    examples: [
      'Language preference cookies',
      'Region selection cookies',
      'User customization cookies',
      'Recently viewed items cookies',
    ],
  },
  {
    title: 'Targeting Cookies',
    description: 'These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.',
    examples: [
      'Advertising cookies',
      'Social media cookies',
      'Marketing campaign cookies',
      'Behavioral tracking cookies',
    ],
  },
]

const COOKIE_MANAGEMENT = [
  {
    title: 'Browser Settings',
    description: 'You can control cookies through your browser settings. Most browsers allow you to:',
    options: [
      'Block all cookies',
      'Accept only first-party cookies',
      'Delete cookies when you close your browser',
      'Browse in private/incognito mode',
    ],
  },
  {
    title: 'Our Cookie Controls',
    description: 'We provide several ways to manage cookies on our website:',
    options: [
      'Cookie consent banner',
      'Cookie preference center',
      'Individual cookie opt-outs',
      'Account privacy settings',
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <PageLayout
      title="Cookie Policy"
      description="How we use cookies and similar technologies"
    >
      <div className="space-y-12">
        {/* Last Updated */}
        <div className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Introduction */}
        <section className="prose max-w-none">
          <p className="text-lg text-gray-700">
            This Cookie Policy explains how Companies Directory ("we", "us", and "our") uses cookies and 
            similar technologies to recognize you when you visit our website. It explains what these technologies 
            are and why we use them, as well as your rights to control our use of them.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            By continuing to use our site, you are agreeing to our use of cookies as described in this policy.
          </p>
        </section>

        {/* What are Cookies */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What are Cookies?</h2>
          <p className="text-gray-700">
            Cookies are small text files that are stored on your computer or mobile device when you visit 
            a website. They are widely used to make websites work more efficiently and provide useful 
            information to website owners. Cookies help provide a better and more personalized experience.
          </p>
        </section>

        {/* Cookie Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Types of Cookies We Use</h2>
          <div className="space-y-6">
            {COOKIE_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Examples:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {category.examples.map((example) => (
                      <li key={example} className="text-gray-600 text-sm">{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cookie Management */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Managing Your Cookie Preferences</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {COOKIE_MANAGEMENT.map((section) => (
              <div
                key={section.title}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">{section.title}</h3>
                <p className="text-gray-700 mb-4">{section.description}</p>
                <ul className="list-disc list-inside space-y-2">
                  {section.options.map((option) => (
                    <li key={option} className="text-gray-600">{option}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              For more information about cookies and your privacy rights, you can:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Read our <a href="/privacy-policy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a></li>
              <li>Contact us through our <a href="/contact" className="text-blue-600 hover:text-blue-500">Contact Page</a></li>
              <li>Visit <a href="https://www.aboutcookies.org" className="text-blue-600 hover:text-blue-500">www.aboutcookies.org</a> for detailed information about cookies</li>
            </ul>
          </div>
        </section>

        {/* Updates to Policy */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
          <p className="text-gray-700">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for 
            operational, legal, or regulatory reasons. We encourage you to periodically review this page 
            for the latest information on our cookie practices.
          </p>
        </section>
      </div>
    </PageLayout>
  )
} 