// src/components/Layout/DashBoard/AdminDash/ManageCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/videos")
      .then(res => {
        const approved = res.data.filter(course => course.status === 'approved');
        setCourses(approved);
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-base-200 p-4 rounded-lg shadow-md">
            <img src={course.thumbnail} alt="thumbnail" className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl mt-2 font-semibold">{course.title}</h3>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Teacher:</strong> {course.teacherEmail}</p>
            <button onClick={() => handleDelete(course._id)} className="btn btn-error mt-4 w-full">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
