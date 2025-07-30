/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

export interface Project {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  client: {
    _id: string;
    name: string;
    email: string;
  };
  createdBy: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useGetProjects = (clientId?: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = clientId
          ? `${API_URL}/projects/client/${clientId}`
          : `${API_URL}/projects`;
        const res = await axios.get<Project[]>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [clientId]);

  return { projects, loading, error };
};
