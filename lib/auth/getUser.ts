import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/jwt"; // adjust to wherever createToken/verifyToken live
import { prisma } from "@/lib/prisma"; // adjust to wherever your Prisma client is exported from


/**
 * Reads the auth cookie and returns the decoded JWT payload, or null
 * if there's no cookie or it's invalid/expired. Cheap — no DB call.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return verifyToken(token); // { userId, iat, exp } | null
}

/**
 * Resolves the full user record for the current request.
 * Returns null if not logged in or the user no longer exists.
 */
export async function getUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true },
  });

  return user; // { id, name, email } | null
}