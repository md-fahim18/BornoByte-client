import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";  // make sure you have this
import { FiArrowLeft } from "react-icons/fi"; // add at top

const EnrollForm = () => {
  const { id: courseId } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [formData, setFormData] = useState({
    phone: "",
    transactionId: "",
  });
  const [courseTitle, setCourseTitle] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("manual");

  useEffect(() => {
    if (courseId) {
      axios
        .get(`https://bornobyte.vercel.app/videos/${courseId}`)
        .then((res) => {
          setCourseTitle(res.data.title || "");
          setPrice(res.data.price || "");
        })
        .catch(() => {
          setCourseTitle("");
          setPrice("");
        });
    }
  }, [courseId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        Please log in to enroll in this course.
      </div>
    );
  }

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");

    try {
      await axios.post(
        "https://bornobyte.vercel.app/enrollRequests",
        {
          courseId,
          courseTitle,
          userEmail: user.email,
          phone: formData.phone,
          transactionId: formData.transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Enrollment request submitted for manual review.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleSSLCSubmit = async () => {
    const token = localStorage.getItem("access-token");

    try {
      const res = await axios.post(
        "https://bornobyte.vercel.app/initiate-payment",
        {
          courseId,
          courseTitle,
          userEmail: user.email,
          phone: formData.phone,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        setMessage("Failed to initiate payment.");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Payment initiation failed.");
    }
  };

return (

  <>
  <div>

         {/* Back button */}
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline btn-md border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white top-10 left-4 fixed z-50"
    >
      <FiArrowLeft className="text-lg" />  Back to Course Details
    </button>
    
  </div>

  <div className="max-w-md mx-auto p-6 rounded-2xl bg-base-100 text-base-content shadow-2xl mt-6">
    <h2 className="text-2xl font-bold mb-4 text-amber-500">Enroll in Course</h2>



    {/* Option Buttons */}
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => setSelectedOption("manual")}
        className={`btn ${
          selectedOption === "manual"
            ? "bg-amber-500 text-white hover:bg-amber-600"
            : "btn-outline border-amber-500 text-amber-500"
        }`}
      >
        Manual
      </button>

      <button
        onClick={() =>
          setMessage("⚠️ SSLCommerz payment option is unavailable for now.")
        }
        className="btn btn-outline border-amber-500 text-amber-500"
      >
        SSLCommerz
      </button>
    </div>

    {/* Manual Payment Form */}
    {selectedOption === "manual" && (
      <form onSubmit={handleManualSubmit} className="space-y-4">
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
        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          value={formData.transactionId}
          onChange={(e) =>
            setFormData({ ...formData, transactionId: e.target.value })
          }
          className="input input-bordered w-full"
          required
        />
        <button className="btn bg-amber-500 text-white w-full hover:bg-amber-600">
          Submit Manual Request
        </button>
      </form>
    )}

    {/* Message */}
    {message && (
      <p className="mt-4 text-center text-error">{message}</p>
    )}
  </div>
  </>
);

};

export default EnrollForm;
