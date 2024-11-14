import envs from "@/config/envs";
import { homePageSchema } from "@/lib/zod-schemas/home.schema";
import qs from "qs";

export const getHomeDataAction = async () => {
  try {
    const queryString = qs.stringify({
      populate: {
        blocks: {
          on: {
            "layout.hero-section": {
              populate: {
                fields: ["title", "subtitle"],
                image: {
                  fields: ["url", "alternativeText"],
                },
                ctaButton: {
                  populate: true,
                },
              },
            },
            "layout.mission-section": {
              populate: {
                fields: ["title"],
                missions: {
                  populate: {
                    fields: ["title", "description", "icon"],
                    image: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
              },
            },
            "layout.proyect-section": {
              populate: {
                fields: ["title"],
                proyects: {
                  populate: {
                    fields: ["title", "subtitle", "description"],
                    image: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
              },
            },
            "layout.get-involved-section": {
              populate: {
                fields: ["title", "description"],
                volunteerButton: {
                  populate: true,
                },
                donationButton: {
                  populate: true,
                },
              },
            },
          },
        },
      },
      fields: ["id", "documentId"],
    });

    const url = new URL("/api/home-page", envs.NEXT_PUBLIC_STRAPI_URL);

    url.search = queryString;

    const response = await fetch(url.toString(), {
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

    const validateSchema = await homePageSchema.safeParseAsync(data.data);

    if (!validateSchema.success) {
      return {
        ok: false,
        message: validateSchema.error.errors,
      };
    }

    return {
      ok: true,
      data: validateSchema.data.blocks,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};
