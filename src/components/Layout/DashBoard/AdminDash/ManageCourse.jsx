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

  const handleFeature = (id) => {
    axios.patch(`http://localhost:3000/videos/feature/${id}`, {}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          alert("Course marked as featured!");
        }
      })
      .catch(err => {
        console.error("Feature failed", err);
        alert("Feature failed");
      });
  };

  // const handleUpdate = (id) => {
  //   navigate(`/dashboard/update-course/${id}`);
  // };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-base-200 p-4 rounded-lg shadow-md">
            <img src={course.thumbnail} alt="thumbnail" className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl mt-2 font-semibold">{course.title}</h3>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Teacher:</strong> {course.instructor}</p>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => navigate(`/dashboard/update-course/${course._id}`)}
                className="btn btn-info w-full"
              >
                Update
              </button>

              <button onClick={() => handleDelete(course._id)} className="btn btn-error w-full">
                Delete
              </button>
              <button onClick={() => handleFeature(course._id)} className="btn btn-warning w-full">
                Feature
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
