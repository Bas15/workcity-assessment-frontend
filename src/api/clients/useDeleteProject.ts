import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteProject = async (projectId: string) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  return { deleteProject, loading, error };
};
