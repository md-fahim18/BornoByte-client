import Navbar from "../Navbar";

const CookiePolicy = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto px-6 py-12 text-neutral-800 dark:text-neutral-100">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-4">
          This Cookie Policy explains how BornoByte uses cookies and similar
          technologies to improve your experience on our platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          1. What Are Cookies?
        </h2>
        <p className="mb-4">
          Cookies are small text files stored on your device when you visit a
          website. They help the site remember your preferences and improve
          functionality.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          2. How We Use Cookies
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>To remember your login information</li>
          <li>To analyze user behavior and improve our services</li>
          <li>To personalize content and recommendations</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Managing Cookies</h2>
        <p className="mb-4">
          Most browsers allow you to manage cookie settings. You can disable
          cookies, but doing so may affect your user experience.
        </p>

        <p className="mt-8 text-sm text-green-400">Last updated: July 2025</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
