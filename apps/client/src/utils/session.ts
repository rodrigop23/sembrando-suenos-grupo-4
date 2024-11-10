import { cookies } from "next/headers";

export function setTokenCookie(token: string): void {
  cookies().set("jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export function deleteTokenCookie(): void {
  cookies().set("jwt", "", {
    maxAge: 0,
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export function getToken(): string | undefined {
  return cookies().get("jwt")?.value;
}
