// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AdminCourseForm from "./AdminCourseForm";
import CourseModal from "./CourseModal";

export default function HomeCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  

  const fetchCourses = async () => {
    const res = await axios.get("https://bornobyte.vercel.app/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    await axios.delete(`https://bornobyte.vercel.app/courses/${id}`);
    fetchCourses();
  };

  return (
    <div>
      <h2>All Courses</h2>
      <AdminCourseForm fetchCourses={fetchCourses} editingCourse={editingCourse} setEditingCourse={setEditingCourse} />

      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <button onClick={() => setSelectedCourse(course)}>Details</button>
            <button onClick={() => setEditingCourse(course)}>Edit</button>
            <button onClick={() => deleteCourse(course._id)}>Delete</button>
          </div>
        ))}
      </div>

      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}
