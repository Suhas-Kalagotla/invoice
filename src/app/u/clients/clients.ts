import { prisma } from "@/lib/db";
import getUser from "@/lib/user";
import { User, Client } from "@prisma/client";

export async function getClients(): Promise<Client[]> {
  const user: User = await getUser();
  const clients: Client[] = await prisma.client.findMany({
    where: {
      userId: user.id,
    },
  });

  return clients;
}
