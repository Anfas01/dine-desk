import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";

/**
 * Reads the auth cookie and returns the decoded JWT payload,
 * or null if there's no cookie or the token is invalid/expired.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return verifyToken(token);
}

/**
 * Resolves the full user record for the current request.
 * Returns null if the user is not logged in or no longer exists.
 */
export async function getUser() {
  const session = await getSession();

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
}