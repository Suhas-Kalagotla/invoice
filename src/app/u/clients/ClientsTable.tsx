"use client";
import {
  Add,
  Business,
  CurrencyExchange,
  Email,
  Language,
  MoreHoriz,
  Phone,
} from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ClientModal from "./ClientModal";
import { useState } from "react";
import { Client } from "@prisma/client";

import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";

export default function ClientsTable(props: { clients: Client[] }) {
  const { clients } = props;
  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    selectableRows: "none",
    customToolbar() {
      return (
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setOpenClientModal(true);
          }}
        >
          New Client
        </Button>
      );
    },
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "",
      label: "No",
      options: {
        customBodyRenderLite(_dataIndex, rowIndex) {
          return rowIndex + 1;
        },
      },
    },

    {
      name: "",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender(_value, tableMeta) {
          const row: Client = clients[tableMeta.rowIndex];

          if (row.type == "ORGANIZATION") {
            return (
              <Stack direction="row" spacing={1}>
                <Business color="info" />
                <Stack>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {row.organization_name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {row.contact_first_name} {row.contact_last_name}
                  </Typography>
                </Stack>
              </Stack>
            );
          } else if (row.type == "PERSON") {
            return (
              <Typography>{`${row.first_name} ${row.last_name}`}</Typography>
            );
          }
        },
      },
    },
    {
      name: "",
      label: "Locale",
      options: {
        filter: true,
        sort: false,
        customBodyRender(_value, tableMeta) {
          const row: Client = clients[tableMeta.rowIndex];
          return (
            <Stack>
              <Stack direction="row" spacing={1}>
                <Language color="info" fontSize="small" />
                <Typography>{row.language_code}</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <CurrencyExchange color="info" fontSize="small" />
                <Typography>{row.currency_code}</Typography>
              </Stack>
            </Stack>
          );
        },
      },
    },
    {
      name: "",
      label: "Contact",
      options: {
        filter: true,
        sort: false,
        customBodyRender(_value, tableMeta) {
          const row: Client = clients[tableMeta.rowIndex];
          return (
            <Stack>
              <Stack direction="row" spacing={1}>
                <Phone color="info" fontSize="small" />
                <Typography>{row.phone}</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Email color="info" fontSize="small" />
                <Typography>{row.email}</Typography>
              </Stack>
            </Stack>
          );
        },
      },
    },
    {
      name: "",
      label: "Address",
      options: {
        filter: true,
        sort: false,
        customBodyRender(_value, tableMeta) {
          const row: Client = clients[tableMeta.rowIndex];
          return (
            <Stack>
              <Typography>
                {row.street_1} , {row.street_2}{" "}
              </Typography>

              <Typography>
                {row.city},{row.state},{row.country_code},{row.postal}
              </Typography>
            </Stack>
          );
        },
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        customBodyRenderLite() {
          return (
            <IconButton>
              <MoreHoriz />
            </IconButton>
          );
        },
      },
    },
  ];

  const [openClientModal, setOpenClientModal] = useState<boolean>(false);

  return (
    <Container maxWidth="xl">
      <MUIDataTable
        title={"Clients"}
        data={clients}
        columns={columns}
        options={options}
      />

      {openClientModal && (
        <ClientModal
          onClose={() => {
            setOpenClientModal(false);
          }}
        />
      )}
    </Container>
  );
}
