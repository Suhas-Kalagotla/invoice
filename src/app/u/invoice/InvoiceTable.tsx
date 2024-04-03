"use client";
import { downloadInvoice } from "@/components/Invoice/downloadinvoice";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Invoice, InvoiceItem, Setting, User } from "@prisma/client";
import Link from "next/link";

export default function InvoiceCard(props: {
  invoice: Invoice & {
    items: InvoiceItem[];
  };
  user: User & {
    Setting: Setting[];
  };
}) {
  const { invoice, user } = props;
  console.log(user.name, invoice.bill_to);

  return (
    <div className="w-full border bg-black flex flex-row">
      <div className="w-full bg-black">
        {/* <PdfCard title="Invoice" /> */}
        <Button onClick={() => downloadInvoice(invoice, user)}>Download</Button>
        hello
      </div>
    </div>
  );
}
