import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Companies Directory',
  description: 'Find answers to commonly asked questions about Companies Directory, our services, and how to use our platform.',
}

const FAQ_CATEGORIES = [
  {
    title: 'General Questions',
    questions: [
      {
        question: 'What is Companies Directory?',
        answer: 'Companies Directory is a comprehensive platform that provides detailed information about registered companies in India. Our database includes over 3 million companies with up-to-date information about their registration, financials, and other important details.',
      },
      {
        question: 'Is the information on Companies Directory reliable?',
        answer: 'Yes, our data is sourced directly from official government records and reliable sources. However, we recommend verifying critical information independently as data accuracy may vary based on the source and update frequency.',
      },
      {
        question: 'How often is the information updated?',
        answer: 'We update our database regularly to ensure the information remains current. Most company records are updated monthly, while some information may be updated more frequently based on availability and source.',
      },
    ],
  },
  {
    title: 'Using the Service',
    questions: [
      {
        question: 'Do I need to create an account to use Companies Directory?',
        answer: 'Basic company information is available without an account. However, creating a free account gives you access to additional features like saving searches, setting up alerts, and viewing detailed company information.',
      },
      {
        question: 'How can I search for a company?',
        answer: 'You can search for companies using various parameters including company name, CIN (Corporate Identity Number), directors\' names, or location. Our advanced search features allow for filtered and targeted searches.',
      },
      {
        question: 'Can I download company information?',
        answer: 'Yes, registered users can download company information in various formats. Different download options are available based on your subscription level.',
      },
    ],
  },
  {
    title: 'Account & Subscription',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Click on the "Sign Up" button in the top right corner of the page. Fill in your details, verify your email address, and you\'re ready to go. The basic account is free.',
      },
      {
        question: 'What are the different subscription plans?',
        answer: 'We offer multiple subscription tiers: Free, Basic, Professional, and Enterprise. Each tier provides different levels of access to company data and features. Visit our pricing page for detailed information.',
      },
      {
        question: 'Can I upgrade or downgrade my subscription?',
        answer: 'Yes, you can change your subscription plan at any time. Changes will take effect at the start of your next billing cycle. Any unused portion of your current subscription will be prorated.',
      },
    ],
  },
  {
    title: 'Technical Support',
    questions: [
      {
        question: 'What should I do if I find incorrect information?',
        answer: 'If you notice any discrepancies in the company information, please use our "Report Error" feature on the company page or contact our support team. We\'ll investigate and update the information if necessary.',
      },
      {
        question: 'How can I contact support?',
        answer: 'You can reach our support team through multiple channels: email at support@companiesdirectory.com, the contact form on our website, or live chat during business hours.',
      },
      {
        question: 'Is there an API available?',
        answer: 'Yes, we offer a REST API for developers and businesses who want to integrate company data into their applications. API access is available with our Professional and Enterprise plans.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <PageLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about Companies Directory"
    >
      <div className="space-y-12">
        {/* Introduction */}
        <section className="prose max-w-none">
          <p className="text-lg text-gray-700">
            Find answers to commonly asked questions about Companies Directory. If you can't find what you're 
            looking for, please don't hesitate to contact our support team.
          </p>
        </section>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {FAQ_CATEGORIES.map((category) => (
            <section key={category.title}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.questions.map((item) => (
                  <div
                    key={item.question}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still Need Help */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-700 mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Support
            </a>
            <a
              href="/help-center"
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Visit Help Center
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 