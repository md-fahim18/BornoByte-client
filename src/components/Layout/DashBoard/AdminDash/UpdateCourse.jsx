// src/components/Layout/DashBoard/AdminDash/UpdateCourse.jsx
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
    axios.get(`http://localhost:3000/videos/${id}`)
      .then(res => {
        setFormData(res.data);
        setVideos(res.data.videos || []);
      })
      .catch(err => console.error("Failed to load course", err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (index, field, value) => {
    const updated = [...videos];
    updated[index][field] = value;
    setVideos(updated);
  };

  const addVideoField = () => {
    setVideos([...videos, { title: "", url: "" }]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedThumbnail = formData.thumbnail;
      if (thumbnailFile) {
        updatedThumbnail = await handleThumbnailUpload();
      }

      const {_id, ...formWithoutId} = formData;

      const updatedCourse = {
        ...formWithoutId,
        thumbnail: updatedThumbnail,
        videos: videos.filter(v => v.title && v.url)
      };

      await axios.patch(`http://localhost:3000/videos/${id}`, updatedCourse, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
      });

      alert("Course updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
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
        <input name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="input input-bordered" required />
        <input name="instructor" placeholder="Instructor" value={formData.instructor} onChange={handleChange} className="input input-bordered" required />
        
        <input type="file" onChange={handleThumbnailChange} className="file-input file-input-bordered" />
        <p className="text-xs text-gray-500">Leave empty if you don't want to change thumbnail</p>

        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered" required>
          <option value="" disabled>Select Category</option>
          <option value="SSC">SSC</option>
          <option value="HSC">HSC</option>
          <option value="Undergraduate">Undergraduate</option>
        </select>

        <input name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} className="input input-bordered" required />
        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="input input-bordered" required />
        <input name="teacherEmail" placeholder="Teacher Email" value={formData.teacherEmail} onChange={handleChange} className="input input-bordered" required />
        <input name="otherLink" placeholder="Other Link" value={formData.otherLink} onChange={handleChange} className="input input-bordered" />

        {/* Videos */}
        <div>
          <h4 className="font-semibold mt-4 mb-2">Course Videos</h4>
          {videos.map((video, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
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
