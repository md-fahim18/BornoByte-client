// src/CourseDetailsMain/CourseDetailsMain.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";

const CourseDetailsMain = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/videos/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load course:", err);
        setError("Failed to load course details.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const checkApproval = async () => {
      try {
        const res = await axios.get("http://localhost:3000/checkApproval", {
          params: {
            userEmail: user?.email,
            courseId: id,
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        setIsApproved(res.data.approved);
      } catch (err) {
        console.error("Approval check failed:", err);
      }
    };

    if (user?.email) checkApproval();
  }, [user?.email, id]);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users/admin/${user?.email}`
        );
        setIsAdmin(res.data.admin);
      } catch (err) {
        console.error("Admin check failed:", err);
      }
    };

    if (user?.email) checkAdmin();
  }, [user?.email]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!course) return <p className="text-center">Course not found</p>;

  // 🧠 Group videos by chapter
  const groupedVideos = course.videos?.reduce((acc, video) => {
    const chapter = video.chapter || "Uncategorized";
    if (!acc[chapter]) acc[chapter] = [];
    acc[chapter].push(video);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      {/* Left/Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
        <p className="text-sm text-gray-500">
          Category: {course.category} | Instructor: {course.instructor}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">
          What you'll learn
        </h2>
        <ul className="list-disc ml-6 text-gray-600">
          {course.whatYouWillLearn?.length > 0 ? (
            course.whatYouWillLearn.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li>No learning outcomes provided.</li>
          )}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">
          Requirements
        </h2>
        <ul className="list-disc ml-6 text-gray-600">
          {course.requirements?.length > 0 ? (
            course.requirements.map((req, idx) => <li key={idx}>{req}</li>)
          ) : (
            <li>No requirements provided.</li>
          )}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-700">
          Course Overview
        </h2>
        <p className="text-gray-600">{course.overview || course.description}</p>

        {(isApproved || isAdmin) && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Course Videos (Grouped by Chapter)
            </h2>
            {Object.keys(groupedVideos).map((chapter, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  {chapter}
                </h3>
                <ul className="list-disc ml-6 text-blue-600 space-y-1">
                  {groupedVideos[chapter].map((vid, i) => (
                    <li key={i}>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {vid.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="text-2xl font-bold text-green-600">
          {course.price === 0 ? "Free" : `৳${course.price}`}
        </h3>
        <p className="text-sm text-gray-600">Duration: {course.duration}</p>

        {!isAdmin && (
          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => navigate(`/enroll-form/${course._id}`)}
          >
            Enroll Now
          </button>
        )}

        {(isApproved || isAdmin) && (
          <p className="text-green-600 text-sm mt-2 text-center">
            ✅ You are enrolled in this course
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsMain;
