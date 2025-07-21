// src/CourseDetailsMain/CourseDetailsMain.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";

const CourseDetailsMain = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [progress, setProgress] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const token = localStorage.getItem("access-token");

  // Fetch course & approval
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/videos/${id}`);
        setCourse(res.data);
        setSelectedVideo(res.data.videos?.[0] || null);
      } catch (err) {
        console.error("Error loading course", err);
      }
    };

    const checkStatus = async () => {
      try {
        const [approvalRes, adminRes] = await Promise.all([
          axios.get(`http://localhost:3000/checkApproval`, {
            params: { userEmail: user?.email, courseId: id },
            headers: { authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/users/admin/${user?.email}`),
        ]);
        setIsApproved(approvalRes.data.approved);
        setIsAdmin(adminRes.data.admin);
      } catch (err) {
        console.error("Status check failed", err);
      }
    };

    fetchData();
    if (user?.email) checkStatus();
  }, [id, user?.email, token]);

  // Progress
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/progress`, {
        params: { userEmail: user.email, courseId: id },
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setProgress(res.data.completedVideos || []))
      .catch(() => setProgress([]));
  }, [id, user?.email, token]);

  // Comments
  useEffect(() => {
    axios
      .get(`http://localhost:3000/comments/${id}`)
      .then((res) => setComments(res.data));
  }, [id]);

  const isEnrolled = isApproved || isAdmin;
  const grouped = course?.videos?.reduce((acc, vid) => {
    acc[vid.chapter] = acc[vid.chapter] || [];
    acc[vid.chapter].push(vid);
    return acc;
  }, {}) || {};

  const extractYouTubeID = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
      if (parsed.hostname.includes("youtube.com")) return new URLSearchParams(parsed.search).get("v");
    } catch {
      return "";
    }
  };

  const handleVideoClick = (vid) => {
    if (!isEnrolled) {
      document.getElementById("enrollCard")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setSelectedVideo(vid);

    axios.post(
      `http://localhost:3000/progress`,
      { courseId: id, userEmail: user.email, videoUrl: vid.url },
      { headers: { authorization: `Bearer ${token}` } }
    );
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const res = await axios.post(
      `http://localhost:3000/comments`,
      {
        userEmail: user.email,
        courseId: id,
        text: newComment,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );

    setComments([res.data, ...comments]);
    setNewComment("");
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT - Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* ✅ Video Player */}
          {isEnrolled && selectedVideo && (
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${extractYouTubeID(selectedVideo.url)}`}
                title={selectedVideo.title}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}

          <h1 className="text-3xl font-bold text-orange-500">{course?.title}</h1>
          <p className="text-sm text-gray-500">Instructor: {course?.instructor}</p>
          <p className="text-sm">Category: {course?.category}</p>
          <p className="text-sm">Duration: {course?.duration}</p>

          <div>
            <h3 className="font-semibold">Overview</h3>
            <p>{course?.overview || "No overview available"}</p>
          </div>

          <div>
            <h3 className="font-semibold">What You’ll Learn</h3>
            <ul className="list-disc ml-6">
              {course?.whatYouWillLearn?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Requirements</h3>
            <ul className="list-disc ml-6">
              {course?.requirements?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          {/* ✅ Course Contents (if NOT enrolled, show here) */}
          {!isEnrolled && (
            <div>
              <h3 className="text-xl font-bold mt-6 mb-3">Course Contents</h3>
              {Object.entries(grouped).map(([chapter, vids]) => (
                <details key={chapter} className="collapse collapse-arrow bg-base-200 mb-2">
                  <summary className="collapse-title font-semibold">{chapter}</summary>
                  <div className="collapse-content px-4">
                    <ul>
                      {vids.map((vid, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleVideoClick(vid)}
                          className="text-gray-400 hover:text-orange-500 cursor-pointer"
                        >
                          • {vid.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          )}

          {/* ✅ Comments */}
          {isEnrolled && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Comments</h3>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleCommentSubmit} className="btn btn-primary mt-2">Post</button>

              <div className="mt-4 space-y-2">
                {comments.map((com) => (
                  <div key={com._id} className="bg-base-200 p-3 rounded">
                    <p className="font-semibold text-sm">{com.userEmail}</p>
                    <p>{com.text}</p>
                    <p className="text-xs text-gray-500">{new Date(com.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL - Enroll Card or Contents */}
        <div className="w-full">
          {isEnrolled ? (
            <div className="bg-base-200 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold mb-2">Contents</h3>
              {Object.entries(grouped).map(([chapter, vids]) => (
                <details key={chapter} className="collapse collapse-arrow bg-base-100 mb-2">
                  <summary className="collapse-title font-semibold">{chapter}</summary>
                  <div className="collapse-content px-2">
                    <ul>
                      {vids.map((vid, idx) => (
                        <li
                          key={idx}
                          className={`cursor-pointer ${progress.includes(vid.url) ? "text-green-500" : ""}`}
                          onClick={() => handleVideoClick(vid)}
                        >
                          • {vid.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div id="enrollCard" className="bg-base-200 p-4 rounded-lg shadow space-y-2">
              <img src={course?.thumbnail} alt={course?.title} className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="font-bold text-lg">{course?.title}</h2>
              <p className="text-sm">Instructor: {course?.instructor}</p>
              <p className="text-sm">Duration: {course?.duration}</p>
              <p className="text-lg font-bold text-orange-500">{course?.price === 0 ? "Free" : `৳${course?.price}`}</p>
              <button
                onClick={() => navigate(`/enroll-form/${course._id}`)}
                className="btn btn-primary w-full"
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
