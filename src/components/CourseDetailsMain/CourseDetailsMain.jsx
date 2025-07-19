
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

  // Load course info
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

  // Check if user is approved for this course
  useEffect(() => {
    const checkApproval = async () => {
      try {
        // const res = await axios.get(
        //   `http://localhost:3000/enrollments/check/${user?.email}/${id}`
        // );
        // ✅ NEW (Matches backend route)
const res = await axios.get(
  `http://localhost:3000/checkApproval`,
  {
    params: {
      userEmail: user?.email,
      courseId: id
    },
      headers: {
    authorization: `Bearer ${localStorage.getItem('access-token')}`
  }
  }
);

        setIsApproved(res.data.approved);
      } catch (err) {
        console.error("Approval check failed:", err);
      }
    };

    if (user?.email) checkApproval();
  }, [user?.email, id]);

  // Check if user is admin
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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg shadow"
      />
      <h1 className="text-3xl font-bold mt-4 mb-2 text-orange-500">
        {course.title}
      </h1>
      <p className="text-gray-600">{course.category}</p>
      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>

      <div className="mt-6 space-y-3">
        <h3 className="text-xl font-semibold">Course Overview</h3>
        <p>{course.description || "No overview available."}</p>

        <h3 className="text-xl font-semibold">Duration</h3>
        <p>{course.duration}</p>

        <h3 className="text-xl font-semibold">Price</h3>
        <p>{course.price === 0 ? "Free" : `৳${course.price}`}</p>

        {/* ✅ Only show videos if approved or admin */}
        {(isApproved || isAdmin) && (
          <>
            <h3 className="text-xl font-semibold">Videos</h3>
            <ul className="list-disc ml-6">
              {course.videos?.map((vid, idx) => (
                <li key={idx}>
                  {vid.title} –{" "}
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Watch
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* ✅ Show enroll button only if not admin */}
      {!isAdmin && (
        <button
          className="btn btn-primary mt-6 w-full sm:w-auto"
          onClick={() => navigate(`/enroll-form/${course._id}`)}
        >
          Enroll Now
        </button>
      )}
    </div>
  );
};

export default CourseDetailsMain;
