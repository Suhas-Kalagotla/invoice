"use client";
import {
  ButtonGroup,
  IconButton,
  Modal,
  Paper,
  Stack,
  Divider,
  Typography,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import moment from "moment";
// MUI Icons
import CloseIcon from "@mui/icons-material/Close";

import ReactToPrint from "react-to-print";
import React from "react";
import "./print.css";
import { Print } from "@mui/icons-material";
import Image from "next/image";
import { Client } from "@prisma/client";
import { StyledTableCell, StyledTableRow } from "@/components/CustomTable";

const printableRef = React.createRef<HTMLDivElement>();

export default function PrintPreviewModal(props: {
  onClose: () => void;
  data: Invoice;
  settings: Setting;
  clients: Client[];
}) {
  const { data, settings, clients } = props;
  const printButton = React.createRef<HTMLButtonElement>();

  const client: Client = clients.find((c: Client) => c.id == data.bill_to);

  debugger;
  return (
    <>
      <Modal open={true} onClose={props.onClose}>
        <Paper
          sx={{
            height: "100dvh",
            width: "100vw",
          }}
        >
          <Stack sx={{ height: "100%" }}>
            {/* Header */}
            <Stack px={2} sx={{}}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontWeight={"bold"} variant="subtitle1">
                  Print Preview
                </Typography>
                <ButtonGroup>
                  <ReactToPrint
                    trigger={() => (
                      <IconButton ref={printButton}>
                        <Print />
                      </IconButton>
                    )}
                    documentTitle={`${data.bill_to}`}
                    content={() => printableRef.current}
                  />
                  <IconButton color="warning" onClick={props.onClose}>
                    <CloseIcon />
                  </IconButton>
                </ButtonGroup>
              </Stack>
            </Stack>

            <Divider />
            <Stack
              id="ooo"
              ref={printableRef}
              flexGrow={1}
              sx={{
                // width:"900px",
                p: 2,
                overflowY: "auto",
                boxDecorationBreak: "clone",
              }}
            >
              <Container>
                {/* Quotation Header */}
                <Grid
                  container
                  spacing={2}
                  fontSize="10"
                  justifyContent={"space-between"}
                >
                  <Grid xs={6}>
                    <Stack direction={"row"}>
                      <Image
                        height={32}
                        width={32}
                        src={"/logo.png"}
                        alt="Company Logo"
                      />
                      <Stack ml={1} spacing={0.5}>
                        <Stack>
                          <Typography fontWeight={"bold"}>
                            {settings.company_name}
                          </Typography>
                          <Typography>
                            {settings.street_1} , {settings.street_1} -{" "}
                            {settings.city}
                          </Typography>
                        </Stack>
                        <Typography fontWeight={"bold"}>Bill To</Typography>

                        <>
                          {client.type == "ORGANIZATION" && (
                            <Typography variant="subtitle1" fontWeight="bold">
                              {client.organization_name}
                            </Typography>
                          )}

                          {client.type == "PERSON" && (
                            <Typography variant="subtitle1" fontWeight="bold">
                              {client.first_name}
                              {client.last_name}
                            </Typography>
                          )}

                          <Typography>
                            {client.city},{client.state},{client.postal}
                          </Typography>
                          <Typography>{client.country_code},</Typography>
                        </>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid xs={6} alignItems={"flex-end"}>
                    <Stack
                      justifyContent="flex-end"
                      direction="row"
                      spacing={2}
                    >
                      <Stack spacing={1}>
                        <Stack alignItems="flex-end">
                          <Typography fontWeight={"bold"} variant="h4">
                            {data.INVOICE_lbl}
                          </Typography>
                          <Typography variant="subtitle2" fontWeight="bold">
                            #{data.id}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack
                      justifyContent="flex-end"
                      direction="row"
                      spacing={2}
                    >
                      {/* Row */}
                      <Stack spacing={1}>
                        <Stack>
                          <Typography fontWeight={"bold"} variant="subtitle1">
                            Date
                          </Typography>
                          <Typography variant="subtitle2">{ moment().calendar() }</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                <Stack mt={3}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell>Item</StyledTableCell>
                          <StyledTableCell>Quantity</StyledTableCell>
                          <StyledTableCell>Rate</StyledTableCell>
                          <StyledTableCell>Amount</StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {data.items.map((item, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell>
                                {item.description}
                              </StyledTableCell>
                              <StyledTableCell>{item.qty}</StyledTableCell>
                              <StyledTableCell>{item.rate}</StyledTableCell>
                              <StyledTableCell>
                                {item.rate * item.qty}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Grid container justifyContent="flex-end">
                    <Grid xs={3}>
                      <TableContainer sx={{ mt: 3 }}>
                        <Table size="small">
                          <TableRow>
                            <TableCell>Sub Total</TableCell>
                            <TableCell>Val</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell>Val</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Shipping</TableCell>
                            <TableCell>Val</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Discount</TableCell>
                            <TableCell>Val</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell>Val</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Paid</TableCell>
                            <TableCell>Val</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Balance Due</TableCell>
                            <TableCell>##3</TableCell>
                          </TableRow>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Stack>

                {/* Footer */}

                <Stack mt={3} spacing={2}>
                  {/* Payment Terms */}
                  <Stack>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {" "}
                      Payment Terms{" "}
                    </Typography>
                    <Typography> {data.terms} </Typography>
                  </Stack>

                  {/* Note */}
                  <Stack>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Note{" "}
                    </Typography>
                    <Typography> {data.note} </Typography>
                  </Stack>
                </Stack>
              </Container>
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}
