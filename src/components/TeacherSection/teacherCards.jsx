import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AuthContext from '../Auth/AuthContext'; // Adjust this path if needed

const TeacherCard = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    image: ''
  });

  // Fetch user role from backend to determine if admin
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser?.email) {
        setIsAdmin(false);
        return;
      }
      try {
        const res = await axios.get(`https://bornobyte.vercel.app/users/admin/${currentUser.email}`);
        setIsAdmin(res.data?.role === 'admin');
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setIsAdmin(false);
      }
    };
    fetchUserRole();
  }, [currentUser]);

  // Fetch all teachers from backend
  const fetchTeachers = async () => {
    try {
      const res = await axios.get('https://bornobyte.vercel.app/teachers');
      setTeachers(res.data);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleOpen = (teacher = null) => {
    setEditingTeacher(teacher);
    setFormData(
      teacher || {
        name: '',
        subject: '',
        description: '',
        image: ''
      }
    );
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingTeacher(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!currentUser) {
      alert('You must be logged in to perform this action.');
      return;
    }
    try {
      if (editingTeacher) {
        // Update teacher
        await axios.put(`https://bornobyte.vercel.app/teachers/${editingTeacher._id}`, {
          ...formData,
          userEmail: currentUser.email,
        });
      } else {
        // Add new teacher
        await axios.post('https://bornobyte.vercel.app/teachers', {
          ...formData,
          userEmail: currentUser.email,
        });
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
      alert('You must be logged in to perform this action.');
      return;
    }
    try {
      await axios.delete(`https://bornobyte.vercel.app/teachers/${id}`, {
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
      <h2 className="text-3xl font-bold text-center mb-6">Meet Our Teachers</h2>

      {isAdmin && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleOpen()}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Teacher
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden relative group"
          >
            <div className="p-5 flex items-center gap-5">
              <div className="w-24 h-24 bg-amber-100 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{teacher.name}</h3>
                <p className="text-amber-600 font-medium">{teacher.subject}</p>
              </div>
            </div>
            <div className="px-5 pb-5 text-sm text-gray-600">{teacher.description}</div>

            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleOpen(teacher)}
                  className="p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(teacher._id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <Dialog.Title className="text-lg font-bold">
              {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
            </Dialog.Title>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Short description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-amber-500 px-4 py-2 text-white rounded hover:bg-amber-600"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default TeacherCard;
