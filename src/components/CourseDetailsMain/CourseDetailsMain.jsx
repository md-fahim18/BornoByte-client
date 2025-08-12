// src/CourseDetailsMain/CourseDetailsMain.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";

import Navbar from "../shared/Navbar"; // Adjust this path if needed
import Footer from "../shared/Footer"; // Adjust this path if needed
import CourseVideo from "./CourseVideo";

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
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [ratingInput, setRatingInput] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);


  const token = localStorage.getItem("access-token");
  const isEnrolled = isApproved || isAdmin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://bornobyte.vercel.app/videos/${id}`
        );
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

  useEffect(() => {
    if (!course?._id) return;

    // Fetch reviews
    axios
      .get(`http://localhost:3000/reviews/${course._id}`)
      .then((res) => {
        setReviews(res.data);
        // Find if current user already reviewed
        if (user?.email) {
          const existing = res.data.find((r) => r.userEmail === user.email);
          if (existing) {
            setUserReview(existing);
            setRatingInput(existing.rating);
            setCommentInput(existing.comment);
          } else {
            setUserReview(null);
            setRatingInput(0);
            setCommentInput("");
          }
        }
      })
      .catch(console.error);

    // Fetch average rating
    axios
      .get(`http://localhost:3000/reviews/${course._id}/average`)
      .then((res) => {
        setAvgRating(res.data.avgRating);
        setReviewCount(res.data.count);
      })
      .catch(console.error);
  }, [course?._id, user?.email, reviewRefreshTrigger]);


  // eslint-disable-next-line no-unused-vars
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
      document
        .getElementById("enrollCard")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setSelectedVideo(vid);

    axios
      .post(
        `https://bornobyte.vercel.app/progress`,
        { courseId: id, userEmail: user.email, videoUrl: vid.url },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then(() => {
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

  const handleReviewSubmit = async () => {
    if (ratingInput === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      if (userReview) {
        // Update existing review
        await axios.patch(
          `http://localhost:3000/reviews/${userReview._id}`,
          {
            rating: ratingInput,
            comment: commentInput,
          },
          { headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` } }
        );
      } else {
        // Create new review
        await axios.post(
          `http://localhost:3000/reviews`,
          {
            courseId: course._id,
            rating: ratingInput,
            comment: commentInput,
          },
          { headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` } }
        );
      }
      setIsEditingReview(false);
      setReviewRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;

    try {
      await axios.delete(`http://localhost:3000/reviews/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` },
      });
      setUserReview(null);
      setRatingInput(0);
      setCommentInput("");
      setReviewRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  const StarRatingInput = ({ rating, setRating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => setRating(star)}
            xmlns="http://www.w3.org/2000/svg"
            fill={star <= rating ? "#f59e0b" : "none"}
            viewBox="0 0 24 24"
            stroke="#f59e0b"
            strokeWidth={2}
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.385-2.455a1 1 0 00-1.176 0l-3.385 2.455c-.784.57-1.838-.196-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.03 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z"
            />
          </svg>
        ))}
      </div>
    );
  };



  const grouped =
    course?.videos?.reduce((acc, vid) => {
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
                {/* <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${extractYouTubeID(selectedVideo.url)}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allowFullScreen
                /> */}
                <CourseVideo></CourseVideo>
              </div>
            )}

            <h1 className="text-3xl font-bold text-orange-500">
              {course?.title}
            </h1>
            <p className="text-sm text-gray-500">
              Instructor: {course?.instructor}
            </p>
            <p className="text-sm">Category: {course?.category}</p>
            <p className="text-sm">Duration: {course?.duration}</p>
            <div className="flex items-center space-x-4 my-2">
              <div className="flex items-center">
                <StarRatingInput rating={Math.round(avgRating)} setRating={() => {}} />
                <span className="ml-2 text-sm text-gray-600">
                  {avgRating.toFixed(1)} / 5 ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>


            <div>
              <h3 className="font-semibold">Overview</h3>
              <p>{course?.overview}</p>
            </div>

            <div>
              <h3 className="font-semibold">What You’ll Learn</h3>
              <ul className="list-disc ml-6">
                {course?.whatYouWillLearn?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Requirements</h3>
              <ul className="list-disc ml-6">
                {course?.requirements?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

              {/* YOUR REVIEW — only for enrolled users */}
              {isEnrolled && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">Your Review</h3>
                  {userReview && !isEditingReview ? (
                    <div className="bg-base-200 p-4 rounded space-y-2">
                      <StarRatingInput rating={ratingInput} setRating={() => {}} />
                      <p>{commentInput}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditingReview(true)}
                          className="btn btn-sm btn-outline"
                        >
                          Edit
                        </button>
                        {/* <button
                          onClick={() => handleDeleteReview(userReview._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button> */}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-base-200 p-4 rounded space-y-2">
                      <StarRatingInput rating={ratingInput} setRating={setRatingInput} />
                      <textarea
                        className="textarea w-full"
                        placeholder="Write your review here..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        rows={4}
                      />
                      <button onClick={handleReviewSubmit} className="btn btn-primary">
                        {userReview ? "Update Review" : "Submit Review"}
                      </button>
                      {isEditingReview && (
                        <button
                          onClick={() => {
                            setIsEditingReview(false);
                            setRatingInput(userReview.rating);
                            setCommentInput(userReview.comment);
                          }}
                          className="btn btn-ghost ml-2"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ALL REVIEWS — show to everyone */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">All Reviews</h3>
                <div className="space-y-4">
                  {reviews.length === 0 && <p>No reviews yet.</p>}
                  {reviews
                    .filter((r) => r._id !== userReview?._id) // exclude user’s own review from this list
                    .map((rev) => (
                      <div
                        key={rev._id}
                        className="bg-base-200 p-4 rounded space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <StarRatingInput rating={rev.rating} setRating={() => {}} />
                          <span className="text-sm font-semibold">{rev.userEmail}</span>
                        </div>
                        <p>{rev.comment}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(rev.timestamp).toLocaleDateString()}
                        </p>
                        {isAdmin && (
                          <button
                            onClick={async () => {
                              if (window.confirm("Delete this review?")) {
                                try {
                                  await axios.delete(
                                    `http://localhost:3000/reviews/${rev._id}`,
                                    {
                                      headers: {
                                        authorization: `Bearer ${localStorage.getItem(
                                          "access-token"
                                        )}`,
                                      },
                                    }
                                  );
                                  setReviewRefreshTrigger((prev) => prev + 1);
                                } catch {
                                  alert("Failed to delete review");
                                }
                              }
                            }}
                            className="btn btn-xs btn-error mt-1"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>



            {!isEnrolled && (
              <div>
                <h3 className="text-xl font-bold mt-6 mb-3">Course Contents</h3>
                {Object.entries(grouped).map(([chapter, vids]) => (
                  <details
                    key={chapter}
                    className="collapse collapse-arrow bg-base-200 mb-2"
                  >
                    <summary className="collapse-title font-semibold">
                      {chapter}
                    </summary>
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
                <button
                  onClick={handleCommentSubmit}
                  className="btn btn-primary mt-2"
                >
                  Post
                </button>

                <div className="mt-4 space-y-2">
                  {comments
                    .filter((com) => isAdmin || com.userEmail === user.email)
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
                            <button
                              onClick={() => handleEditSave(com._id)}
                              className="btn btn-xs btn-success mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="btn btn-xs btn-ghost"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{com.text}</p>
                            <p className="text-xs text-gray-500">
                              {com.timestamp
                                ? new Date(com.timestamp).toLocaleString()
                                : ""}
                            </p>
                            {(user?.email === com.userEmail || isAdmin) && (
                              <div className="flex gap-2 mt-1">
                                <button
                                  onClick={() => {
                                    setEditingCommentId(com._id);
                                    setEditedText(com.text);
                                  }}
                                  className="text-blue-500 text-xs"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteComment(com._id)}
                                  className="text-red-500 text-xs"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
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
                    Progress: {progress.length} / {course?.videos?.length || 0}{" "}
                    completed
                  </div>
                  <progress
                    className="progress progress-warning w-full"
                    value={progress.length}
                    max={course?.videos?.length || 1}
                  />
                </div>

                <h3 className="font-semibold mb-2">Contents</h3>
                {Object.entries(grouped).map(([chapter, vids]) => (
                  <details
                    key={chapter}
                    className="collapse collapse-arrow bg-base-100 mb-2"
                  >
                    <summary className="collapse-title font-semibold">
                      {chapter} (
                      {vids.filter((vid) => progress.includes(vid.url)).length}/
                      {vids.length})
                    </summary>
                    <div className="collapse-content px-2">
                      <ul>
                        {vids.map((vid, idx) => (
                          <li
                            key={idx}
                            className={`cursor-pointer flex items-center gap-2 hover:text-amber-500 ${
                              selectedVideo?.url === vid.url
                                ? "text-orange-500"
                                : ""
                            }`}
                            onClick={() => handleVideoClick(vid)}
                          >
                            {progress.includes(vid.url) && (
                              <span className="text-green-500">✔</span>
                            )}
                            {vid.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div
                id="enrollCard"
                className="bg-base-200 p-4 rounded-lg shadow space-y-2"
              >
                <img
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
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
