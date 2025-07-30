/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Home = () => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);

  const [totalClients, setTotalClients] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        };

        const [clientsRes, projectsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/clients`, { headers }),
          axios.get(`${API_BASE_URL}/projects`, { headers }),
        ]);

        setTotalClients(clientsRes.data.length || 0);
        setTotalProjects(projectsRes.data.length || 0);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">
        Welcome Back{user?.name ? `, ${user.name}` : ""} 👋
      </h1>
      <p className="text-gray-400 mb-6">
        Here's a quick overview of your dashboard.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Clients"
          value={totalClients}
          loading={loading}
          Icon={UserGroupIcon}
        />
        <StatCard
          title="Active Projects"
          value={totalProjects}
          loading={loading}
          Icon={ClipboardDocumentListIcon}
        />
      </div>

      {/* Quick Links */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-3">
          <li>
            <a
              href="/dashboard/clients"
              className="text-purple-400 hover:underline hover:text-purple-300"
            >
              <ArrowRightCircleIcon className="w-5 h-5 inline-block mr-1" /> View All Clients
            </a>
          </li>
          <li>
            <a
              href="/dashboard/projects"
              className="text-purple-400 hover:underline hover:text-purple-300"
            >
              <ArrowRightCircleIcon className="w-5 h-5 inline-block mr-1" /> View All Projects
            </a>
          </li>
          {user?.role !== "user" && (
            <li>
              <a
                href="/dashboard/add-client"
                className="text-purple-400 hover:underline hover:text-purple-300"
              >
                <ArrowRightCircleIcon className="w-5 h-5 inline-block mr-1" /> Add New Client
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  loading,
  Icon,
}: {
  title: string;
  value: number;
  loading: boolean;
  Icon: React.ElementType;
}) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-5">
    <div className="bg-purple-600 p-3 rounded-full shadow-md">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <h2 className="text-sm text-gray-400">{title}</h2>
      <p className="text-3xl font-bold mt-1 text-white">
        {loading ? <Skeleton className="h-7 w-14 rounded-md" /> : value}
      </p>
    </div>
  </div>
);

export default Home;
