import React from 'react'
import { Metadata } from 'next'
import { PageLayout } from '@/components/PageLayout'

export const metadata: Metadata = {
  title: 'Disclaimer - Companies Directory',
  description: 'Important legal notices and disclaimers regarding the use of Companies Directory and its services.',
}

const DISCLAIMER_SECTIONS = [
  {
    title: 'Information Accuracy',
    content: `The information provided on Companies Directory is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.

Any reliance you place on such information is strictly at your own risk. We recommend verifying critical information from official sources before making any decisions based on the data provided.`,
  },
  {
    title: 'No Professional Advice',
    content: `The content on Companies Directory should not be construed as professional advice. Before making any business, legal, or financial decisions, you should consult with appropriate professionals such as:
    • Legal advisors
    • Financial consultants
    • Business analysts
    • Tax professionals
    
We are not liable for any actions taken based on the information provided on this website.`,
  },
  {
    title: 'Third-Party Content',
    content: `Our website may include content from third-party sources. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such third-party information is at your own risk.

We are not responsible for any damages arising from your use of, or inability to use, third-party content or websites linked from our platform.`,
  },
  {
    title: 'Service Availability',
    content: `We strive to provide uninterrupted access to our services, but we do not guarantee that:
    • The website will be available at all times
    • The information will be error-free
    • Defects will be corrected immediately
    • The website is free of viruses or other harmful components
    
Service interruptions may occur due to maintenance, updates, or factors beyond our control.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, Companies Directory and its operators shall not be liable for any:
    • Direct, indirect, or consequential losses
    • Business losses
    • Loss of revenue or income
    • Loss of profits or contracts
    • Loss of anticipated savings
    • Loss of data
    • Loss of goodwill
    • Wasted management or office time

This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis.`,
  },
  {
    title: 'Indemnification',
    content: `By using Companies Directory, you agree to indemnify and hold harmless Companies Directory, its operators, affiliates, officers, agents, employees, and partners from any claim or demand, including reasonable attorneys' fees, arising out of:
    • Your use of the service
    • Your violation of these terms
    • Your violation of any rights of another
    • Your violation of applicable laws`,
  },
  {
    title: 'Changes to Service',
    content: `We reserve the right to:
    • Modify or withdraw the service
    • Change prices for premium features
    • Modify these terms
    • Discontinue any features
    
We will provide notice of significant changes when possible, but are not obligated to do so.`,
  },
]

export default function DisclaimerPage() {
  return (
    <PageLayout
      title="Disclaimer"
      description="Important legal notices and limitations"
    >
      <div className="space-y-12">
        {/* Last Updated */}
        <div className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Introduction */}
        <section className="prose max-w-none">
          <p className="text-lg text-gray-700">
            Please read this disclaimer carefully before using Companies Directory. By accessing or using our 
            service, you agree to be bound by this disclaimer. If you disagree with any part of this disclaimer, 
            you must not use our service.
          </p>
        </section>

        {/* Disclaimer Sections */}
        <div className="space-y-8">
          {DISCLAIMER_SECTIONS.map((section) => (
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About This Disclaimer?</h2>
          <p className="text-gray-700">
            If you have any questions about this Disclaimer, please contact us at:
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

        {/* Final Note */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 italic">
            This disclaimer was last updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 
            and applies to all users of Companies Directory. By continuing to use our service, you acknowledge 
            that you have read, understood, and agreed to be bound by this disclaimer.
          </p>
        </section>
      </div>
    </PageLayout>
  )
} 