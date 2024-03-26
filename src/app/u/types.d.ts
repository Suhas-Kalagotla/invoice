type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | "JPY";

type Currency = {
  code: CurrencyCode;
  name: string;
  symboll: string;
};

type TemplateLabels = {
  INVOICE_lbl: string;

  //
  FROM_lbl: string;
  BILL_TO_lbl: string;
  SHIPPED_TO_lbl: string;

  //

  DATE_PREPARED_lbl: string;
  PAYMENT_TERMS_lbl: string;
  DUE_DATE_lbl: string;
  PO_lbl: string;

  // Table

  TABLE_ITEM_lbl: string;
  TABLE_QTY_lbl: string;
  TABLE_RATE_lbl: string;
  TABLE_AMOUNT_lbl: string;

  // Footer

  NOTE_lbl: string;
  LINK_lbl: string;
  QR_lbl: string;
  TERMS_lbl: string;

  // Total

  SUB_TOTAL_lbl: string;
  DISCOUNT_lbl: string;
  SHIPPING_lbl: string;
  TAX_RATE_lbl: string;
  TOTAL_lbl: string;
  AMOUNT_PAID_lbl: string;
  BALANCE_DUE_lbl: string;
  SIGNATURE_lbl: string;
};

type Template = TemplateLabels & {
  note: string;
  terms: string;
  currency_code: CurrencyCode;

  tax_rate: number;
  logo: Blob | UploadedFile | null;
  signature: Blob | UploadedFile | null;
};
type UploadedFile = {
  id: number;
  url: string;
  path: string;
};

type InvoiceValue = {
  /**
   * VALUES
   */

  //
  id: number;

  bill_to: string;
  shipped_to: string;
  date_prepared: string;
  payment_terms: string;
  due_date: string;
  po: string;

  // Table

  items: Product[];

  // Total

  discount: number;
  shipping: number;
  amount_paid: number;
  link: string;
};

type Invoice = Template & InvoiceValue;

type Product = {
  description: string;
  qty: number;
  price: number;
};

type Country = {
  code: string;
  name: string;
  flag: string;
};

type Client = {
  id: string;
  type: "PERSON" | "ORGANIZATION";
  organization_name: string;
  contact_first_name: string;
  contact_last_name: string;

  first_name: string;
  last_name: string;

  currency_code: string;
  language_code: string;
  email: string;
  phone: string;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  postal: string;
  country_code: CountryCode;
};
