import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    axios.get("https://bornobyte.vercel.app/videos")
      .then(res => {
        const featured = res.data.filter(course => course.featured === true && course.status === "approved");
        setFeaturedCourses(featured);
      })
      .catch(err => console.error("Failed to fetch featured courses", err));
  }, []);

  return (
    <section className=" my-2 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center text-important-text dark:text-important-text-dark">
        🌟 Featured Courses
      </h2>

      {featuredCourses.length === 0 ? (
        <p className="text-center text-gray-500">No featured courses available.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div key={course._id} className="card bg-base-200 shadow-md hover:shadow-2xl transition duration-300 rounded-xl">
              <figure>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-44 object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.category}</p>
                <p className="text-sm font-medium mt-1">
                  By: <span className="text-important-text dark:text-important-text-dark">{course.instructor}</span>
                </p>
                <Link to={`/courses/${course._id}`} className="btn btn-outline btn-md mt-3 font-semibold text-important-text dark:text-important-text-dark
                 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCourses;
