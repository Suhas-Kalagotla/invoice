import { prisma } from "@/lib/db";
import InvoiceForm from "./InvoiceForm";
import { Setting, Client, InvoiceItem, Invoice } from "@prisma/client";
import getUser from "@/lib/user";

export default async function InvoicePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = getUser();

  let invoice:
    | (Invoice & {
        items: InvoiceItem[];
      })
    | null = null;
  if (params.id !== "add") {
    invoice = await prisma.invoice.findUnique({
      where: {
        id: Number.parseInt(params.id),
      },
      include: {
        items: true,
      },
    });
  }

  const defaultValues = await prisma.defaultValues.findFirstOrThrow({
    where: {
      userId: user.id,
    },
  });

  const settings: Setting = await prisma.setting.findFirstOrThrow({
    where: {
      userId: user.id,
    },
  });

  const clients: Client[] = await prisma.client.findMany({
    where: {
      userId: user.id,
    },
  });

  const lastInvoice = await prisma.invoice.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  console.log("lastInvoice", lastInvoice);

  return (
    <InvoiceForm
      invoice={invoice}
      settings={settings}
      clients={clients}
      defaultValues={defaultValues}
    />
  );
}
