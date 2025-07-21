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
        const res = await axios.get(`http://localhost:3000/checkApproval`, {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left side: Course Overview */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold text-orange-500">{course.title}</h1>
          <p className="text-gray-500 text-sm">By {course.instructor}</p>
          <p className="text-gray-600 text-md">{course.category}</p>

          <section className="space-y-3 mt-4">
            <h3 className="text-xl font-semibold">Course Overview</h3>
            <p>{course.overview || "No overview available."}</p>

            <h3 className="text-xl font-semibold">What You'll Learn</h3>
            <ul className="list-disc ml-6">
              {course.whatYouWillLearn?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold">Requirements</h3>
            <ul className="list-disc ml-6">
              {course.requirements?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Videos shown only after approval */}
          {(isApproved || isAdmin) && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Course Content</h3>
              <div className="space-y-2 mt-4">
                {course.videos?.map((vid, idx) => (
                  <div
                    key={idx}
                    className="border p-3 rounded-lg shadow-sm hover:bg-base-100 transition"
                  >
                    <p className="font-semibold">{vid.chapter} - {vid.title}</p>
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      Watch
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side: Thumbnail and Enroll */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md flex flex-col justify-between">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="rounded-lg object-cover h-48 w-full mb-4"
          />
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Duration:</span> {course.duration}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              {course.price === 0 ? "Free" : `৳${course.price}`}
            </p>
            <p>
              <span className="font-semibold">Instructor:</span> {course.instructor}
            </p>
          </div>

          {!isAdmin && !isApproved && (
            <button
              onClick={() => navigate(`/enroll-form/${course._id}`)}
              className="btn btn-primary mt-6"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsMain;
