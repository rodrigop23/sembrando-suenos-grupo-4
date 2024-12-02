"use server";

import envs from "@/config/envs";
import { LoginUserType, RegisterUserType } from "@/lib/zod-schemas/user-schema";
import { deleteTokenCookie, getToken, setTokenCookie } from "@/utils/session";
import { IGenericResponse } from "@/interface/generic.interface";
import qs from "qs";
import { cache } from "react";
import { redirect } from "next/navigation";
import { IUser } from "@/interface/user.interface";

export const registerUserAction = async (
  userData: RegisterUserType
): Promise<IGenericResponse> => {
  try {
    const url = new URL(
      "/api/auth/local/register",
      process.env.NEXT_PUBLIC_STRAPI_URL
    );

    const newData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newData }),
      cache: "no-cache",
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Error en el servidor. Intente de nuevo.");
    }

    if (data.error) {
      return {
        ok: false,
        message: data?.error?.message,
      };
    }

    setTokenCookie(data.jwt);

    return {
      ok: true,
      message: "Usuario creado con éxito",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};

export const loginUserAction = async (
  userData: LoginUserType
): Promise<IGenericResponse> => {
  try {
    const url = new URL("/api/auth/local", process.env.NEXT_PUBLIC_STRAPI_URL);

    const newData = {
      identifier: userData.email,
      password: userData.password,
    };

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newData }),
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Error en el servidor. Intente de nuevo.");
    }

    if (data.error) {
      return {
        ok: false,
        message: data?.error?.message,
      };
    }

    setTokenCookie(data.jwt);

    return {
      ok: true,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};

export const getCurrentUser = cache(async (): Promise<IUser | null> => {
  try {
    const url = new URL("/api/users/me", process.env.NEXT_PUBLIC_STRAPI_URL);

    url.search = qs.stringify({
      fields: ["email", "username"],
    });

    const token = getToken();

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data) {
      return null;
    }

    if (data.error) {
      return null;
    }

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const logoutUserAction = async () => {
  deleteTokenCookie();

  redirect("/sign-in");
};
