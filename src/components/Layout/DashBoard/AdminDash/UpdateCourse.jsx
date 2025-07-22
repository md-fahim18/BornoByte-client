import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateCourse = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgbbApiKey = import.meta.env.VITE_Image_hosting_key;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/videos/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`
          }
        });
        setFormData(res.data);
        setVideos(res.data.videos || []);
      } catch (err) {
        console.error("Failed to load course", err);
        alert("Failed to load course. Please make sure you are authorized.");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleThumbnailUpload = async () => {
    const form = new FormData();
    form.append("image", thumbnailFile);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    return data.data.url;
  };

  const handleVideoChange = (index, field, value) => {
    const updated = [...videos];
    updated[index][field] = value;
    setVideos(updated);
  };

  const addVideoField = () => {
    setVideos([...videos, { title: "", url: "", chapter: "", subject: "" }]);
  };

  // New: Delete a video entry
  const deleteVideoField = (index) => {
    const updated = [...videos];
    updated.splice(index, 1);
    setVideos(updated);
  };

  // Modified: Send notification ONLY to enrolled users on course update
  const sendUpdateNotificationToEnrolledUsers = async (courseId, courseTitle, teacherEmail) => {
    try {
      // 1. Fetch all enrolled users for this course
      const res = await axios.get(`http://localhost:3000/enrollments?courseId=${courseId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
      });
      const enrolledUsers = res.data; // Array of enrollment objects with userEmail or similar

      // 2. For each enrolled user, send notification
      for (const enrollment of enrolledUsers) {
        await axios.post(
          "http://localhost:3000/notifications",
          {
            recipientEmail: enrollment.userEmail, // assuming this field contains user's email
            type: "course_update",
            title: "Course Updated",
            message: `Course titled "${courseTitle}" was updated by ${teacherEmail}.`,
            read: false,
            timestamp: new Date(),
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            }
          }
        );
      }
    } catch (err) {
      console.error("Failed to send update notifications to enrolled users", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedThumbnail = formData.thumbnail;
      if (thumbnailFile) {
        updatedThumbnail = await handleThumbnailUpload();
      }

      const { _id, ...formWithoutId } = formData;

      const updatedCourse = {
        ...formWithoutId,
        thumbnail: updatedThumbnail,
        overview: formData.overview || "",
        requirements: typeof formData.requirements === "string"
          ? formData.requirements.split(",").map(r => r.trim())
          : formData.requirements || [],
        whatYouWillLearn: typeof formData.whatYouWillLearn === "string"
          ? formData.whatYouWillLearn.split(",").map(w => w.trim())
          : formData.whatYouWillLearn || [],
        videos: videos.filter(v => v.title && v.url)
      };

      await axios.patch(`http://localhost:3000/videos/${id}`, updatedCourse, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
      });

      // 🔔 Send Notification to enrolled users only
      await sendUpdateNotificationToEnrolledUsers(id, updatedCourse.title, updatedCourse.teacherEmail);

      alert("✅ Course updated successfully!");
    } catch (err) {
      console.error("❌ Update failed", err);
      alert("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <p className="text-center mt-20">Loading course data...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Course</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          name="instructor"
          placeholder="Instructor"
          value={formData.instructor}
          onChange={handleChange}
          className="input input-bordered"
          required
        />

        <input type="file" onChange={handleThumbnailChange} className="file-input file-input-bordered" />
        <p className="text-xs text-gray-500">Leave empty if you don't want to change thumbnail</p>

        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered" required>
          <option value="" disabled>Select Category</option>
          <option value="SSC">SSC</option>
          <option value="HSC">HSC</option>
          <option value="Undergraduate">Undergraduate</option>
        </select>

        <input
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          name="teacherEmail"
          placeholder="Teacher Email"
          value={formData.teacherEmail}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
        <input
          name="otherLink"
          placeholder="Other Link (optional)"
          value={formData.otherLink}
          onChange={handleChange}
          className="input input-bordered"
        />

        <textarea
          name="overview"
          placeholder="Course Overview"
          value={formData.overview || ""}
          onChange={handleChange}
          className="textarea textarea-bordered"
          required
        />

        <textarea
          name="requirements"
          placeholder="Requirements (comma separated)"
          value={Array.isArray(formData.requirements) ? formData.requirements.join(", ") : ""}
          onChange={e =>
            setFormData(prev => ({
              ...prev,
              requirements: e.target.value.split(",").map(i => i.trim())
            }))
          }
          className="textarea textarea-bordered"
        />

        <textarea
          name="whatYouWillLearn"
          placeholder="What You Will Learn (comma separated)"
          value={Array.isArray(formData.whatYouWillLearn) ? formData.whatYouWillLearn.join(", ") : ""}
          onChange={e =>
            setFormData(prev => ({
              ...prev,
              whatYouWillLearn: e.target.value.split(",").map(i => i.trim())
            }))
          }
          className="textarea textarea-bordered"
        />

        <div>
          <h4 className="font-semibold mt-4 mb-2">Course Videos</h4>
          {videos.map((video, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 mb-2">
              <input
                placeholder="Video Title"
                value={video.title}
                onChange={e => handleVideoChange(index, 'title', e.target.value)}
                className="input input-bordered"
                required
              />
              <input
                placeholder="Video URL"
                value={video.url}
                onChange={e => handleVideoChange(index, 'url', e.target.value)}
                className="input input-bordered"
                required
              />
              <input
                placeholder="Chapter"
                value={video.chapter || ""}
                onChange={e => handleVideoChange(index, 'chapter', e.target.value)}
                className="input input-bordered"
              />
              <input
                placeholder="Subject"
                value={video.subject || ""}
                onChange={e => handleVideoChange(index, 'subject', e.target.value)}
                className="input input-bordered"
              />
              <button
                type="button"
                onClick={() => deleteVideoField(index)}
                className="btn btn-sm btn-error"
                title="Delete this video"
              >
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={addVideoField} className="btn btn-sm btn-outline">+ Add Another Video</button>
        </div>

        <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
