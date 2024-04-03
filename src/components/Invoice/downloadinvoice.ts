import { Invoice, InvoiceItem, Setting, User } from "@prisma/client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadInvoice = (
  invoice: Invoice & {
    items: InvoiceItem[];
  },
  user: User & {
    Setting: Setting[];
  }
) => {
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: "Invoice",
          styles: {
            halign: "left",
            fontSize: 20,
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      //   fillColor: "#3366ff",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Reference: " + invoice.id + "\nDate: 2022-01-27",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  doc.setFontSize(12);
  doc.setFont("Poppins", "normal", 700);
  doc.setTextColor("#343a40");
  doc.text("Billed to:", 15, 52);
  doc.text("From:", 182, 52);

  autoTable(doc, {
    body: [
      [
        {
          content:
            // "Billed to:" +
            invoice.bill_to +
            "\nBilling Address line 1" +
            "\nBilling Address line 2" +
            "\nZip code - City" +
            "\nCountry",
          styles: {
            halign: "left",
          },
          title: "Billed to",
        },
        {
          content: "" + "" + "" + "",
          styles: {
            halign: "left",
          },
        },
        {
          content:
            user.Setting[0].company_name +
            "\n" +
            user.Setting[0].street_1 +
            "\n" +
            user.Setting[0].street_2 +
            "\n" +
            user.Setting[0].postal +
            " - " +
            user.Setting[0].city +
            "\n" +
            user.Setting[0].country_code,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Amount due:",
          styles: {
            halign: "right",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: invoice.currency_code + " " + invoice.amount_paid,
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#3366ff",
          },
        },
      ],
      [
        {
          content: "Due date:" + invoice.due_date,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Products",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    head: [["Items", "Quantity", "Price", "Amount"]],
    body: invoice.items.map((item) => [
      item.description,
      item.qty,
      item.price,
      item.price * item.qty,
      // invoice.tax_rate,
      // item.price * item.qty + invoice.tax_rate,
    ]),
    // body: [
    //   ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
    //   ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
    //   ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
    //   ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
    // ],
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Subtotal:",
          styles: {
            halign: "right",
          },
        },
        {
          content: invoice.currency_code + " " + invoice.amount_paid,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total tax:",
          styles: {
            halign: "right",
          },
        },
        {
          content: "$400",
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total amount:",
          styles: {
            halign: "right",
          },
        },
        {
          content: "$4000",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  return doc.save("invoice");
};
