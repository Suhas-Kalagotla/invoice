import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { User } from "@prisma/client";

export default async function getUser() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/signin");
  }

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email as string,
    },
    include: {
      DefaultValues: true,  
      Setting: true,
    },
  });

  return user;
}
