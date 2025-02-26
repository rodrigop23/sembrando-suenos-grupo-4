"use server";

import { teamMemberPageSchema } from "@/lib/zod-schemas/team.schema";
import qs from "qs";

export const getTeamDataAction = async () => {
  try {
    const queryString = qs.stringify({
      populate: {
        teamMember: {
          populate: {
            image: {
              fields: ["url"],
            },
            socialLink: {
              populate: true,
            },
            fields: ["name", "job", "description"],
          },
        },
      },
      fields: ["title", "description"],
    });

    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team?${queryString}`;

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

    const validateSchema = await teamMemberPageSchema.safeParseAsync(data.data);

    if (!validateSchema.success) {
      return {
        ok: false,
        message: validateSchema.error.errors,
      };
    }

    return {
      ok: true,
      data: validateSchema.data,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};
