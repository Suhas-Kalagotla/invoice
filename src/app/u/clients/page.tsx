import { prisma } from "@/lib/db";
import getUser from "@/lib/user";
import { User } from "@prisma/client";
import ClientsTable from "./ClientsTable";
import { getClients } from "./clients";

export default async function ClientsPage() {
  const clients = await getClients();
  return <ClientsTable clients={clients} />;
}
