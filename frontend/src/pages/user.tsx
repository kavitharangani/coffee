import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
}

const UserForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("API Response:", response.data); // Check if it's an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users.");
    }
  };
  

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit user registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.userName || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
      setError("Please fill in all required fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess(response.data.message);
      setError("");
      setFormData({ userName: "", email: "", password: "", confirmPassword: "", role: "user" });
      fetchUsers(); // Refresh user list after successful registration
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Registration failed");
      } else {
        setError("Registration failed");
      }
    }
  };
  
  // Handle deleting user with confirmation
const handleDelete = async (userId: string) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  
  if (!isConfirmed) return; // If user cancels, do nothing

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSuccess("User deleted successfully");
    fetchUsers(); // Refresh user list after delete
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.error || "Delete failed");
    } else {
      setError("Delete failed");
    }
  }
};


  return (
    <div className="min-h-screen p-20 bg-gray-50 flex flex-col items-center">
      {/* User Registration Form */}
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Registration</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Full Name"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-[#FFB22C] text-white p-3 rounded-lg transition">
            Register
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="mt-10 max-w-5xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">User List</h3>
        {users.length === 0 ? (
          <p className="text-gray-600 text-center">No users added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Email</th>
                  <th className="p-4 border">Role</th>
                  <th className="p-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id || index} className="border-b hover:bg-gray-50">
                      <td className="p-4 border text-center">{user?.userName || "N/A"}</td>
                      <td className="p-4 border text-center">{user?.email || "N/A"}</td>
                      <td className="p-4 border text-center">{user?.role || "N/A"}</td>
                      <td className="p-4 border text-center">
                        <button
                          onClick={() => handleDelete(user._id!)}
                          className="p-2 bg-red-500 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
