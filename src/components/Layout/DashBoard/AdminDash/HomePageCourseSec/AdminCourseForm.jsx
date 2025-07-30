// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function AdminCourseForm() {
//   // Updated formData to include duration, price, and overview
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     level: "",
//     thumbnail: "",
//     duration: "",
//     price: "",
//     overview: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [editingCourseId, setEditingCourseId] = useState(null);

//   const token = localStorage.getItem("access-token");

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get("https://bornobyte.vercel.app/courses");
//       setCourses(res.data);
//     } catch (err) {
//       console.error("Failed to fetch courses", err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const uploadImageToImgbb = async () => {
//     const apiKey = import.meta.env.VITE_Image_hosting_key; // Ensure this is set in your environment
//     const form = new FormData();
//     form.append("image", imageFile);
//     const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form);
//     return res.data.data.url;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       Swal.fire("Unauthorized", "You must be logged in as admin", "error");
//       return;
//     }

//     try {
//       let imageUrl = formData.thumbnail;

//       if (imageFile) {
//         imageUrl = await uploadImageToImgbb();
//       }

//       // fullData now includes duration, price, and overview automatically via formData
//       const fullData = { ...formData, thumbnail: imageUrl };

//       if (editingCourseId) {
//         await axios.patch(`https://bornobyte.vercel.app/courses/${editingCourseId}`, fullData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         Swal.fire("Updated!", "Course has been updated.", "success");
//       } else {
//         await axios.post("https://bornobyte.vercel.app/courses", fullData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         Swal.fire("Added!", "Course has been added.", "success");
//       }

//       // Reset form and state
//       setFormData({
//         title: "",
//         description: "",
//         level: "",
//         thumbnail: "",
//         duration: "",
//         price: "",
//         overview: "",
//       });
//       setImageFile(null);
//       setEditingCourseId(null);
//       fetchCourses();
//     } catch (err) {
//       Swal.fire("Error", err.message || "Something went wrong", "error");
//     }
//   };

//   const handleEdit = (course) => {
//     // Updated to set all fields including new ones
//     setFormData({
//       title: course.title,
//       description: course.description,
//       level: course.level,
//       thumbnail: course.thumbnail || "",
//       duration: course.duration || "",
//       price: course.price || "",
//       overview: course.overview || "",
//     });
//     setEditingCourseId(course._id);
//   };

//   const handleDelete = async (id) => {
//     if (!token) return Swal.fire("Unauthorized", "Admin token missing", "error");

//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`https://bornobyte.vercel.app/courses/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         Swal.fire("Deleted!", "Course has been deleted.", "success");
//         fetchCourses();
//       } catch (err) {
//         Swal.fire("Error", "Could not delete", "error");
//       }
//     }
//   };

// ========== 💡 YOUR EXTENDED LOGIC WITH MODULE ID AND TITLE SUPPORT STARTS HERE ==========
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminCourseForm() {
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
  const [availableModules, setAvailableModules] = useState([]);
  const [selectedModuleIds, setSelectedModuleIds] = useState([]);

  const token = localStorage.getItem("access-token");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://bornobyte.vercel.app/specializations");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await axios.get("https://bornobyte.vercel.app/videos");
      setAvailableModules(res.data);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchModules();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToImgbb = async () => {
    const apiKey = import.meta.env.VITE_Image_hosting_key;
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

      const selectedModules = availableModules
        .filter((module) => selectedModuleIds.includes(module._id))
        .map((module) => ({
          _id: module._id,
          title: module.title
        }));

      const fullData = { ...formData, thumbnail: imageUrl, modules: selectedModules };

      if (editingCourseId) {
        await axios.patch(`https://bornobyte.vercel.app/specializations/${editingCourseId}`, fullData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Updated!", "Course has been updated.", "success");
      } else {
        await axios.post("https://bornobyte.vercel.app/specializations", fullData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Added!", "Course has been added.", "success");
      }

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
      setSelectedModuleIds([]);
      fetchCourses();
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      level: course.level,
      thumbnail: course.thumbnail || "",
      duration: course.duration || "",
      price: course.price || "",
      overview: course.overview || "",
    });

    const selectedIds = course.modules?.map((m) => m._id).filter(Boolean) || [];
    setSelectedModuleIds(selectedIds);
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
        await axios.delete(`https://bornobyte.vercel.app/specializations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Deleted!", "Course has been deleted.", "success");
        fetchCourses();
      } catch {
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
        <input
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          placeholder="Duration (e.g., 3 Months)"
          className="input input-bordered w-full"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Price (e.g., 2000)"
          className="input input-bordered w-full"
        />
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          required
          placeholder="Course Overview"
          className="textarea textarea-bordered w-full"
        />
        <label className="label">
          <span className="label-text">Select Modules</span>
        </label>
        <select
          multiple
          value={selectedModuleIds}
          onChange={(e) => {
            const options = e.target.options;
            const selected = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                selected.push(options[i].value);
              }
            }
            setSelectedModuleIds(selected);
          }}
          className="select select-bordered w-full h-32"
        >
          {availableModules.map((module) => (
            <option key={module._id} value={module._id}>
              {module.title} - {module.subject}
            </option>
          ))}
        </select>
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
              setSelectedModuleIds([]);
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
            <p>Duration: {course.duration}</p>
            <p>Price: {course.price}৳</p>
            <div>
              <strong>Overview:</strong>
              {course.overview
                ? course.overview.split('\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                : <p className="italic text-gray-500">No overview provided.</p>
              }
            </div>

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
