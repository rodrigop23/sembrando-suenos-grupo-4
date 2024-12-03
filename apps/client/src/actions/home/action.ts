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
                  fields: ["url"],
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
                      fields: ["url"],
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
                      fields: ["url"],
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

    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?${queryString}`;

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
