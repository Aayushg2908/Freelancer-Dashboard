import { getClients } from "@/actions/clients";
import { ClientModalButton } from "./_components/ClientModalButton";
import { Columns, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";

const ClientsPage = async () => {
  const clients = await getClients();

  const formattedClients: Columns[] = clients.map((client) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    projects: client.projects,
    country: client.country,
    referralSource: client.referralSource,
  }));

  return (
    <div className="m-6 flex flex-col">
      <div className="text-center md:text-start font-semibold text-4xl sm:text-5xl tracking-tight">
        Clients
      </div>
      <div className="flex flex-col justify-center md:flex-row md:justify-between items-center gap-y-2">
        <ClientModalButton />
      </div>
      <DataTable searchKey="name" columns={columns} data={formattedClients} />
    </div>
  );
};

export default ClientsPage;
