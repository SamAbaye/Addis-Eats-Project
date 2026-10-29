import AdminDashBoard from "./page";
import {getSession} from "@/app/lib/session";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Staff dashboard",
  description: "View Addis Eats order and revenue summaries for restaurant operations.",
};

export default async function DashboardLayout({ children }) {
  const user = await getSession();

  if (!user || user.role !== "staff") redirect("/auth/signin?next=/dashboard");


  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl text-center mb-15">Admin Dashboard</h1>
      {children ?? <AdminDashBoard />}
    </div>
  );
}
