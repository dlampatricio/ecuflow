import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in?redirect=/admin");
  }

  const user = await currentUser();
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  
  const isAdmin = adminEmails.includes(userEmail || "");
  
  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}