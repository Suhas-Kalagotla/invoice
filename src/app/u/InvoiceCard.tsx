"use client";
import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Invoice } from "@prisma/client";
import Link from "next/link";

export default function InvoiceCard(props: { invoice: Invoice }) {
  const { invoice } = props;
  return (
    <Card>
      <CardHeader>{invoice.bill_to}</CardHeader>
      <CardContent>
        <Typography> {invoice.bill_to} </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/u/invoice/${invoice.id}`}>
          <IconButton>
            <Edit color="info" />
          </IconButton>
        </Link>
        <IconButton
        // onClick={() => {
        //   alert("This will open delete dialog of invoice");
        // }}
        >
          <Delete color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
