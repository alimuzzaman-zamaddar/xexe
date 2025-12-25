import { useEffect } from "react";

const TermsAndConditions = () => {
          useEffect(() => {
        window.scrollTo(0, 0);  // This scrolls to the top of the page
      }, []); 
  return (
    <section className=" py-16 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Terms & Conditions</h1>

        <div className="space-y-8 text-lg text-gray-700">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
            <p>By accessing or using Xeltra Software, you agree to be bound by these Terms. If you do not agree, you may not use the Service.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">2. Service Description</h2>
            <p>
              Xeltra Software is a cloud-based platform offering AI-powered tools to verify and analyze emails and documents for risk, fraud, or authenticity issues. It is provided "as is".
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">3. No Guarantee / Disclaimer</h2>
            <p>
              We do not guarantee or warrant the accuracy, reliability, or completeness of risk assessments. All use of Xeltra Software is at your own risk.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">4. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Upload lawful content only</li>
              <li>Do not use the software for illegal activities</li>
              <li>Respect third-party privacy rights</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">5. Account & Access</h2>
            <p>You must provide accurate registration details. You are responsible for maintaining the confidentiality of your credentials. We may suspend or terminate access for violations.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">6. Payment & Subscription</h2>
            <p>Subscription fees are required to access premium features. All payments are non-refundable unless otherwise required by law. We reserve the right to change pricing with 30 days’ notice.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">7. Intellectual Property</h2>
            <p>All content, source code, features, and trademarks belong to Xeltra Software. You may not copy or distribute the service without written consent.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Xeltra Software shall not be liable for any indirect, incidental, or consequential damages.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">9. Termination</h2>
            <p>We reserve the right to suspend or terminate your access without notice if you violate these terms. You may cancel your account at any time.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">10. Governing Law</h2>
            <p>These terms are governed by the laws of Germany. Disputes shall be resolved in the courts of Frankfurt am Main.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">11. Changes</h2>
            <p>We may modify these Terms at any time. Continued use of Xeltra Software after changes indicates acceptance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
