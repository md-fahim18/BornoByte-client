import React from "react";

const Blog = () => {
  return (
    <div className="bg-base-100 text-base-content p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">bornoByte Blog</h1>
      <p className="text-lg mb-6">
        Explore helpful articles, learning tips, and platform updates.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-base-200 p-4 rounded-md shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Sample Blog Title #{i}</h3>
            <p className="text-sm">
              This is a sample summary of the blog post. Replace this with real content or integrate with CMS.
            </p>
            <button className="mt-3 btn btn-sm btn-outline text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
