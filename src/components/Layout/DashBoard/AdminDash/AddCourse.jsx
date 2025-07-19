// // src/components/Admin/AddCourse.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// // import PendingCourses from './PendingCourses';

// const AddCourse = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     instructor: '',
//     category: '',
//     duration: '',
//     price: '',
//     teacherEmail: '',
//     otherLink: '',
//   });

//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [videos, setVideos] = useState([{  title: '', url: '', chapter: '', subject: '' }]);
//   const [uploading, setUploading] = useState(false);

//   const imgbbApiKey = import.meta.env.VITE_Image_hosting_key;

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleThumbnailChange = (e) => {
//     setThumbnailFile(e.target.files[0]);
//   };

//   const handleVideoChange = (index, field, value) => {
//     const updatedVideos = [...videos];
//     updatedVideos[index][field] = value;
//     setVideos(updatedVideos);
//   };

//   const addVideoField = () => {
//     setVideos([...videos, { title: '', url: '', chapter: '', subject: '' }]);
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (!thumbnailFile) return alert("Please select a thumbnail image.");

//     setUploading(true);

//     // Upload image to imgbb
//     const imgForm = new FormData();
//     imgForm.append("image", thumbnailFile);

//     try {
//       const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
//         method: 'POST',
//         body: imgForm,
//       });

//       const imgData = await imgRes.json();
//       const imageUrl = imgData.data.url;

//       const courseData = {
//         title: formData.title,
//         instructor: formData.instructor,
//         thumbnail: imageUrl,
//         category: formData.category,
//         duration: formData.duration,
//         price: parseFloat(formData.price),
//         teacherEmail: formData.teacherEmail,
//         status: "pending",
//         otherLink: formData.otherLink || null,
//         videos: videos.filter(v => v.title && v.url)
//       };

//       const res = await axios.post('http://localhost:3000/videos', courseData, {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem('access-token')}`
//         }
//       });

//       alert("Course added successfully!");
//       console.log("Server response:", res.data);

//       // Reset form
//       setFormData({
//         title: '',
//         category: '',
//         duration: '',
//         price: '',
//         teacherEmail: '',
//         otherLink: ''
//       });
//       setThumbnailFile(null);
//       setVideos([{ title: '', url: '' }]);
//     } catch (err) {
//       console.error("Upload failed", err);
//       alert(`Failed to add course: ${err.response?.data?.message || err.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       {/* <h2 className="text-2xl font-bold mb-4">Pending Courses</h2>
//       <PendingCourses /> */}

//       <h2 className="text-2xl font-bold mt-8 mb-4">Add New Course</h2>
//       <form onSubmit={handleSubmit} className="grid gap-4">
//         <input name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="input input-bordered" required />
//         <input name="instructor" placeholder="Course Instructor" value={formData.instructor} onChange={handleChange} className="input input-bordered" required />
        
//         <input type="file" accept="image/*" onChange={handleThumbnailChange} className="file-input file-input-bordered" required />
        
//       <select
//   name="category"
//   value={formData.category}
//   onChange={handleChange}
//   className="select select-bordered"
//   required
// >
//   <option value="" disabled>Select Category</option>
//   <option value="SSC">SSC</option>
//   <option value="HSC">HSC</option>
//   <option value="Undergraduate">Undergraduate</option>
// </select>

        
//         <input name="duration" placeholder="Duration (e.g., 3 Months)" value={formData.duration} onChange={handleChange} className="input input-bordered" required />
        
//         <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="input input-bordered" required />
        
//         <input name="teacherEmail" placeholder="Teacher Email" value={formData.teacherEmail} onChange={handleChange} className="input input-bordered" required />
        
//         <input name="otherLink" placeholder="Other Related Link (optional)" value={formData.otherLink} onChange={handleChange} className="input input-bordered" />

//         <div>
//           <h4 className="font-semibold mt-4 mb-2">Course Videos</h4>
//           {videos.map((video, index) => (
//             <div key={index} className="grid grid-cols-2 gap-2 mb-2">
//               <input
//                 placeholder="Video Title"
//                 value={video.title}
//                 onChange={e => handleVideoChange(index, 'title', e.target.value)}
//                 className="input input-bordered"
//                 required
//               />
//               <input
//                 placeholder="Video URL"
//                 value={video.url}
//                 onChange={e => handleVideoChange(index, 'url', e.target.value)}
//                 className="input input-bordered"
//                 required
//               />
//                <input
//         placeholder="Chapter"
//         value={video.chapter}
//         onChange={e => handleVideoChange(index, 'chapter', e.target.value)}
//         className="input input-bordered"
//         required
//       />
//       <input
//         placeholder="Subject"
//         value={video.subject}
//         onChange={e => handleVideoChange(index, 'subject', e.target.value)}
//         className="input input-bordered"
//         required
//       />
//             </div>
//           ))}
//           <button type="button" onClick={addVideoField} className="btn btn-sm btn-outline">+ Add Another Video</button>
//         </div>

//         <button type="submit" className="btn btn-primary mt-4" disabled={uploading}>
//           {uploading ? "Uploading..." : "Submit Course"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCourse;
import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    category: '',
    duration: '',
    price: '',
    teacherEmail: '',
    otherLink: '',
    overview: '',
    requirements: '',
    whatYouWillLearn: '',
    featured: false,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videos, setVideos] = useState([{ title: '', url: '', chapter: '', subject: '' }]);
  const [uploading, setUploading] = useState(false);
  const imgbbApiKey = import.meta.env.VITE_Image_hosting_key;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleThumbnailChange = (e) => setThumbnailFile(e.target.files[0]);

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index][field] = value;
    setVideos(updatedVideos);
  };

  const addVideoField = () => {
    setVideos([...videos, { title: '', url: '', chapter: '', subject: '' }]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!thumbnailFile) return alert("Please select a thumbnail image.");

    setUploading(true);

    const imgForm = new FormData();
    imgForm.append("image", thumbnailFile);

    try {
      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imgForm,
      });

      const imgData = await imgRes.json();
      const imageUrl = imgData.data.url;

      const courseData = {
        title: formData.title,
        instructor: formData.instructor,
        thumbnail: imageUrl,
        category: formData.category,
        duration: formData.duration,
        price: parseFloat(formData.price),
        teacherEmail: formData.teacherEmail,
        status: "pending",
        otherLink: formData.otherLink || null,
        overview: formData.overview,
        featured: formData.featured,
        requirements: formData.requirements.split(',').map(r => r.trim()),
        whatYouWillLearn: formData.whatYouWillLearn.split(',').map(w => w.trim()),
        videos: videos.filter(v => v.title && v.url),
      };

      const res = await axios.post('http://localhost:3000/videos', courseData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      });

      alert("Course added successfully!");
      console.log("Server response:", res.data);

      // Reset form
      setFormData({
        title: '',
        instructor: '',
        category: '',
        duration: '',
        price: '',
        teacherEmail: '',
        otherLink: '',
        overview: '',
        requirements: '',
        whatYouWillLearn: '',
        featured: false,
      });
      setThumbnailFile(null);
      setVideos([{ title: '', url: '', chapter: '', subject: '' }]);
    } catch (err) {
      console.error("Upload failed", err);
      alert(`Failed to add course: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">

        {/* Title, Instructor, etc. */}
        <input name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="input input-bordered" required />
        <input name="instructor" placeholder="Course Instructor" value={formData.instructor} onChange={handleChange} className="input input-bordered" required />
        <input type="file" accept="image/*" onChange={handleThumbnailChange} className="file-input file-input-bordered" required />

        {/* Category */}
        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered" required>
          <option value="" disabled>Select Category</option>
          <option value="SSC">SSC</option>
          <option value="HSC">HSC</option>
          <option value="Undergraduate">Undergraduate</option>
        </select>

        {/* More inputs */}
        <input name="duration" placeholder="Duration (e.g., 3 Months)" value={formData.duration} onChange={handleChange} className="input input-bordered" required />
        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="input input-bordered" required />
        <input name="teacherEmail" placeholder="Teacher Email" value={formData.teacherEmail} onChange={handleChange} className="input input-bordered" required />
        <input name="otherLink" placeholder="Other Related Link (optional)" value={formData.otherLink} onChange={handleChange} className="input input-bordered" />

        {/* New fields */}
        <textarea name="overview" placeholder="Course Overview" value={formData.overview} onChange={handleChange} className="textarea textarea-bordered" required />
        <textarea name="requirements" placeholder="Requirements (comma separated)" value={formData.requirements} onChange={handleChange} className="textarea textarea-bordered" required />
        <textarea name="whatYouWillLearn" placeholder="What you will learn (comma separated)" value={formData.whatYouWillLearn} onChange={handleChange} className="textarea textarea-bordered" required />

        {/* Featured checkbox */}
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="checkbox" />
          <span>Feature this course</span>
        </label>

        {/* Videos section */}
        <div>
          <h4 className="font-semibold mt-4 mb-2">Course Videos</h4>
          {videos.map((video, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              <input placeholder="Video Title" value={video.title} onChange={e => handleVideoChange(index, 'title', e.target.value)} className="input input-bordered" required />
              <input placeholder="Video URL" value={video.url} onChange={e => handleVideoChange(index, 'url', e.target.value)} className="input input-bordered" required />
              <input placeholder="Chapter" value={video.chapter} onChange={e => handleVideoChange(index, 'chapter', e.target.value)} className="input input-bordered" required />
              <input placeholder="Subject" value={video.subject} onChange={e => handleVideoChange(index, 'subject', e.target.value)} className="input input-bordered" required />
            </div>
          ))}
          <button type="button" onClick={addVideoField} className="btn btn-sm btn-outline">+ Add Another Video</button>
        </div>

        <button type="submit" className="btn btn-primary mt-4" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;

