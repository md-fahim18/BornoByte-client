// src/components/CourseDetails/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/videos/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Course fetch error", err));
  }, [id]);

  if (!course) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Thumbnail and Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="rounded shadow-lg w-full object-cover"
        />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{course.title}</h2>
          <p className="text-gray-500 text-lg">by {course.instructor}</p>
          <p className="text-sm bg-orange-200 px-3 py-1 inline-block rounded font-medium">
            {course.category}
          </p>
          <p className="text-base text-gray-700">{course.duration} • {course.videos.length} lessons</p>
          <p className="text-2xl font-bold text-orange-500">${course.price}</p>

          {/* Enroll Button */}
          <button className="btn btn-primary">Enroll Now</button>
        </div>
      </div>

      {/* Overview and Content */}
      <div className="mt-12 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Course Overview</h3>
          <p className="text-gray-700">{course.overview || "No overview provided."}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">What You'll Learn</h3>
          <ul className="list-disc list-inside space-y-1">
            {course.videos?.map((v, i) => (
              <li key={i}>{v.title}</li>
            ))}
          </ul>
        </div>

        {course.otherLink && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Additional Resource</h3>
            <a
              href={course.otherLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
