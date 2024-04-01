"use server";

import { prisma } from "@/lib/db";
import { DefaultValues, User } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function newInvoice(): Promise<any> {
  // Create a new invoice record

  const session = await getServerSession();

  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }
  console.log("Session", session);

  const user: User = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email as string,
    },
  });

  console.log("User", user);

  const defaultValues: DefaultValues =
    await prisma.defaultValues.findFirstOrThrow({
      where: {
        userId: user.id,
      },
    });

  console.log("DefaultValuesss", defaultValues);

  const defaultValuesWthoutId = { ...defaultValues };
  delete defaultValuesWthoutId.id;

  const newInvoice = prisma.invoice.create({
    data: {
      userId: user.id,
      amount_paid: 0,
      bill_to: "",
      shipped_to: "",
      shipping: 0,

      date_prepared: new Date(),
      due_date: new Date(),

      discount: 0,

      payment_terms: "",
      po: "",
      link: "",

      ...defaultValuesWthoutId,

      //
    },
  });

  // const savedInvoices = localStorage.getItem("invoices");

  return newInvoice;
}
