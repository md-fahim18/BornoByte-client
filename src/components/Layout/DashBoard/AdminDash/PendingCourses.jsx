// src/components/Admin/PendingCourses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/videos')
      .then(res => {
        const pending = res.data.filter(course => course.status === 'pending');
        setCourses(pending);
      })
      .catch(err => console.error("Failed to fetch videos", err));
  }, []);

  const handleApprove = (id) => {
    axios.patch(`http://localhost:3000/videos/approve/${id}`, {}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          alert("Course approved successfully!");
          setCourses(prev => prev.filter(course => course._id !== id));
        }
      })
      .catch(err => {
        console.error("Approval failed", err);
        alert("Approval failed");
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-base-200 p-4 rounded-lg shadow-md">
            <img src={course.thumbnail} alt="thumbnail" className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl mt-2 font-semibold">{course.title}</h3>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Teacher:</strong> {course.teacherEmail}</p>
            <button onClick={() => handleApprove(course._id)} className="btn btn-success mt-4 w-full">Approve</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingCourses;
