import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession();
  console.log(session);
  if (session) {
    redirect(`/u`); // Navigate to the new post page
  } else {
    redirect(`/api/auth/signin`); // Navigate to the new post page
  }
}
