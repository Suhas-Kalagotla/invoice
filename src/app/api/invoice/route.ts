// import { prisma } from "@/lib/db";

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  const body = await request.json();
  const { invoiceData, items } = body;
  //   await prisma.invoice.create({
  //     data: {
  //       ...invoiceData,
  //       items: {
  //         createMany: {
  //           data: items,
  //         },
  //       },
  //     },
  //   });
  return new Response("Invoice created", { status: 200 });
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
