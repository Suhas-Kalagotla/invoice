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
      <div className="w-full border bg-black flex flex-row">
        <div className="w-full bg-black">
        hello
        </div>
      </div>
  );
}
