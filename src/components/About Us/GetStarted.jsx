import React from "react";

const GetStarted = () => {
  return (
    <div className="bg-base-100 text-base-content p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">How to Get Started</h1>
      <p className="text-lg mb-4">
        Welcome to bornoByte! Getting started is easy. Here's how:
      </p>
      <ol className="list-decimal list-inside space-y-4 text-base">
        <li>Create a free account using your email or phone number.</li>
        <li>Browse our courses and choose the right level (SSC, HSC, Undergraduate, Skill).</li>
        <li>Click "Enroll" and complete your registration (manual or payment-based).</li>
        <li>Start learning instantly through our platform and track your progress.</li>
        <li>Reach out to our mentors or ask questions through the Q&A section.</li>
      </ol>
    </div>
  );
};

export default GetStarted;
