import Navbar from "../Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto px-6 py-12 text-neutral-800 dark:text-neutral-100">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          BornoByte respects your privacy and is committed to protecting your
          personal data. This Privacy Policy outlines how we collect, use, and
          safeguard your information.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Personal information (e.g., name, email)</li>
          <li>Usage data (e.g., pages visited, time spent)</li>
          <li>Technical data (e.g., device, browser type)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          2. How We Use Your Data
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>To provide and maintain our services</li>
          <li>To personalize your experience</li>
          <li>To send relevant updates and promotional content</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We use secure protocols and technologies to protect your data from
          unauthorized access or disclosure.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal
          information. You can also request to opt-out of certain uses.
        </p>

        <p className="mt-8 text-sm text-green-400">Last updated: July 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
