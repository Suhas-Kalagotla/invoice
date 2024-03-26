"use client";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { newInvoice } from "./newInvoice";
import { Invoice } from "@prisma/client";

export function NewInvoiceButton() {
  const router = useRouter();
  return (
    <Button
      startIcon={<Add />}
      size="small"
      variant="contained"
      onClick={() => {
        router.push(`/u/invoice/add`);
      }}
    >
      New
    </Button>
  );
}
