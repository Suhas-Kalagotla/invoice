"use client";
import {
  Add,
  Anchor,
  Close,
  Delete,
  Home,
  Language,
  QrCode,
  Save,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { createRef, forwardRef, useState } from "react";
import AdvTextField from "./components/AdvTestField";
import InvoiceTable from "./InvoiceTable";

import { currencies } from "../../currencies";
import { FormattedNumber, IntlProvider } from "react-intl";
import NumericFormatCustom from "../../../../components/NumericFormatCustom";
import { TransitionProps } from "@mui/material/transitions";
import GenerateButton from "./GenerateButton";
import ImageSelector from "./ImageSelector";
import Link from "next/link";
import {
  Invoice,
  InvoiceItem,
  Setting,
  Client,
  DefaultValues,
} from "@prisma/client";
import { saveInvoice } from "./saveInvoice";
import ClientModal from "../../clients/ClientModal";
import PrintPreviewModal from "./printing/PrintPreviewModal";
import { useRouter } from "next/navigation";

export default function InvoiceForm(props: {
  invoice:
    | (Invoice & {
        items: InvoiceItem[];
      })
    | null;
  settings: Setting;
  clients: Client[];
  defaultValues: DefaultValues;
  invoiceId: number;
}) {
  const { invoice, clients, settings, defaultValues, invoiceId } = props;

  const router = useRouter();

  const initialValues: Invoice & {
    items: InvoiceItem[];
  } = invoice || {
    id: invoiceId,
    userId: 0,
    date_prepared: new Date(),
    due_date: new Date(),
    bill_to: "",
    shipped_to: "",
    payment_terms: 0,
    po: "",
    note: "",
    terms: "",
    items: [] as InvoiceItem[],
    currency_code: "USD",
    tax_rate: 0,
    discount: 0,
    shipping: 0,
    amount_paid: 0,
    link: "",
    FROM_lbl: defaultValues.FROM_lbl || "From",
    INVOICE_lbl: defaultValues.INVOICE_lbl || "Invoice",
    BILL_TO_lbl: defaultValues.BILL_TO_lbl || "Bill To",
    SHIPPED_TO_lbl: defaultValues.SHIPPED_TO_lbl || "Shipped To",
    PAYMENT_TERMS_lbl: defaultValues.PAYMENT_TERMS_lbl || "Payment Terms",
    DATE_PREPARED_lbl: defaultValues.DATE_PREPARED_lbl || "Date Prepared",
    DUE_DATE_lbl: defaultValues.DUE_DATE_lbl || "Due Date",
    TABLE_ITEM_lbl: defaultValues.TABLE_ITEM_lbl || "Item",
    TABLE_QTY_lbl: defaultValues.TABLE_QTY_lbl || "Qty",
    TABLE_RATE_lbl: defaultValues.TABLE_RATE_lbl || "Rate",
    TABLE_AMOUNT_lbl: defaultValues.TABLE_AMOUNT_lbl || "Amount",
    PO_lbl: defaultValues.PO_lbl || "PO",
    NOTE_lbl: defaultValues.NOTE_lbl || "Note",
    TERMS_lbl: defaultValues.TERMS_lbl || "Terms",
    LINK_lbl: defaultValues.LINK_lbl || "Link",
    QR_lbl: defaultValues.QR_lbl || "QR",
    SUB_TOTAL_lbl: defaultValues.SUB_TOTAL_lbl || "Subtotal",
    DISCOUNT_lbl: defaultValues.DISCOUNT_lbl || "Discount",
    SHIPPING_lbl: defaultValues.SHIPPING_lbl || "Shipping",
    TAX_RATE_lbl: defaultValues.TAX_RATE_lbl || "Tax Rate",
    TOTAL_lbl: defaultValues.TOTAL_lbl || "Total",
    AMOUNT_PAID_lbl: defaultValues.AMOUNT_PAID_lbl || "Amount paid",
    BALANCE_DUE_lbl: defaultValues.BALANCE_DUE_lbl || "Balance Due",
    SIGNATURE_lbl: defaultValues.SIGNATURE_lbl || "Signature",
  };

  // Shipping fee
  const [hasDiscount, setHasDiscount] = useState(false);
  const [hasShippingFee, setHasShippingFee] = useState(false);
  const [hasTax, setHasTax] = useState(false);

  const [hasLink, setHasLink] = useState(false);
  const [hasQR, setHasQR] = useState(false);

  const [savingData, setSavingData] = useState(false);
  const formikRef = createRef<
    FormikProps<
      Invoice & {
        items: InvoiceItem[];
      }
    >
  >();

  const [showTemplateSaveDialog, setShowTemplateSaveDialog] = useState(false);
  const [openClientModal, setOpenClientModal] = useState<boolean>(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  return (
    <>
      <IntlProvider locale="fr">
        <Container maxWidth="xl">
          <Formik
            innerRef={formikRef}
            onSubmit={(values) => {
              setSavingData(true);

              const {
                date_prepared,
                due_date,
                items,
                tax_rate,
                discount,
                shipping,
                amount_paid,
                ...rest
              } = values;

              saveInvoice({
                ...rest,
                id: Number(values.id),
                date_prepared: new Date(date_prepared),
                due_date: new Date(due_date),
                tax_rate: Number(tax_rate),
                discount: Number(discount),
                shipping: Number(shipping),
                amount_paid: Number(amount_paid),
                items: items.map((i) => {
                  return {
                    ...i,
                    qty: Number(i.qty),
                    price: Number(i.price),
                  };
                }),
              }).then((res) => {
                router.push("/u");
                console.log("Rescived, ", res);
              });

              //  try {
              //     await
              //  } catch(error) {
              //   console.log(error);

              //  }

              // setTimeout(() => {
              setSavingData(false);
              // }, 1000);

              return;

              // if (alertContext) {
              //   alertContext.showAlert({
              //     message: "Invoice has been saved!",
              //     title: "Invoice Saved",
              //     severity: "info",
              //   });
              // }
            }}
            initialValues={initialValues as Invoice & { items: InvoiceItem[] }}
          >
            {function (formik) {
              const {
                handleBlur,
                handleChange,
                setFieldValue,
                values,
                errors,
                touched,
              } = formik;

              console.log(values, "values");

              const subTotal = values.items
                .map((p) => p.qty * p.price)
                .reduce((p, c) => {
                  return p + c;
                }, 0);

              const taxAmount = subTotal * (values.tax_rate / 100);

              const discountAmount =
                (subTotal + taxAmount) * (values.discount / 100);
              const total =
                subTotal + taxAmount - discountAmount + values.shipping;
              const balanceDue = total - values.amount_paid;
              return (
                <Form>
                  <Toolbar color="">
                    <Link href="/u">
                      <IconButton>
                        <Home color="primary" />
                      </IconButton>
                    </Link>
                    <IconButton disabled={savingData} type="submit">
                      <Save color="info" />
                    </IconButton>
                  </Toolbar>
                  <Stack direction="row" spacing={2}>
                    <Paper sx={{ p: 2 }}>
                      {/* Invoice Header */}
                      <Stack direction="row" justifyContent="space-between">
                        {/* RIght Header*/}

                        <Stack spacing={2}>
                          {/* <ImageSelector
                          value={values.logo}
                          onChange={(value) => {
                            setFieldValue("logo", value);
                          }}
                          placeholder="Company Logo"
                          height={100}
                        /> */}

                          {/* From */}

                          <Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <AdvTextField
                                size="small"
                                inputProps={{
                                  style: {
                                    textAlign: "left",
                                  },
                                }}
                                name="FROM"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.FROM_lbl}
                              />

                              <Link href="/u/settings">
                                <Button>Edit Business Profile</Button>
                              </Link>
                            </Stack>

                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              p={1}
                            >
                              <Stack flexGrow={1}>
                                {settings.company_name && (
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                  >
                                    {settings.company_name}
                                  </Typography>
                                )}

                                {(settings.street_1 || settings.street_2) && (
                                  <Typography>
                                    {settings.street_1},{settings.street_2}
                                  </Typography>
                                )}

                                {(settings.city ||
                                  settings.state ||
                                  settings.postal) && (
                                  <Typography>
                                    {settings.city},{settings.state},
                                    {settings.postal}
                                  </Typography>
                                )}

                                {settings.country_code && (
                                  <Typography>
                                    {settings.country_code}
                                  </Typography>
                                )}
                              </Stack>
                            </Stack>
                          </Stack>

                          <Stack direction="row" spacing={2}>
                            <Stack>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <AdvTextField
                                  size="small"
                                  inputProps={{
                                    style: {
                                      textAlign: "left",
                                    },
                                  }}
                                  name="BILL_TO"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  defaultValue={values.BILL_TO_lbl}
                                />

                                {values.bill_to ? (
                                    <Button
                                    onClick={() => {
                                      setOpenClientModal(true);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      setOpenClientModal(true);
                                    }}
                                  >
                                    New
                                  </Button>
                                )}
                              </Stack>

                              {values.bill_to ? (
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="flex-start"
                                  sx={{
                                    border: "1px solid",
                                  }}
                                  p={1}
                                >
                                  <Stack flexGrow={1}>
                                    {(() => {
                                      const client = clients.find(
                                        (c: Client) =>
                                          c.id.toString() == values.bill_to
                                      );
                                      if (!client) {
                                        return "No result";

                                        // throw new Error();
                                      }
                                      return (
                                        <>
                                          {client.type == "ORGANIZATION" && (
                                            <Typography
                                              variant="subtitle1"
                                              fontWeight="bold"
                                            >
                                              {client.organization_name}
                                            </Typography>
                                          )}

                                          {client.type == "PERSON" && (
                                            <Typography
                                              variant="subtitle1"
                                              fontWeight="bold"
                                            >
                                              {client.first_name}
                                              {client.last_name}
                                            </Typography>
                                          )}

                                          <Typography>
                                            {client.city},{client.state},
                                            {client.postal}
                                          </Typography>
                                          <Typography>
                                            {client.country_code},
                                          </Typography>
                                        </>
                                      );
                                    })()}
                                  </Stack>
                                  <IconButton
                                    onClick={() => {
                                      setFieldValue("bill_to", null);
                                    }}
                                  >
                                    <Close />
                                  </IconButton>
                                </Stack>
                              ) : (
                                <Autocomplete
                                  options={clients.map((d: Client) =>
                                    d.id.toString()
                                  )}
                                  getOptionLabel={(option: string) => {
                                    const client = clients.find(
                                      (c: Client) => c.id.toString() == option
                                    );
                                    if (!client) {
                                      return "No result";
                                    }
                                    if (client.type == "ORGANIZATION") {
                                      return (
                                        client.organization_name || "No Name"
                                      );
                                    } else {
                                      return `${client.first_name} ${client.last_name}`;
                                    }
                                  }}
                                  size="small"
                                  onChange={(_e, value) => {
                                    setFieldValue("bill_to", value);
                                  }}
                                  value={values.bill_to}
                                  renderInput={(params) => (
                                    <TextField {...params} name={"bill_to"} />
                                  )}
                                />
                              )}
                            </Stack>

                            {true && (
                              <Stack>
                                <AdvTextField
                                  size="small"
                                  defaultValue={values.SHIPPED_TO_lbl}
                                  inputProps={{
                                    style: {
                                      textAlign: "left",
                                    },
                                  }}
                                  name="SHIPPED_TO"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <TextField
                                  name="shipped_to"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.shipped_to}
                                  size="small"
                                  error={Boolean(
                                    errors.shipped_to && touched.shipped_to
                                  )}
                                />
                              </Stack>
                            )}
                          </Stack>
                        </Stack>
                        {/* Left Header */}

                        <Stack spacing={3}>
                          {/* TItle and Number */}
                          <Stack alignItems="flex-end">
                            <AdvTextField
                              onChange={handleChange}
                              onBlur={handleBlur}
                              defaultValue={values.INVOICE_lbl}
                              name="INVOICE"
                              inputProps={{
                                style: {
                                  fontSize: "40px",
                                },
                              }}
                            />

                            <Stack direction="row" alignItems="center">
                              <TextField
                                name="id"
                                sx={{
                                  mawidth: "min-content",
                                  width: "10rem",
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.id}
                                size="small"
                                error={Boolean(errors.id && touched.id)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      #
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Stack>
                          </Stack>

                          {/* Fields */}
                          <Stack spacing={0.5}>
                            <Stack direction="row" alignItems="center">
                              <AdvTextField
                                fullWidth
                                defaultValue={values.DATE_PREPARED_lbl}
                                name="DATE_PREPARED"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <TextField
                                fullWidth
                                type="date"
                                name="date_prepared"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.date_prepared}
                                size="small"
                                error={Boolean(
                                  errors.date_prepared && touched.date_prepared
                                )}
                              />
                            </Stack>

                            {/* Fields */}
                            <Stack direction="row" alignItems="center">
                              <AdvTextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                defaultValue={values.PAYMENT_TERMS_lbl}
                                name="PAYMENT_TERMS"
                              />

                              <TextField
                                fullWidth
                                name="payment_terms"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.payment_terms}
                                size="small"
                                error={Boolean(
                                  errors.payment_terms && touched.payment_terms
                                )}
                                type="number"
                              />
                            </Stack>

                            {/* Fields */}
                            <Stack direction="row" alignItems="center">
                              <AdvTextField
                                fullWidth
                                defaultValue ={values.DUE_DATE_lbl}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="DUE_DATE"
                              />
                              <TextField
                                fullWidth
                                type="date"
                                name="due_date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.due_date}
                                size="small"
                                error={Boolean(
                                  errors.due_date && touched.due_date
                                )}
                              />
                            </Stack>

                            {/* Fields */}
                            <Stack direction="row" alignItems="center">
                              <AdvTextField
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={values.PO_lbl}
                                name="PO"
                              />
                              <TextField
                                fullWidth
                                name="po"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.po}
                                size="small"
                                error={Boolean(errors.po && touched.po)}
                              />
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>

                      {/* Invoice Body */}

                      <InvoiceTable formik={formik} />
                      {/* Invoice Footer */}

                      <Stack
                        mt={2}
                        direction="row"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <Stack flexGrow={1} spacing={2}>
                          {/* Note */}
                          <Stack>
                            <AdvTextField
                              inputProps={{ style: { textAlign: "left" } }}
                              onChange={handleChange}
                              onBlur={handleBlur}

                              defaultValue={values.NOTE_lbl}
                              name="NOTE"
                            />
                            <TextField
                              fullWidth
                              multiline
                              rows={5}
                              name="note"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.note}
                              size="small"
                              error={Boolean(errors.note && touched.note)}
                              placeholder="Any relevant information not already coverted"
                            />
                          </Stack>

                          {/* Link and QR Cide */}
                          <Stack flexGrow={1} spacing={1}>
                            {/* lINK */}

                            {hasLink && (
                              <Stack spacing={0.5}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <AdvTextField
                                    inputProps={{
                                      style: { textAlign: "left" },
                                    }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue={values.LINK_lbl}
                                    name="LINK"
                                  />

                                  <IconButton color="warning">
                                    <Delete
                                      onClick={() => {
                                        setHasLink(false);
                                        setFieldValue("link", "");
                                      }}
                                    />
                                  </IconButton>
                                </Stack>

                                <TextField
                                  fullWidth
                                  name="link"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.link}
                                  size="small"
                                  error={Boolean(errors.link && touched.link)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Language />
                                      </InputAdornment>
                                    ),
                                  }}
                                  placeholder="Custom link to this invoice"
                                />
                              </Stack>
                            )}

                            {/* QR */}

                            {hasQR && (
                              <Stack spacing={0.5}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <AdvTextField
                                    inputProps={{
                                      style: { textAlign: "left" },
                                    }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue={values.QR_lbl}
                                    name="QR"
                                  />

                                  <IconButton
                                    color="warning"
                                    onClick={() => {
                                      setHasQR(false);
                                      setFieldValue("qr", null);
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Stack>

                                {/* <ImageSelector
                                  value={values.qr}
                                  onChange={(value) => {
                                    setFieldValue("qr", value);
                                  }}
                                  placeholder="Add QR Code "
                                  height={100}
                                /> */}

                                <Typography> Image , QR logo </Typography>
                              </Stack>
                            )}

                            {/* QR and Link Controlls */}
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              {!hasLink && (
                                <Button
                                  startIcon={<Anchor />}
                                  onClick={() => {
                                    setFieldValue("link", "");
                                    setHasLink(true);
                                  }}
                                >
                                  Add Link
                                </Button>
                              )}

                              {!hasQR && (
                                <Button
                                  startIcon={<QrCode />}
                                  onClick={() => {
                                    setFieldValue("qr", null);
                                    setHasQR(true);
                                  }}
                                >
                                  Add QR Code
                                </Button>
                              )}
                            </Stack>
                          </Stack>

                          {/* Terms */}

                          <Stack>
                            <AdvTextField
                              inputProps={{ style: { textAlign: "left" } }}
                              onChange={handleChange}
                              onBlur={handleBlur}

                              defaultValue={values.TERMS_lbl}
                              name="TERMS"
                            />
                            <TextField
                              fullWidth
                              multiline
                              rows={5}
                              name="terms"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.terms}
                              size="small"
                              error={Boolean(errors.terms && touched.terms)}
                              placeholder="Terms and conditions- late fee, paymet methods"
                            />
                          </Stack>
                        </Stack>

                        <Stack spacing={0.5} alignItems="flex-end">
                          <table>
                            <tbody>
                              {/* Sub TOtal */}
                              <tr>
                                <td>
                                  <AdvTextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <Typography
                                    textAlign="right"
                                    fontWeight="bold"
                                  >
                                    <FormattedNumber
                                      value={subTotal}
                                      style="currency"
                                      currency={values.currency_code}
                                    />
                                  </Typography>
                                </td>
                              </tr>

                              {/* Discount */}

                              {hasDiscount && (
                                <tr>
                                  <td>
                                    <AdvTextField

                                      defaultValue={values.DISCOUNT_lbl}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="DISCOUNT"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      name="discount"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.discount}
                                      size="small"
                                      error={Boolean(
                                        errors.discount && touched.discount
                                      )}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            %
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          textAlign: "right",
                                        },
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <IconButton
                                      onClick={() => {
                                        setFieldValue("discount", 0);
                                        setHasDiscount(false);
                                      }}
                                      size="small"
                                    >
                                      <Close />
                                    </IconButton>
                                  </td>
                                </tr>
                              )}

                              {/* Shipping */}

                              {hasShippingFee && (
                                <tr>
                                  <td>
                                    <AdvTextField

                                      defaultValue={values.SHIPPING_lbl}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="SHIPPING"
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      size="small"
                                      name="shipping"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.shipping}
                                      type="number"
                                      error={Boolean(
                                        errors.shipping && touched.shipping
                                      )}
                                      InputProps={{
                                        inputComponent:
                                          NumericFormatCustom as any,

                                        startAdornment: (
                                          <InputAdornment position="start">
                                            {currencies.find((c) => {
                                              return (
                                                c.code == values.currency_code
                                              );
                                            })?.symboll || "NC"}
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          textAlign: "right",
                                        },
                                      }}
                                    />
                                  </td>

                                  <td>
                                    <IconButton
                                      onClick={() => {
                                        setFieldValue("shipping", 0);
                                        setHasShippingFee(false);
                                      }}
                                      size="small"
                                    >
                                      <Close />
                                    </IconButton>
                                  </td>
                                </tr>
                              )}

                              {/* Tax Rate */}
                              {hasTax && (
                                <tr>
                                  <td>
                                    <AdvTextField

                                      defaultValue={values.TAX_RATE_lbl}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </td>
                                  <td>
                                    <TextField
                                      size="small"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.tax_rate}
                                      name="tax_rate"
                                      error={Boolean(
                                        errors.tax_rate && touched.tax_rate
                                      )}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            %
                                          </InputAdornment>
                                        ),
                                      }}
                                      inputProps={{
                                        style: {
                                          textAlign: "right",
                                        },
                                      }}
                                    />
                                  </td>

                                  <td>
                                    <IconButton
                                      onClick={() => {
                                        setFieldValue("tax_rate", 0);
                                        setHasTax(false);
                                      }}
                                      size="small"
                                    >
                                      <Close />
                                    </IconButton>
                                  </td>
                                </tr>
                              )}

                              {/* Optional Field Controlls */}

                              <tr>
                                <td colSpan={2} align="right">
                                  {/* Discount */}
                                  {!hasDiscount && (
                                    <Button
                                      size="small"
                                      startIcon={<Add />}
                                      onClick={() => {
                                        setFieldValue("discount", 0);
                                        setHasDiscount(true);
                                      }}
                                    >
                                      Discount
                                    </Button>
                                  )}
                                  {/* Shipping */}
                                  {!hasShippingFee && (
                                    <Button
                                      size="small"
                                      startIcon={<Add />}
                                      onClick={() => {
                                        setFieldValue("shipping", 0);
                                        setHasShippingFee(true);
                                      }}
                                    >
                                      Shipping
                                    </Button>
                                  )}

                                  {/* Tax */}
                                  {!hasTax && (
                                    <Button
                                      size="small"
                                      startIcon={<Add />}
                                      onClick={() => {
                                        setFieldValue("tax_rate", 0);
                                        setHasTax(true);
                                      }}
                                    >
                                      Tax
                                    </Button>
                                  )}
                                </td>
                              </tr>

                              {/* Total */}
                              <tr>
                                <td>
                                  <AdvTextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{
                                      fontWeight: "normal",
                                    }}
                                  />
                                </td>
                                <td>
                                  <Typography textAlign="right">
                                    <FormattedNumber
                                      value={total}
                                      style="currency"
                                      currency={values.currency_code}
                                    />
                                  </Typography>
                                </td>
                              </tr>

                              {/* Amount Paid */}
                              <tr>
                                <td>
                                  <AdvTextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{
                                      fontWeight: "normal",
                                    }}

                                    defaultValue={values.AMOUNT_PAID_lbl}
                                    name="AMOUNT_PAID"
                                  />
                                </td>
                                <td>
                                  <TextField
                                    size="small"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.amount_paid}
                                    name="amount_paid"
                                    error={Boolean(
                                      errors.amount_paid && touched.amount_paid
                                    )}
                                    type="number"
                                    InputProps={{
                                      inputComponent:
                                        NumericFormatCustom as any,

                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {currencies.find((c) => {
                                            return (
                                              c.code == values.currency_code
                                            );
                                          })?.symboll || "NC"}
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </td>
                              </tr>

                              {/* Balce De */}
                              <tr>
                                <td>
                                  <AdvTextField

                                    defaultValue={values.BALANCE_DUE_lbl}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="BALANCE_DUE"
                                  />
                                </td>
                                <td>
                                  <Typography
                                    textAlign="right"
                                    fontWeight="bold"
                                  >
                                    <FormattedNumber
                                      value={balanceDue}
                                      style="currency"
                                      currency={values.currency_code}
                                    />
                                  </Typography>
                                </td>
                                <td
                                  style={{
                                    visibility: "hidden",
                                  }}
                                >
                                  <IconButton size="small">
                                    <Close />
                                  </IconButton>
                                </td>
                              </tr>

                              {/* Signature */}
                              <tr>
                                <td colSpan={3}>
                                  <Stack
                                    alignItems={"flex-end"}
                                    sx={
                                      {
                                        // background:"red"
                                      }
                                    }
                                  >
                                    <AdvTextField

                                      defaultValue={values.SIGNATURE_lbl}
                                      name="SIGNATURE"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      inputProps={{
                                        style: {
                                          fontWeight: "bold",
                                          textAlign: "center",
                                        },
                                      }}
                                    />

                                    {/* <ImageSelector
                                    onChange={(value) => {
                                      setFieldValue("signature", value);
                                    }}
                                    // value={values.}
                                    placeholder="Select Signature"
                                    height={100}
                                  /> */}
                                  </Stack>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Stack>
                      </Stack>
                    </Paper>

                    <Paper>
                      <Stack p={2} spacing={2}>
                        <GenerateButton
                          onPDF={() => {
                            setShowPrintPreview(true);
                          }}
                        />

                        <Divider />

                        {/* Curremcy */}
                        <FormControl>
                          <Autocomplete
                            disablePortal
                            size="small"
                            options={currencies.map((c) => c.code)}
                            getOptionLabel={(option) => {
                              const i = currencies.find(
                                (c) => c.code == option
                              );
                              if (!i) {
                                return "Not FOumd";
                                throw Error();
                              }

                              return i.name;
                            }}
                            sx={{ width: 300 }}
                            value={values.currency_code}
                            onChange={(_e, value) => {
                              setFieldValue("currency_code", value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                name="currency_code"
                                {...params}
                                label="Currency"
                              />
                            )}
                          />
                        </FormControl>

                        {/* Save as default */}
                        <FormControl>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              setShowTemplateSaveDialog(true);
                            }}
                          >
                            Save Templete
                          </Button>
                        </FormControl>

                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Save
                        </Button>
                      </Stack>
                    </Paper>
                  </Stack>

                  <SaveTemplateDialog
                    onClose={() => {
                      setShowTemplateSaveDialog(false);
                    }}
                    open={showTemplateSaveDialog}
                    onYes={() => {
                      console.log("saving default");
                    }}
                  />

                  {/* Invoice Print Modal */}
                  {/* {showPrintPreview && (
                  <PrintPreviewModal
                    data={values}
                    settings={settings}
                    clients={clients}
                    onClose={() => {
                      setShowPrintPreview(false);
                    }}
                  />
                )} */}
                </Form>
              );
            }}
          </Formik>

          {openClientModal && (
            <ClientModal
              onClose={() => {
                setOpenClientModal(false);
              }}
            />
          )}
        </Container>
      </IntlProvider>
    </>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SaveTemplateDialog(props: {
  onClose: () => void;
  open: boolean;
  onYes: () => void;
}) {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Save as Default Template?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Save the current values as the default values? new Invoices will
          inherit the saved template values.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={props.onClose}>
          No
        </Button>
        <Button
          startIcon={<Save />}
          size="small"
          color="primary"
          variant="contained"
          onClick={props.onYes}
        >
          Save Template
        </Button>
      </DialogActions>
    </Dialog>
  );
}
