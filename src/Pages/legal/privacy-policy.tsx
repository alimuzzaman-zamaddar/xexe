import { useEffect } from "react";

const PrivacyPolicy = () => {
      useEffect(() => {
    window.scrollTo(0, 0);  // This scrolls to the top of the page
  }, []); 
  return (
    <section className=" py-16 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-lg text-gray-700">
          <p>
            This Privacy Policy describes how Xeltra ("we", "us", or "our") collects, uses, and safeguards your information when you visit or use our software platform. We take your privacy seriously and comply with the General Data Protection Regulation (GDPR), and other applicable laws. By using our platform, you agree to this policy.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>User-Provided Information:</strong> Full name, email, company name, password, billing information, messages.</li>
              <li><strong>Automatically Collected Data:</strong> IP address, browser type, login timestamps, usage behavior, cookies.</li>
              <li><strong>Uploaded Content:</strong> Emails, documents, and files scanned via our platform.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">2. Purpose of Data Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate and improve our services</li>
              <li>To analyze uploaded content for verification purposes</li>
              <li>To communicate with you about your account or updates</li>
              <li>To comply with legal obligations</li>
              <li>To detect fraud, abuse, or security risks</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">3. Data Sharing & Processors</h2>
            <p>
              We do not sell or rent your personal data. We may use external tools and services (e.g., hosting, analytics, email delivery) that process limited personal data as part of the platform. While we choose reputable providers, we do not maintain formal data protection agreements with all of them. By using Xeltra, you acknowledge and accept this.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">4. International Transfers</h2>
            <p>
              Your data may be processed outside of your country. We implement appropriate safeguards under GDPR (e.g., SCCs, encryption).
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">5. Data Retention</h2>
            <p>
              We retain your personal data as long as your account is active or as needed to comply with legal obligations. You may request deletion at any time.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">6. Your Rights (under GDPR)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your data</li>
              <li>Correct or erase your data</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with your Data Protection Authority</li>
            </ul>
            <p>To exercise these rights, email <strong>info@xeltrasoftware.com</strong>.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">7. Security</h2>
            <p>
              We use technical and organizational security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>HTTPS encryption</li>
              <li>Password hashing</li>
              <li>Access restrictions</li>
              <li>Logging and monitoring</li>
            </ul>
            <p>Despite best efforts, no system is 100% secure. Use our platform at your own risk.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">8. Changes</h2>
            <p>
              We may revise this Privacy Policy from time to time. The latest version will always be available on our website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">9. Contact</h2>
            <p>
              Xeltra Software<br />
              Frankfurt am Main, Germany<br />
              Email: <a href="mailto:info@xeltrasoftware.com" className="text-blue-500">info@xeltrasoftware.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
