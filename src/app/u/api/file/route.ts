import { readFile } from "fs/promises";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const name: string = request.nextUrl.searchParams.get("name") as string;
  const path: string = process.env.invoice_file_path + name;

  const buffer = await readFile(path);

  // Verify signature

  const headers = new Headers();
  // headers.append("Content-Disposition", `attachment; filename="${name}"`);
  headers.append("Content-Type", "image/jpg");

  return new Response(buffer, {
    headers,
  });
}
