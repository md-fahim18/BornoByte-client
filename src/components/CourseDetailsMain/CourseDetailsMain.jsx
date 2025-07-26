// src/CourseDetailsMain/CourseDetailsMain.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";

import Navbar from "../shared/Navbar";   // Adjust this path if needed
import Footer from "../shared/Footer";   // Adjust this path if needed

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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);

  const token = localStorage.getItem("access-token");
  const isEnrolled = isApproved || isAdmin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://bornobyte.vercel.app/videos/${id}`);
        setCourse(res.data);
        setSelectedVideo(res.data.videos?.[0] || null);
      } catch (err) {
        console.error("Error loading course", err);
      }
    };

    const checkStatus = async () => {
      try {
        const [approvalRes, adminRes] = await Promise.all([
          axios.get(`https://bornobyte.vercel.app/checkApproval`, {
            params: { userEmail: user?.email, courseId: id },
            headers: { authorization: `Bearer ${token}` },
          }),
          axios.get(`https://bornobyte.vercel.app/users/admin/${user?.email}`),
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

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`https://bornobyte.vercel.app/progress`, {
        params: { userEmail: user.email, courseId: id },
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setProgress(res.data.completedVideos || []))
      .catch(() => setProgress([]));
  }, [id, user?.email, token, selectedVideo]);

  useEffect(() => {
    axios
      .get(`https://bornobyte.vercel.app/comments/${id}`)
      .then((res) => setComments(res.data));
  }, [id, commentRefreshTrigger]);

  const extractYouTubeID = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
      if (parsed.hostname.includes("youtube.com"))
        return new URLSearchParams(parsed.search).get("v");
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
      `https://bornobyte.vercel.app/progress`,
      { courseId: id, userEmail: user.email, videoUrl: vid.url },
      { headers: { authorization: `Bearer ${token}` } }
    ).then(() => {
      setProgress((prev) => [...new Set([...prev, vid.url])]);
    });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    await axios.post(
      `https://bornobyte.vercel.app/comments`,
      {
        userEmail: user.email,
        courseId: id,
        text: newComment,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );

    setNewComment("");
    setCommentRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`https://bornobyte.vercel.app/comments/${commentId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setCommentRefreshTrigger((prev) => prev + 1);
  };

  const handleEditSave = async (commentId) => {
    await axios.patch(
      `https://bornobyte.vercel.app/comments/${commentId}`,
      { text: editedText },
      { headers: { authorization: `Bearer ${token}` } }
    );

    setEditingCommentId(null);
    setEditedText("");
    setCommentRefreshTrigger((prev) => prev + 1);
  };

  const grouped = course?.videos?.reduce((acc, vid) => {
    acc[vid.chapter] = acc[vid.chapter] || [];
    acc[vid.chapter].push(vid);
    return acc;
  }, {}) || {};

  return (
    <>
      <Navbar />

      <div className="bg-base-100 text-base-content min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* LEFT MAIN */}
          <div className="md:col-span-2 space-y-6">
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
              <p>{course?.overview}</p>
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
                            className="hover:text-amber-500 text-gray-400 cursor-pointer"
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
                  {comments
                    .filter(com => isAdmin || com.userEmail === user.email)
                    .map((com) => (
                      <div key={com._id} className="bg-base-200 p-3 rounded">
                        <p className="font-semibold text-sm">{com.userEmail}</p>
                        {editingCommentId === com._id ? (
                          <>
                            <textarea
                              className="textarea textarea-sm w-full mb-2"
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                            />
                            <button onClick={() => handleEditSave(com._id)} className="btn btn-xs btn-success mr-2">Save</button>
                            <button onClick={() => setEditingCommentId(null)} className="btn btn-xs btn-ghost">Cancel</button>
                          </>
                        ) : (
                          <>
                            <p>{com.text}</p>
                            <p className="text-xs text-gray-500">
                              {com.timestamp ? new Date(com.timestamp).toLocaleString() : ""}
                            </p>
                            {(user?.email === com.userEmail || isAdmin) && (
                              <div className="flex gap-2 mt-1">
                                <button onClick={() => {
                                  setEditingCommentId(com._id);
                                  setEditedText(com.text);
                                }} className="text-blue-500 text-xs">Edit</button>
                                <button onClick={() => handleDeleteComment(com._id)} className="text-red-500 text-xs">Delete</button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full">
            {isEnrolled ? (
              <div className="bg-base-200 p-4 rounded-lg space-y-2">
                <div className="mb-4">
                  <div className="font-semibold text-sm mb-1 text-base-content">
                    Progress: {progress.length} / {course?.videos?.length || 0} completed
                  </div>
                  <progress
                    className="progress progress-warning w-full"
                    value={progress.length}
                    max={course?.videos?.length || 1}
                  />
                </div>

                <h3 className="font-semibold mb-2">Contents</h3>
                {Object.entries(grouped).map(([chapter, vids]) => (
                  <details key={chapter} className="collapse collapse-arrow bg-base-100 mb-2">
                    <summary className="collapse-title font-semibold">
                      {chapter} ({vids.filter(vid => progress.includes(vid.url)).length}/{vids.length})
                    </summary>
                    <div className="collapse-content px-2">
                      <ul>
                        {vids.map((vid, idx) => (
                          <li
                            key={idx}
                            className={`cursor-pointer flex items-center gap-2 hover:text-amber-500 ${selectedVideo?.url === vid.url ? "text-orange-500" : ""}`}
                            onClick={() => handleVideoClick(vid)}
                          >
                            {progress.includes(vid.url) && <span className="text-green-500">✔</span>}
                            {vid.title}
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
                <p className="text-lg font-bold text-orange-500">
                  {course?.price === 0 ? "Free" : `৳${course?.price}`}
                </p>
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

      <Footer />
    </>
  );
};

export default CourseDetailsMain;
