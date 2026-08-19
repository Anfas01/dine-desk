import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/auth/getUser";

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