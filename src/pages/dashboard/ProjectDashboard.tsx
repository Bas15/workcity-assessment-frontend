import { useParams, Link } from "react-router-dom";
import { useGetProjects } from "../../api/clients/useGetProjects";
import { formatDate } from "../../utils/dateHelper";
import Skeleton from "../../components/Skeleton";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "../../store/hooks";
import { useDeleteProject } from "../../api/clients/useDeleteProject";

const ProjectDashboard = () => {
  const { clientId } = useParams();
  const { projects, loading, error } = useGetProjects(clientId);
  const user = useAppSelector((state) => state.auth.user);

  const { deleteProject } = useDeleteProject();

  const handleDelete = async (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(projectId);
      window.location.reload(); // Consider refetching instead of reloading
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {clientId ? "Projects by Client" : "All Projects"}
      </h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 bg-gray-800 rounded-lg">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-400">{error}</p>}

      {!loading && projects.length === 0 && (
        <p className="text-gray-400">No projects found.</p>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const canEditOrDelete =
              user?.role !== "user" || user?._id === project.createdBy;

            return (
              <div
                key={project._id}
                className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition relative"
              >
                <img
                  src="/icons/folder.svg"
                  alt="icon"
                  className="absolute top-3 right-3 w-5 h-5 opacity-50"
                />

                <h2 className="text-lg font-semibold mb-1">{project.title}</h2>
                <p className="text-sm text-gray-400">
                  {project.description || "No description"}
                </p>

                <p className="text-sm mt-2">
                  Client:{" "}
                  <span className="text-gray-300">
                    {project.client?.name || "N/A"}
                  </span>
                  <br />
                  <span className="text-gray-300 text-xs">
                    {project.client?.email || "N/A"}
                  </span>
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Created: {formatDate(project.createdAt)}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-3">
                  {canEditOrDelete && user?.role !== "user" && (
                    <>
                      <Link
                        to={`/dashboard/projects/edit/${project._id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>

                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(project._id)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <Link
                    to={`/dashboard/projects/edit/${project._id}`}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
