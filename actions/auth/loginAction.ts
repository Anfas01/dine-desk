"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  error?: string;
};

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  // Validation
  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "Invalid email or password.",
    };
  }

  // Verify password
  const isPasswordValid = await verifyPassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return {
      error: "Invalid email or password.",
    };
  }

  // Create JWT
  const token = await createToken(user.id);

  // Store token in HTTP-only cookie
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/");
}