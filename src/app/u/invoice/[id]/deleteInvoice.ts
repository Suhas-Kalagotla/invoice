"use server";

import { prisma } from "@/lib/db";
import {   Invoice } from "@prisma/client";

export async function deleteInvoice(invoiceId : number ) {
   
  await prisma.invoiceItem.deleteMany({
    where:{
        invoiceId:invoiceId,
    },
  }
  )
  await prisma.invoice.delete({
    where:{
        id:invoiceId,
    }
  })
  return ;
}
