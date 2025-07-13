const CourseDetail = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Course Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
        Full Stack Web Development
      </h1>

      {/* Top: Image + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Course Image */}
        <div className="lg:col-span-2">
          <img
            src="/images/fullstack.jpg"
            alt="Course Thumbnail"
            className="rounded-xl shadow-md w-full"
          />
        </div>

        {/* Info Sidebar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Course Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-200">
            <strong>Instructor:</strong> Fahim Hossain
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            <strong>Duration:</strong> 12 Weeks
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            <strong>Price:</strong>{" "}
            <span className="text-green-600 font-bold">$199</span>
          </p>

          <button className="btn btn-primary w-full mt-2">Enroll Now</button>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 dark:text-white">
              Tags
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="badge badge-outline">React</span>
              <span className="badge badge-outline">Node.js</span>
              <span className="badge badge-outline">MongoDB</span>
              <span className="badge badge-outline">JavaScript</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="mt-12 space-y-10">
        {/* Overview */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Course Overview
          </h2>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            This course will guide you through the complete journey of becoming
            a full-stack web developer. You’ll learn to build modern responsive
            web apps using React, Node.js, Express, and MongoDB — from scratch
            to deployment.
          </p>
        </div>

        {/* What You’ll Learn */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            What You’ll Learn
          </h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-800 dark:text-gray-200 leading-relaxed">
            <li>Build responsive frontend apps with React</li>
            <li>Create backend APIs using Node and Express</li>
            <li>Connect MongoDB database to your apps</li>
            <li>Implement authentication & authorization</li>
            <li>Deploy full stack apps on the cloud</li>
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Requirements
          </h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-800 dark:text-gray-200 leading-relaxed">
            <li>Basic knowledge of HTML, CSS, and JavaScript</li>
            <li>A laptop or desktop computer with internet</li>
            <li>Curiosity and willingness to learn</li>
          </ul>
        </div>

        {/* Call to Action Again */}
        <div className="text-center mt-10">
          <button className="btn btn-lg btn-primary px-10">
            Start Learning Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
