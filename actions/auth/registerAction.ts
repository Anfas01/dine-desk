"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "../../lib/auth/password";
import { createToken } from "../../lib/auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type RegisterState = {
  success: boolean;
  message: string;
};

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create JWT
    const token = await createToken(user.id);

    // Store token in HTTP-only cookie
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/");
}