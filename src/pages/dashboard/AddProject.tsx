/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showError, showSuccess } from "../../utils/toast";

interface ProjectFormData {
  title: string;
  description: string;
  clientId: string;
}

interface Client {
  _id: string;
  name: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AddProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // if present, it's edit mode
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    clientId: "",
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch clients list for dropdown
  useEffect(() => {
    axios
      .get(`${API_URL}/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setClients(res.data))
      .catch(() => setClients([]));
  }, []);

  // Fetch existing project data if in edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${API_URL}/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const project = res.data;
          setFormData({
            title: project.title,
            description: project.description || "",
            clientId: project.client?._id || "",
          });
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load project data.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "user") return;

    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      client: formData.clientId,
    };

    try {
      if (id) {
        await axios.put(`${API_URL}/projects/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showSuccess("Project updated successfully.");
      } else {
        await axios.post(`${API_URL}/projects`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showSuccess("Project created successfully.");
      }
      navigate("/dashboard/projects");
    } catch (err: any) {
      const msg = err.response?.data?.message || "An error occurred.";
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {id
          ? role === "user"
            ? "Project Details"
            : "Edit Project"
          : "Add Project"}
      </h2>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            value={formData.title}
            onChange={handleChange}
            disabled={role === "user"}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            value={formData.description}
            onChange={handleChange}
            disabled={role === "user"}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Client</label>
          <select
            name="clientId"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            value={formData.clientId}
            onChange={handleChange}
            disabled={role === "user"}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} ({client.email})
              </option>
            ))}
          </select>
        </div>

        {role !== "user" && (
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : id ? "Update Project" : "Add Project"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProject;
