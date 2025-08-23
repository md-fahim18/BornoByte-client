import React from "react";

const JoinTeam = () => {
  return (
    <div className="bg-base-100 text-base-content p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-important-text dark:text-important-text-dark mb-6">Join Our Team</h1>
      <p className="text-lg mb-4">
        At bornoByte, we’re always looking for passionate educators, designers, developers, and community builders.
      </p>
      <ul className="list-disc list-inside space-y-3">
        <li><strong>Mentors:</strong> Teach SSC/HSC/University or skill-based topics.</li>
        <li><strong>Content Creators:</strong> Build beautiful, interactive learning content.</li>
        <li><strong>Tech Team:</strong> Help improve the learning experience.</li>
        <li><strong>Support:</strong> Assist students and parents through help desks.</li>
      </ul>
      <p className="mt-6 text-base">
        Interested? Email us at <a className="text-important-text dark:text-important-text-dark hover:underline" href="mailto:join@bornobyte.com">join@bornobyte.com</a> with your profile or resume.
      </p>
    </div>
  );
};

export default JoinTeam;
