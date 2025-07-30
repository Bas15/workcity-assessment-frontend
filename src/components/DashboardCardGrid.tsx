import React from "react";
import Skeleton from "../components/Skeleton";
import { formatDate } from "../utils/dateHelper";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

type Client = {
  name: string;
  _id: string;
  email: string;
  phone?: string;
  company?: string;
  createdAt: string;
};

type DashboardCardGridProps = {
  items: Client[];
  loading: boolean;
  error: string | null;
  emptyText?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DashboardCardGrid: React.FC<DashboardCardGridProps> = ({
  items,
  loading,
  error,
  emptyText = "No items found.",
}) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.role || "user"; // fallback to 'user' role

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete client", error);
      alert("Failed to delete client. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow space-y-2"
            >
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
      </div>
    );
  }

  if (error) return <p className="text-red-400">{error}</p>;
  if (items.length === 0) return <p className="text-gray-400">{emptyText}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${item.name}`}
                alt="User Icon"
                className="w-10 h-10 rounded-full object-cover border border-gray-700"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-400">{item.email}</p>
              </div>
            </div>
            {item.company && (
              <p className="text-sm text-gray-300 mb-1">
                Company: <span className="font-medium">{item.company}</span>
              </p>
            )}
            {item.phone && (
              <p className="text-sm text-gray-300 mb-1">
                Phone: <span className="font-medium">{item.phone}</span>
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2 place-self-end">
              Created on: {formatDate(item.createdAt)}
            </p>
          </div>

          <div className="mt-5 border-t border-gray-700 pt-3 flex justify-between items-center">
            {userRole !== "user" && (
              <button
                onClick={() => handleDelete(item._id)}
                className="text-sm text-red-400 hover:text-red-300 inline-flex items-center gap-1 transition"
                title="Delete Client"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            )}
            <button
              onClick={() => navigate(`/dashboard/clients/edit/${item._id}`)}
              className="text-sm text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 transition"
              title="Edit Client"
            >
              <PencilSquareIcon className="w-4 h-4" />
              {userRole === "user" ? "View" : "View/Edit"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCardGrid;
