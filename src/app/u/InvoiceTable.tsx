"use client";
import {
  Invoice,
  InvoiceItem,
  PrismaClient,
  Setting,
  User,
} from "@prisma/client";
import CustomTable from "@/components/Table";
import BasicMenu from "@/components/Menu";

const prisma = new PrismaClient();

export default function InvoiceTable({
  invoices,
  user,
}: {
  invoices: (Invoice & {
    items: InvoiceItem[];
  })[];
  user: User & {
    Setting: Setting[];
  };
}) {
  const headCells = [
    {
      id: "id",
      label: "ID",
      cell: (row: any) => row.id,
      numeric: false,
      disablePadding: false,
    },
    {
      id: "bill_to",
      label: "Bill To",
      cell: (row: any) => row.bill_to,
      numeric: false,
      disablePadding: false,
    },

    {
      id: "due_date",
      label: "Due Date",
      cell: (row: Invoice) => new Date(row.due_date).toDateString(),
      numeric: false,
      disablePadding: false,
    },
    {
      id: "amount_due",
      label: "Amount Due",
      cell: (
        row: Invoice & {
          items: InvoiceItem[];
        },
      ) => {
        const subTotal = row.items
          .map((p) => p.qty * p.price)
          .reduce((p, c) => {
            return p + c;
          }, 0);

        const taxAmount = subTotal * (row.tax_rate / 100);

        const discountAmount = (subTotal + taxAmount) * (row.discount / 100);
        const total = subTotal + taxAmount - discountAmount + row.shipping;

        return total - row.amount_paid;
      },
      numeric: false,
      disablePadding: false,
    },
    {
      id: "amount_paid",
      label: "Amount Paid",
      cell: (row: any) => row.amount_paid,
      numeric: false,
      disablePadding: false,
    },
    {
      id: "action",
      label: "Action",
      cell: (row: any) => <BasicMenu user={user} invoice={row} />,
      numeric: false,
      disablePadding: false,
    },
  ];

  return <CustomTable headcells={headCells} rows={invoices} />;
}


