import envs from "@/config/envs";
import {
  eventDetailSchema,
  eventsSchema,
} from "@/lib/zod-schemas/event.schema";
import qs from "qs";

export const getEventsDataAction = async (
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
        "description",
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

    const url = new URL("/api/events", envs.NEXT_PUBLIC_STRAPI_URL);

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

    const validateSchema = await eventsSchema.safeParseAsync(data);

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

export const getEventDetailsAction = async (id: string) => {
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
        "description",
        "date",
        "time",
        "location",
        "details",
        "numberOfParticipants",
        "organizer",
      ],
    });

    const url = new URL(`/api/events/${id}`, envs.NEXT_PUBLIC_STRAPI_URL);

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

    const validateSchema = await eventDetailSchema.safeParseAsync(data.data);

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
