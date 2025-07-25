import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../../Auth/AuthContext";

const EnrollForm = () => {
  const { id: courseId } = useParams();
  const { user, loading } = useContext(AuthContext);

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
        .get(`http://localhost:3000/videos/${courseId}`)
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
        "http://localhost:3000/enrollRequests",
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

  const handleSSLCSubmit = async () => {
    const token = localStorage.getItem("access-token");

    try {
      const res = await axios.post(
        "http://localhost:3000/initiate-payment",
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
    <div className="max-w-md mx-auto p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-md mt-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-amber-500">Enroll in Course</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedOption("manual")}
          className={`btn ${selectedOption === "manual" ? "bg-amber-500 text-white" : "btn-outline border-amber-500 text-amber-500"}`}
        >
          Manual
        </button>
        <button
          onClick={() => setSelectedOption("sslcommerz")}
          className={`btn ${selectedOption === "sslcommerz" ? "bg-amber-500 text-white" : "btn-outline border-amber-500 text-amber-500"}`}
        >
          SSLCommerz
        </button>
      </div>

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
            className="input input-bordered w-full dark:bg-gray-800"
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
            className="input input-bordered w-full dark:bg-gray-800"
            required
          />
          <button className="btn bg-amber-500 text-white w-full hover:bg-amber-600">
            Submit Manual Request
          </button>
        </form>
      )}

      {selectedOption === "sslcommerz" && (
        <div className="space-y-4">
          <p>Email: {user.email}</p>
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="input input-bordered w-full dark:bg-gray-800"
            required
          />
          <button
            onClick={handleSSLCSubmit}
            className="btn bg-amber-500 text-white w-full hover:bg-amber-600"
          >
            Pay with SSLCommerz
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default EnrollForm;
