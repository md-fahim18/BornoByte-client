// src/components/CourseModal.jsx
export default function CourseModal({ course, onClose }) {
  if (!course) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <p>Level: {course.level}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
