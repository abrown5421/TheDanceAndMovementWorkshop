const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-8 text-gray-900">
      <h1 className="text-4xl font-bold mb-2 font-primary">Privacy Policy</h1>
      <h2 className="text-xl font-medium mb-6 font-primary">Effective Date: May 10th, 2025</h2>

      <p className="mb-4">
        The Dance & Movement Workshop values your privacy. This Privacy Policy explains how we collect, use, share,
        and protect your personal information when you visit our website,&nbsp;
        <a
          href="https://www.thedanceandmovementworkshop.com"
          className="text-primary underline hover:text-secondary"
        >
          thedanceandmovementworkshop.com
        </a>.
      </p>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">1. Information We Collect</h3>
        <p className="mb-2">When you use our website, we may collect the following information:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Session Cookies:</strong> We use cookies to maintain your login session while you are browsing our website.
          </li>
          <li>
            <strong>Usage Data:</strong> We use Google Analytics to collect non-identifying information about how visitors use our website
            (e.g., pages visited, time on site, clicks, browser type, etc.).
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Keep you logged in during your session</li>
          <li>Analyze website usage to improve our services and user experience</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">3. Data Sharing</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Google Analytics:</strong> To track and report website usage statistics. Google may use this data in accordance with
            their own privacy policy.
          </li>
          <li>
            <strong>Internal Use:</strong> The dance studio staff may use aggregated, anonymous data to improve operations.
          </li>
        </ul>
        <p className="mt-2">We do not sell your personal information to third parties.</p>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">4. Your Choices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>You can clear your browser cookies to remove all stored session and analytics data associated with our website.</li>
          <li>
            You may opt out of Google Analytics tracking by installing the&nbsp;
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-secondary"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">5. Data Security</h3>
        <p>
          We take reasonable precautions to protect your data but cannot guarantee absolute security. Using the website implies
          acceptance of these risks.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Effective Date&quot;.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-2">7. Contact Us</h3>
        <p className="mb-1">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p className="mb-1">Email: <a href="mailto:thedanceandmovementworkshop@gmail.com" className="text-primary underline">thedanceandmovementworkshop@gmail.com</a></p>
        
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
