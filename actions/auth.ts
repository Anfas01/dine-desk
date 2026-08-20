"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createToken } from "@/lib/auth/jwt";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

export type AuthState = {
  success: boolean;
  message: string;
};

const AUTH_COOKIE_NAME = "token";
const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SEVEN_DAYS_IN_SECONDS,
    path: "/",
  });
}

export async function loginAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const isPasswordValid = await verifyPassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const token = await createToken(user.id);

    await setAuthCookie(token);
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/");
}

export async function registerAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData
    .get("confirmPassword")
    ?.toString();

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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await createToken(user.id);

    await setAuthCookie(token);
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE_NAME);

  redirect("/");
}