import Navbar from "@/components/Navbar";
// import { getSession } from "@/lib/auth"; // wire up your real session lookup

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Replace with your real auth check, e.g.:
  // const session = await getSession();
  // const user = session ? { name: session.user.name, email: session.user.email } : null;
  const user = null;

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}