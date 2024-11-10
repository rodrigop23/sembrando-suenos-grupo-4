"use server";

import envs from "@/config/envs";
import { RegisterUserType } from "@/lib/zod-schemas/user-schema";
import { setTokenCookie } from "@/utils/session";
import { GenericResponse } from "@/interface/generic-interface";

export const registerUserAction = async (
  userData: RegisterUserType
): Promise<GenericResponse> => {
  try {
    const url = new URL(
      "/api/auth/local/register",
      envs.NEXT_PUBLIC_STRAPI_URL
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
