// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const HomepageCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get('https://bornobyte.vercel.app/courses');
//         setCourses(res.data);
//       } catch (error) {
//         console.error('Failed to fetch courses:', error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Our Courses</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {courses.map(course => (
//           <div key={course._id} className="card bg-base-100 w-96 shadow-xl">
//             <figure>
//               <img
//                 src={course.thumbnail}
//                 alt={course.title}
//                 className="w-full h-44 object-cover"
//               />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">
//                 {course.title}
//                 <div className="badge badge-secondary">NEW</div>
//               </h2>
//               <p className="text-sm text-gray-600">Duration: {course.duration}</p>
//               <p className="font-bold">Price: {course.price}৳</p>
//               <div className="card-actions justify-end mt-3">
//                 <button
//                   onClick={() => setSelectedCourse(course)}
//                   className="btn btn-sm btn-outline"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {selectedCourse && (
//         <dialog id="courseModal" className="modal modal-open">
//           <div className="modal-box max-w-3xl">
//             <h3 className="font-bold text-2xl mb-2">{selectedCourse.title}</h3>
//             <img src={selectedCourse.thumbnail} alt="course" className="rounded-lg w-full h-60 object-cover mb-4" />
//             <p><span className="font-semibold">Duration:</span> {selectedCourse.duration}</p>
//             <p><span className="font-semibold">Price:</span> {selectedCourse.price}৳</p>

//             <div className="mt-4">
//               <h4 className="text-lg font-semibold mb-1">Overview:</h4>
//               <p className="text-sm text-gray-700">{selectedCourse.overview || "No overview provided."}</p>
//             </div>

//             <div className="mt-4">
//               <h4 className="text-lg font-semibold mb-2">Modules:</h4>
//               {selectedCourse.modules && selectedCourse.modules.length > 0 ? (
//                 <ul className="list-disc list-inside space-y-1">
//                   {selectedCourse.modules.map((mod, index) => (
//                     <li key={index}>
//                       <span className="font-semibold">{mod.title}:</span>{' '}
//                       {mod.link ? (
//                         <a
//                           href={mod.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 underline"
//                         >
//                           Go to Module
//                         </a>
//                       ) : (
//                         <span className="italic text-gray-500">Soon to be announced</span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No modules listed.</p>
//               )}
//             </div>

//             <div className="modal-action">
//               <form method="dialog">
//                 <button className="btn" onClick={() => setSelectedCourse(null)}>Close</button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default HomepageCourses;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <-- ✅ Needed for internal routing

const HomepageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://bornobyte.vercel.app/specializations');
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
          <div 
            key={course._id} 
            className="card bg-base-100 w-96 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-lg"
          >
            <figure>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-44 object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">
                {course.title}
                <div className="badge badge-secondary ml-2">NEW</div>
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              <p className="text-sm text-gray-500">Duration: {course.duration}</p>
              <p className="font-bold text-lg text-green-600">Price: {course.price}৳</p>
              <div className="card-actions justify-end mt-3">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <dialog id="courseModal" className="modal modal-open">
          <div className="modal-box max-w-3xl bg-white shadow-2xl rounded-lg">
            <h3 className="font-bold text-2xl mb-4 text-gray-800">{selectedCourse.title}</h3>
            <img 
              src={selectedCourse.thumbnail} 
              alt="course" 
              className="rounded-lg w-full h-60 object-cover mb-6 border" 
            />
            <div className="space-y-3">
              <p><span className="font-semibold text-gray-700">Duration:</span> {selectedCourse.duration}</p>
              <p><span className="font-semibold text-gray-700">Price:</span> {selectedCourse.price}৳</p>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Description:</h4>
              {selectedCourse.description
                ? selectedCourse.description.split('\n').map((para, idx) => (
                    <p key={idx} className="text-sm text-gray-700 leading-relaxed mb-2">
                      {para}
                    </p>
                  ))
                : <p className="text-sm text-gray-500 italic">No description provided.</p>
              }
            </div>

            {/* <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Overview:</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedCourse.overview || "No overview provided."}</p>
            </div> */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Overview:</h4>
              {selectedCourse.overview
                ? selectedCourse.overview.split('\n').map((para, idx) => (
                    <p key={idx} className="text-sm text-gray-700 leading-relaxed mb-2">
                      {para}
                    </p>
                  ))
                : <p className="text-sm text-gray-500 italic">No overview provided.</p>
              }
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Modules:</h4>
              {selectedCourse.modules && selectedCourse.modules.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  {selectedCourse.modules.map((module, index) => (
                    <li key={index}>
                      {/* ✅ Link to dynamic route */}
                      <Link 
                        to={`/courses/${module._id}`} 
                        className="text-blue-600 hover:underline"
                      >
                        {module.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No modules listed.</p>
              )}
            </div>

            <div className="modal-action mt-6">
              <form method="dialog">
                <button 
                  className="btn btn-sm btn-primary" 
                  onClick={() => setSelectedCourse(null)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default HomepageCourses;
