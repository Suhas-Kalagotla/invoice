"use server";

import { prisma } from "@/lib/db";
import { Invoice, User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function register(values: User) {
  const { name, email, password } = values;

  const isExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isExist) {
    return {
      message: "Username already exist",
      status: 400,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  await prisma.defaultValues.create({
    data: {
      userId: user.id,
      currency_code: "INR",
      tax_rate: 15,
      terms:
        "Please note that payment is due within 30 days of the invoice date. You can pay by check, credit card, or bank transfer",
      note: "Thank you for your continued business. We value your trust and feedback.",

      AMOUNT_PAID_lbl: "Amount Paid",
      BALANCE_DUE_lbl: "Balance Due",
      BILL_TO_lbl: "Bill to",
      DATE_PREPARED_lbl: "Date Prepared",
      DISCOUNT_lbl: "Discount",
      DUE_DATE_lbl: "Due Date",
      FROM_lbl: "From",

      INVOICE_lbl: "Invoice",
      LINK_lbl: "Link",
      NOTE_lbl: "Note",
      PAYMENT_TERMS_lbl: "Payment Terms",
      PO_lbl: "PO",
      QR_lbl: "QR code",
      SHIPPED_TO_lbl: "",
      SHIPPING_lbl: "Shipping Fee",
      SIGNATURE_lbl: "Signature",
      SUB_TOTAL_lbl: "Sub Total",
      TABLE_AMOUNT_lbl: "Amount",
      TABLE_ITEM_lbl: "Item",
      TABLE_QTY_lbl: "QTY",
      TABLE_RATE_lbl: "Rate",
      TAX_RATE_lbl: "Tax",
      TERMS_lbl: "Terms",
      TOTAL_lbl: "Total",
    },
  });

  await prisma.setting.create({
    data: {
      userId: user.id,
      city: "",
      company_name: user.name,
      country_code: "IN",
      email: user.email,
      postal: "0000",
      state: "",
      street_1: "Street 1",
      street_2: "Street 2",
      website: "",
    },
  });

  return {
    message: "User created successfully",
    status: 200,
  };
}
