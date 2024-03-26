import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
export function convertPathToURL(filePath: string): string {
  const invoice_file_path = process.env.invoice_file_path;
  const { baseUrl } = publicRuntimeConfig;

  return `${baseUrl}${invoice_file_path}${filePath}`;
}
