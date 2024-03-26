"use server";

import { prisma } from "@/lib/db";
import getUser from "@/lib/user";
import { User, Client } from "@prisma/client";

export async function saveClientAction(values: Client) {
  const user: User = await getUser();

  const withoutId = { ...values };
  delete withoutId.id;
  if (values.id != undefined) {
    const id = Number.parseInt(values.id);

    const savedClient = await prisma.client.update({
      where: {
        userId: user.id,
        id,
      },
      data: {
        ...values,
      },
    });

    return savedClient;
  } else {
    const savedClient = await prisma.client.create({
      data: {
        ...withoutId,
        userId: user.id,
      },
    });

    return savedClient;
  }
}
