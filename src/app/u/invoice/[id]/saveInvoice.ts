"use server";

import { prisma } from "@/lib/db";
import getUser from "@/lib/user";
import { Invoice, InvoiceItem, User } from "@prisma/client";

export async function saveInvoice(
  values: Invoice & {
    items: InvoiceItem[];
  }
) {
  const user:User = await getUser();
  const { items, ...invoice } = values;
  const oldInvoice = await prisma.invoice.findUnique({
    where: {
      id:invoice.id,
    }
  });
  if(oldInvoice){
    await prisma.invoiceItem.deleteMany({
      where:{
        invoiceId: oldInvoice.id,
      }
    })
    const update = await prisma.invoice.update({
      where:{
        id:invoice.id,
      },
      data:{
        ...invoice,
      userId: user.id,
      items: {
        create: items.map((item) => ({
          description: item.description,
          price: item.price,
          qty: item.qty,
        })),
      },
      }
    })
    return update;
  }
  const updatedInvoice = await prisma.invoice.create({
    // where: {
    //   userId: user.id,
    //   id: values.id,
    // },
    data: {
      ...invoice,
      userId: user.id,
      items: {
        create: items.map((item) => ({
          description: item.description,
          price: item.price,
          qty: item.qty,
        })),
      },
    },
  });

  return updatedInvoice;
}
