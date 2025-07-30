import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import ProjectDashboard from "./pages/dashboard/ProjectDashboard";
import AddClient from "./pages/dashboard/AddEditClientForm";
import AddProject from "./pages/dashboard/AddProject";
import AddEditClientForm from "./pages/dashboard/AddEditClientForm";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="clients" element={<ClientDashboard />} />
        <Route path="clients/edit/:id" element={<AddEditClientForm />} />
        <Route path="projects" element={<ProjectDashboard />} />
        <Route path="projects/edit/:id" element={<AddProject />} /> 
        <Route path="add-client" element={<AddClient />} />
        <Route path="add-project" element={<AddProject />} />
      </Route>

      {/*Catch-all fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
