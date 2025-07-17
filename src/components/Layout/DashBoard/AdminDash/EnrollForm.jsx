import { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../../Auth/AuthContext";


const EnrollForm = () => {
  const { id: courseId } = useParams();
 
const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ phone: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");

    try {
      const res = await axios.post(
        "http://localhost:3000/enrollRequests",
        {
          courseId,
          userEmail: user.email,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Enrollment request sent!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Enroll in Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p>Email: {user.email}</p>
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="input input-bordered w-full"
          required
        />
        <button className="btn btn-primary w-full">Submit Request</button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default EnrollForm;
