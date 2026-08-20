import Navbar from "@/components/layout/navbar";
import { getUser } from "@/lib/auth/get-user";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email } : null} />
      {children}
    </>
  );
}