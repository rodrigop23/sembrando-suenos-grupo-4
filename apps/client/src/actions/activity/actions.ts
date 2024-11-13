import envs from "@/config/envs";
import {
  activitiesSchema,
  activityDetailSchema,
} from "@/lib/zod-schemas/activity.schema";
import qs from "qs";

export const getActivitiesDataAction = async (
  page: number = 1,
  search_string: string = ""
) => {
  try {
    const queryString = qs.stringify({
      sort: ["date:asc"],
      filters: {
        title: {
          $containsi: search_string,
        },
      },
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
      },
      fields: [
        "title",
        "descripcion",
        "date",
        "time",
        "location",
        "details",
        "numberOfParticipants",
        "organizer",
      ],
      pagination: {
        pageSize: 6,
        page,
      },
      status: "published",
    });

    const url = new URL("/api/activities", envs.NEXT_PUBLIC_STRAPI_URL);

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

    const validateSchema = await activitiesSchema.safeParseAsync(data);

    if (!validateSchema.success) {
      return {
        ok: false,
        message: validateSchema.error.errors,
      };
    }

    return {
      ok: true,
      data: validateSchema.data.data,
      meta: validateSchema.data.meta,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};

export const getActivityDetailsAction = async (id: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        requirements: {
          populate: true,
        },
        schedule: {
          populate: true,
        },
      },
      fields: [
        "title",
        "descripcion",
        "date",
        "time",
        "location",
        "details",
        "numberOfParticipants",
        "organizer",
      ],
    });

    const url = new URL(`/api/activities/${id}`, envs.NEXT_PUBLIC_STRAPI_URL);

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

    const validateSchema = await activityDetailSchema.safeParseAsync(data.data);

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
