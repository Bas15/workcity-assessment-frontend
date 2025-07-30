import { useGetClients } from "../../api/clients/useGetClients";
import DashboardCardGrid from "../../components/DashboardCardGrid";

const ClientDashboard = () => {
  const { clients = [], loading, error } = useGetClients();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <DashboardCardGrid
        items={clients}
        loading={loading}
        error={error}
        emptyText="No clients found."
      />
    </div>
  );
};

export default ClientDashboard;
