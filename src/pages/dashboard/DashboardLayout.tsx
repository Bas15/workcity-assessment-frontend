import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FolderIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const isBasicUser = user?.role === "user";

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white"
        >
          {sidebarOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-5 transition-transform duration-300 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-6">
          <NavLink
            to="/dashboard"
            className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Dashboard
          </NavLink>
        </div>

        <nav className="flex flex-col space-y-4">
          {/* Clients */}
          <div>
            <button
              onClick={() => setClientsOpen(!clientsOpen)}
              className="flex items-center justify-between w-full text-left text-gray-300 hover:text-purple-400"
            >
              <span className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                Clients
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 transform transition-transform ${
                  clientsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {clientsOpen && (
              <div className="ml-6 mt-2 space-y-2 flex flex-col">
                <NavLink
                  to="/dashboard/clients"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-400 font-medium"
                      : "text-gray-400 hover:text-purple-300"
                  }
                >
                  All Clients
                </NavLink>
                {!isBasicUser && (
                  <NavLink
                    to="/dashboard/add-client"
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-400 font-medium"
                        : "text-gray-400 hover:text-purple-300"
                    }
                  >
                    Add Client
                  </NavLink>
                )}
              </div>
            )}
          </div>

          {/* Projects */}
          <div>
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="flex items-center justify-between w-full text-left text-gray-300 hover:text-purple-400"
            >
              <span className="flex items-center gap-2">
                <FolderIcon className="w-5 h-5" />
                Projects
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 transform transition-transform ${
                  projectsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {projectsOpen && (
              <div className="ml-6 mt-2 space-y-2 flex flex-col">
                <NavLink
                  to="/dashboard/projects"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-400 font-medium"
                      : "text-gray-400 hover:text-purple-300"
                  }
                >
                  All Projects
                </NavLink>
                {!isBasicUser && (
                  <NavLink
                    to="/dashboard/add-project"
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-400 font-medium"
                        : "text-gray-400 hover:text-purple-300"
                    }
                  >
                    Add Project
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="flex items-center gap-2 text-gray-300 hover:text-red-400 mt-8"
        >
          <XMarkIcon className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="hidden md:flex items-center justify-between bg-gray-950 text-white px-6 py-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold">
            {/* Hi, {user?.name || user?.email} */}
            Workcity Assesment Dashboard
          </h1>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
