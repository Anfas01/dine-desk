import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";

export async function requireAdmin() {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}