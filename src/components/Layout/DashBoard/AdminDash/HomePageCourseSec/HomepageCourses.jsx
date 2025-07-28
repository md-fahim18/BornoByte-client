import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomepageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/courses');
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Our Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-44 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {course.title}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p className="text-sm text-gray-600">Duration: {course.duration}</p>
              <p className="font-bold">Price: {course.price}৳</p>
              <div className="card-actions justify-end mt-3">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="btn btn-sm btn-outline"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCourse && (
        <dialog id="courseModal" className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-2xl mb-2">{selectedCourse.title}</h3>
            <img src={selectedCourse.thumbnail} alt="course" className="rounded-lg w-full h-60 object-cover mb-4" />
            <p><span className="font-semibold">Duration:</span> {selectedCourse.duration}</p>
            <p><span className="font-semibold">Price:</span> {selectedCourse.price}৳</p>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-1">Overview:</h4>
              <p className="text-sm text-gray-700">{selectedCourse.overview || "No overview provided."}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Modules:</h4>
              {selectedCourse.modules && selectedCourse.modules.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {selectedCourse.modules.map((mod, index) => (
                    <li key={index}>
                      <span className="font-semibold">{mod.title}:</span>{' '}
                      {mod.link ? (
                        <a
                          href={mod.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Go to Module
                        </a>
                      ) : (
                        <span className="italic text-gray-500">Soon to be announced</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No modules listed.</p>
              )}
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setSelectedCourse(null)}>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default HomepageCourses;
