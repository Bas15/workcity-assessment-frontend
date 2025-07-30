/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface ClientFormData {
  name: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AddEditClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // If present, it's edit mode
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;

  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  // Fetch existing client data if in edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${API_URL}/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFormData({
            name: res.data.name,
            email: res.data.email,
          });
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load client data.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "user") return;

    setLoading(true);
    setError(null);

    try {
      if (id) {
        await axios.put(`${API_URL}/clients/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${API_URL}/clients`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate("/dashboard/clients");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {id
          ? role === "user"
            ? "Client Details"
            : "Edit Client"
          : "Add Client"}
      </h2>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
            disabled={role === "user"}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            disabled={role === "user"}
            required
          />
        </div>

        {role !== "user" && (
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : id ? "Update Client" : "Add Client"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEditClientForm;
