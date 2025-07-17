// src/pages/Admin/AdminEnrollRequests.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEnrollRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/enrollRequests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch enroll requests", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/enrollRequests/${id}`,
        { status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      Swal.fire("Approved!", "User has been granted access.", "success");
      fetchRequests();
    } catch (err) {
      Swal.fire("Error", "Failed to approve", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This enrollment request will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/enrollRequests/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        Swal.fire("Deleted!", "Request has been removed.", "success");
        fetchRequests();
      } catch (err) {
        Swal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  if (loading) return <p className="text-center py-10">Loading requests...</p>;

  if (requests.length === 0)
    return <p className="text-center py-10 text-gray-500">No enrollment requests found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-orange-600">Enrollment Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-base-200 text-base font-semibold">
              <th>#</th>
              <th>User</th>
              <th>Course</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>
                  <div>
                    <p className="font-medium">{req.userName}</p>
                    <p className="text-xs text-gray-500">{req.userEmail}</p>
                  </div>
                </td>
                <td>{req.courseTitle}</td>
                <td>
                  <span
                    className={`badge ${
                      req.status === "approved" ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="text-center space-x-2">
                  {req.status !== "approved" && (
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEnrollRequests;