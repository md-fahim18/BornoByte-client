import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AuthContext from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, EnvelopeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { FaLinkedin } from 'react-icons/fa';
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";


const TeacherCard = () => {
  const { user: currentUser } = useContext(AuthContext);

  const [teachers, setTeachers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [viewingTeacher, setViewingTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    education: '',
    experience: '',
    image: '',
    description: '',
    email: '',
    linkedin: '',
    courses: []
  });

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/teachers');
      setTeachers(res.data);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/videos');
      setVideos(res.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchVideos();
  }, []);

  const handleOpen = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name || '',
        designation: teacher.designation || '',
        education: teacher.education || '',
        experience: teacher.experience || '',
        image: teacher.image || '',
        description: teacher.description || '',
        email: teacher.email || '',
        linkedin: teacher.linkedin || '',
        courses: teacher.courses || []
      });
    } else {
      setEditingTeacher(null);
      setFormData({
        name: '',
        designation: '',
        education: '',
        experience: '',
        image: '',
        description: '',
        email: '',
        linkedin: '',
        courses: []
      });
    }
    setViewingTeacher(null);
    setIsOpen(true);
  };

  const handleView = (teacher) => {
    setViewingTeacher(teacher);
    setIsOpen(true);
    setEditingTeacher(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingTeacher(null);
    setViewingTeacher(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseSelect = (courseId) => {
    const isSelected = formData.courses.includes(courseId);
    setFormData({
      ...formData,
      courses: isSelected
        ? formData.courses.filter((id) => id !== courseId)
        : [...formData.courses, courseId]
    });
  };

  const handleSave = async () => {
    if (!currentUser) {
      alert('Please login to continue.');
      return;
    }

    try {
      const payload = { ...formData, userEmail: currentUser.email };
      if (editingTeacher) {
        await axios.put(`http://localhost:3000/teachers/${editingTeacher._id}`, payload);
      } else {
        await axios.post('http://localhost:3000/teachers', payload);
      }
      fetchTeachers();
      handleClose();
    } catch (error) {
      alert('Failed to save teacher. Make sure you are an admin.');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    if (!currentUser) {
      alert('Please login to continue.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/teachers/${id}`, {
        data: { userEmail: currentUser.email }
      });
      fetchTeachers();
    } catch (error) {
      alert('Failed to delete teacher. Make sure you are an admin.');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-base-content mb-6">Meet Our Teachers</h2>

      {currentUser?.role === 'admin' && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleOpen()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Teacher
          </button>
        </div>
      )}

      {teachers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No teachers found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-base-200 text-base-content shadow-md rounded-2xl overflow-hidden relative group transition"
            >
              <div className="p-5 flex flex-col items-center gap-2">
                <div className="w-28 h-28 bg-amber-100 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg">
                  <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-center">{teacher.name}</h3>
                <p className="text-amber-600 dark:text-amber-500 font-semibold text-lg text-center">{teacher.designation}</p>

                {teacher.education && (
                  <p className="text-sm text-left w-full mt-2 flex items-center gap-2">
                    <AcademicCapIcon className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold">Education:</span> {teacher.education}
                  </p>
                )}

                <button
                  onClick={() => handleView(teacher)}
                  className="mt-3 px-4 py-1 rounded border border-amber-600 text-amber-700 dark:text-amber-600 bg-white dark:bg-transparent hover:bg-amber-600 hover:text-white transition"
                >
                  View Profile
                </button>
              </div>


              {currentUser?.role === 'admin' && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleOpen(teacher)}
                    className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700"
                    aria-label="Edit Teacher"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    aria-label="Delete Teacher"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-auto">
          <Dialog.Panel className="bg-base-100 text-base-content rounded-xl p-6 w-full max-w-md space-y-4">
            {viewingTeacher ? (
              <>
                <Dialog.Title className="text-lg font-bold mb-4">Teacher Profile</Dialog.Title>
                <div className="flex flex-col items-center gap-3 text-center">
                  <img
                    src={viewingTeacher.image}
                    alt={viewingTeacher.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-amber-400"
                  />
                  <h3 className="text-xl font-bold">{viewingTeacher.name}</h3>
                  <p className="text-amber-500 text-lg font-semibold">{viewingTeacher.designation}</p>
                </div>

                <div className="mt-4 space-y-2 text-left">
                  {viewingTeacher.education && (
                    <div className="flex items-start gap-2">
                      <AcademicCapIcon className="w-5 h-5 text-amber-500 mt-1" />
                      <p><strong>Education:</strong> {viewingTeacher.education}</p>
                    </div>
                  )}
                  {viewingTeacher.experience && (
                    <div className="flex items-start gap-2">
                      <BriefcaseIcon className="w-5 h-5 text-amber-500 mt-1" />
                      <p><strong>Experience:</strong> {viewingTeacher.experience}</p>
                    </div>
                  )}
                  {viewingTeacher.email && (
                    <div className="flex items-start gap-2">
                      <EnvelopeIcon className="w-5 h-5 text-amber-500 mt-1" />
                      <p>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${viewingTeacher.email}`} className="text-blue-700 no-underline">
                          {viewingTeacher.email}
                        </a>
                      </p>
                    </div>
                  )}
                  {viewingTeacher.linkedin && (
                    <div className="flex items-start gap-2">
                      <FaLinkedin className="w-5 h-5 text-amber-500 mt-1" />
                      <p>
                        <strong>LinkedIn:</strong>{' '}
                        <a href={viewingTeacher.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 no-underline">
                          {viewingTeacher.linkedin}
                        </a>
                      </p>
                    </div>
                  )}
                  {viewingTeacher.courses?.length > 0 && (
                    <div className="mt-3"> 
                      <p>
                        <BookOpenIcon className="w-5 h-5 text-amber-500 inline-block mr-1" />
                        <strong>Courses:</strong></p>
                      <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-600">
                        {viewingTeacher.courses.map((id) => {
                          const course = videos.find((v) => v._id === id);
                          return course ? (
                            <li key={id}>
                              <Link to={`/courses/${id}`} className="no-underline">
                                {course.title}
                              </Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  )}
                  {viewingTeacher.description && (
                    <div className="mt-4">
                      <p className="font-bold">
                      <UserCircleIcon className="w-5 h-5 text-amber-500 inline-block mr-1" />Bio:</p>
                      <p>{viewingTeacher.description}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleClose}
                    className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <Dialog.Title className="text-lg font-bold">
                  {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                </Dialog.Title>
                {['name', 'designation', 'education', 'experience', 'email', 'linkedin', 'image'].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded bg-base-200 text-base-content"
                  />
                ))}
                <textarea
                  name="description"
                  placeholder="Short description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-base-200 text-base-content"
                />
                <div>
                  <p className="font-medium mb-1">Select Courses:</p>
                  <div className="max-h-40 overflow-y-auto border p-2 rounded bg-base-200">
                    {videos.map((video) => (
                      <label key={video._id} className="block">
                        <input
                          type="checkbox"
                          checked={formData.courses.includes(video._id)}
                          onChange={() => handleCourseSelect(video._id)}
                          className="mr-2"
                        />
                        {video.title}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleClose}
                    className="bg-base-300 px-4 py-2 rounded hover:bg-base-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-amber-600 px-4 py-2 text-white rounded hover:bg-amber-700"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default TeacherCard;
