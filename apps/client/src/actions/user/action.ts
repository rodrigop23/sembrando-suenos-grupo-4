"use server";

import {
  LoginUserType,
  RegisterUserType,
  UserType,
} from "@/lib/zod-schemas/user-schema";
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
    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`;

    const newData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };

    const response = await fetch(URL, {
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
    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`;

    const newData = {
      identifier: userData.email,
      password: userData.password,
    };

    const response = await fetch(URL, {
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
    const queryString = qs.stringify({
      populate: {
        role: {
          fields: ["name"],
        },
        activities: {
          fields: ["documentId", "title"],
        },
      },
      fields: ["username", "email", "bio", "name", "lastName"],
    });

    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?${queryString}`;

    const token = getToken();

    const response = await fetch(URL, {
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

export const updateUserAction = async (
  userData: UserType,
  id: string
): Promise<IGenericResponse> => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${id}`;

    const token = getToken();

    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...userData }),
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

    return {
      ok: true,
      message: "Perfil actualizado",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};
