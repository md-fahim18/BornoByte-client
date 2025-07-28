import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminCourseForm() {
  // Updated formData to include duration, price, and overview
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "",
    thumbnail: "",
    duration: "",
    price: "",
    overview: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const token = localStorage.getItem("access-token");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToImgbb = async () => {
    const apiKey = import.meta.env.VITE_Image_hosting_key; // Ensure this is set in your environment
    const form = new FormData();
    form.append("image", imageFile);
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form);
    return res.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      Swal.fire("Unauthorized", "You must be logged in as admin", "error");
      return;
    }

    try {
      let imageUrl = formData.thumbnail;

      if (imageFile) {
        imageUrl = await uploadImageToImgbb();
      }

      // fullData now includes duration, price, and overview automatically via formData
      const fullData = { ...formData, thumbnail: imageUrl };

      if (editingCourseId) {
        await axios.patch(`http://localhost:3000/courses/${editingCourseId}`, fullData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Updated!", "Course has been updated.", "success");
      } else {
        await    

await axios.post("http://localhost:3000/courses", fullData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Added!", "Course has been added.", "success");
      }

      // Reset form and state
      setFormData({
        title: "",
        description: "",
        level: "",
        thumbnail: "",
        duration: "",
        price: "",
        overview: "",
      });
      setImageFile(null);
      setEditingCourseId(null);
      fetchCourses();
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleEdit = (course) => {
    // Updated to set all fields including new ones
    setFormData({
      title: course.title,
      description: course.description,
      level: course.level,
      thumbnail: course.thumbnail || "",
      duration: course.duration || "",
      price: course.price || "",
      overview: course.overview || "",
    });
    setEditingCourseId(course._id);
  };

  const handleDelete = async (id) => {
    if (!token) return Swal.fire("Unauthorized", "Admin token missing", "error");

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Deleted!", "Course has been deleted.", "success");
        fetchCourses();
      } catch (err) {
        Swal.fire("Error", "Could not delete", "error");
      }
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-bold">
          {editingCourseId ? "Edit Course" : "Add New Course"}
        </h3>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Title"
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />
        <input
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
          placeholder="Level (e.g., SSC, HSC)"
          className="input input-bordered w-full"
        />
        {/* New input for duration */}
        <input
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          placeholder="Duration (e.g., 2 hours)"
          className="input input-bordered w-full"
        />
        {/* New input for price */}
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Price (e.g., 1000)"
          className="input input-bordered w-full"
        />
        {/* New textarea for overview */}
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          required
          placeholder="Course Overview"
          className="textarea textarea-bordered w-full"
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="file-input w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          {editingCourseId ? "Update Course" : "Add Course"}
        </button>
        {editingCourseId && (
          <button
            type="button"
            onClick={() => {
              setEditingCourseId(null);
              setFormData({
                title: "",
                description: "",
                level: "",
                thumbnail: "",
                duration: "",
                price: "",
                overview: "",
              });
              setImageFile(null);
            }}
            className="btn btn-warning w-full"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="card bg-base-100 shadow p-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2">{course.title}</h3>
            <p>{course.description}</p>
            <p className="text-sm text-gray-500">Level: {course.level}</p>
            {/* Display new fields */}
            <p>Duration: {course.duration}</p>
            <p>Price: {course.price}৳</p>
            <p>Overview: {course.overview}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(course)}
                className="btn btn-sm btn-info"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}