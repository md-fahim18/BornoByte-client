import Navbar from "../Navbar";

const TermsOfUse = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto px-6 py-12 text-neutral-800 dark:text-neutral-100">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="mb-4">
          By accessing and using BornoByte, you agree to be bound by the
          following terms and conditions. If you do not agree with any part of
          these terms, please refrain from using our platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          1. Use of the Platform
        </h2>
        <p className="mb-4">
          You agree to use this platform for educational purposes only and not
          for any unlawful or unauthorized activity.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. User Accounts</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">
          3. Content Ownership
        </h2>
        <p className="mb-4">
          All content on BornoByte is owned by us or our content creators. You
          may not reproduce or distribute any content without permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate your access to the platform at any
          time if you violate these terms.
        </p>

        <p className="mt-8 text-sm text-black dark:text-green-400">
          Last updated: July 2025
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
