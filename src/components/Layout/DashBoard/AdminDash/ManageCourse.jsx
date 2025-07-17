// src/components/Layout/DashBoard/AdminDash/ManageCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/videos")
      .then(res => {
        const approved = res.data.filter(course => course.status === 'approved');
        setCourses(approved);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
        alert("Failed to load courses.");
      });
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this course?");
    if (!confirm) return;

    axios.delete(`http://localhost:3000/videos/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => {
        if (res.data.deletedCount > 0) {
          alert("Course deleted successfully!");
          setCourses(prev => prev.filter(course => course._id !== id));
        }
      })
      .catch(err => {
        console.error("Delete failed", err);
        alert("Delete failed");
      });
  };

    const toggleFeature = (id, isCurrentlyFeatured) => {
      axios.patch(`http://localhost:3000/videos/feature/${id}`, {
        featured: !isCurrentlyFeatured
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      })
        .then(res => {
          if (res.data.modifiedCount > 0) {
            alert(`Course ${!isCurrentlyFeatured ? 'featured' : 'unfeatured'} successfully!`);
            setCourses(prev =>
              prev.map(course =>
                course._id === id ? { ...course, featured: !isCurrentlyFeatured } : course
              )
            );
          }
        })
        .catch(err => {
          const msg = err.response?.data?.error || "Feature toggle failed";
          alert(msg);
          console.error("Feature error:", err);
        });
    };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-base-200 p-4 rounded-lg shadow-md">
            <img
              src={course.thumbnail}
              alt="thumbnail"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl mt-2 font-semibold">{course.title}</h3>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => navigate(`/dashboard/update-course/${course._id}`)}
                className="btn btn-info w-full"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(course._id)}
                className="btn btn-error w-full"
              >
                Delete
              </button>

              <button
                onClick={() => toggleFeature(course._id, course.featured)}
                className={`btn w-full ${course.featured ? "btn-warning" : "btn-outline"}`}
              >
                {course.featured ? "Unfeature" : "Feature"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
