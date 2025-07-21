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
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/videos/${id}`)
      .then((res) => {
        setCourse(res.data);
        setSelectedVideo(res.data.videos?.[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading course", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!user?.email) return;

    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("access-token");

        const [approvalRes, adminRes] = await Promise.all([
          axios.get(`http://localhost:3000/checkApproval`, {
            params: { userEmail: user.email, courseId: id },
            headers: { authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/users/admin/${user.email}`),
        ]);

        setIsApproved(approvalRes.data.approved);
        setIsAdmin(adminRes.data.admin);
      } catch (err) {
        console.error("Status check failed", err);
      }
    };

    checkStatus();
  }, [user?.email, id]);

  const extractYouTubeID = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
      else if (parsed.hostname.includes("youtube.com")) {
        const params = new URLSearchParams(parsed.search);
        return params.get("v");
      }
    } catch {
      console.error("Invalid video URL:", url);
      return "";
    }
  };

  const groupByChapter = (videos = []) => {
    const grouped = {};
    videos.forEach((vid) => {
      if (!grouped[vid.chapter]) grouped[vid.chapter] = [];
      grouped[vid.chapter].push(vid);
    });
    return grouped;
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!course) return <div className="text-center py-20">Course not found</div>;

  const isEnrolled = isApproved || isAdmin;
  const groupedChapters = groupByChapter(course.videos);

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* === LEFT COLUMN === */}
        <div className="md:col-span-2 space-y-6">
          {isEnrolled && selectedVideo && (
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${extractYouTubeID(selectedVideo.url)}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                allowFullScreen
              />
            </div>
          )}

          <h1 className="text-3xl font-bold text-orange-500">{course.title}</h1>
          <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
          <p className="text-sm">Category: {course.category}</p>
          <p className="text-sm mb-2">Duration: {course.duration}</p>

          <div>
            <h3 className="text-lg font-semibold mb-1">Overview</h3>
            <p>{course.overview || "No overview available"}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">What You’ll Learn</h3>
            <ul className="list-disc ml-6">
              {course.whatYouWillLearn?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Requirements</h3>
            <ul className="list-disc ml-6">
              {course.requirements?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* === CHAPTER CONTENTS (ONLY if NOT ENROLLED) === */}
          {!isEnrolled && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Course Contents</h3>
              <div className="space-y-3">
                {Object.entries(groupedChapters).map(([chapter, vids]) => (
                  <details
                    key={chapter}
                    className="collapse collapse-arrow bg-base-200 rounded-lg"
                  >
                    <summary className="collapse-title font-medium">{chapter}</summary>
                    <div className="collapse-content px-2 py-1">
                      <ul className="space-y-1 text-sm">
                        {vids.map((vid, i) => (
                          <li
                            key={i}
                            className="cursor-pointer text-gray-400 hover:text-orange-500"
                            onClick={() =>
                              document
                                .getElementById("enrollCard")
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            • {vid.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* === RIGHT COLUMN === */}
        <div className="bg-base-200 shadow-xl rounded-xl p-4 self-start w-full">
          {/* === CONTENTS IF ENROLLED === */}
          {isEnrolled && (
            <>
              <h3 className="text-lg font-semibold mb-3">Course Contents</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {Object.entries(groupedChapters).map(([chapter, vids]) => (
                  <details key={chapter} className="collapse collapse-arrow bg-base-100 rounded-lg">
                    <summary className="collapse-title font-medium">{chapter}</summary>
                    <div className="collapse-content px-2 py-1">
                      <ul className="space-y-1 text-sm">
                        {vids.map((vid, i) => (
                          <li
                            key={i}
                            className="cursor-pointer hover:text-orange-500"
                            onClick={() => setSelectedVideo(vid)}
                          >
                            • {vid.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </>
          )}

          {/* === ENROLL CARD === */}
          {!isEnrolled && (
            <div id="enrollCard" className="bg-base-100 p-4 rounded-lg shadow mt-6">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <p className="font-semibold text-lg mb-1">{course.title}</p>
              <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              <p className="text-sm mt-1">Duration: {course.duration}</p>
              <p className="text-lg font-bold mt-2 mb-3">
                {course.price === 0 ? "Free" : `৳${course.price}`}
              </p>
              <button
                className="btn btn-primary w-full"
                onClick={() => navigate(`/enroll-form/${course._id}`)}
              >
                Enroll Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsMain;
