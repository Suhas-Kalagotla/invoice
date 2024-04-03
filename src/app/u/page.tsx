// page.tsx

"use server";

import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Invoice, PrismaClient } from "@prisma/client";
import InvoiceTable from "./invoice/InvoiceTable";
import { NewInvoiceButton } from "./invoice/NewInvoiceButton";
import getUser from "@/lib/user";
// import { prisma } from "@/lib/db";

const prisma = new PrismaClient();

export default async function InvoiceDashboadPage() {
  const user = await getUser();

  console.log("Dashboard...");
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
    },
  });

  const setting = await prisma.setting.findFirst({
    where: {
      id: 1,
    },
  });

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 3 }}>
        <Stack>
          <Typography variant="subtitle2" fontWeight="bold">
            Welcome, {user.name} 👋
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Create Invoices seamlessly
          </Typography>
        </Stack>
      </Paper>

      <Stack
        mt={1}
        p={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="bold" variant="subtitle1">
          Invoices
        </Typography>
        <NewInvoiceButton />
      </Stack>

      {invoices.map((inv) => {
        return <InvoiceTable invoice={inv} user={user} />;
      })}
    </Container>
  );
}
