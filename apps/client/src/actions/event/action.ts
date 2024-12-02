import {
  eventDetailSchema,
  eventsSchema,
} from "@/lib/zod-schemas/event.schema";
import qs from "qs";
import { getCurrentUser } from "../user/action";

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

    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events?${queryString}`;

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
        users: {
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

    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events/${id}?${queryString}`;

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

export const registerEventAction = async (id: string, token: string) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events/${id}`;

    const user = await getCurrentUser();

    const dataToSend = {
      data: {
        users: {
          connect: [user?.documentId],
        },
      },
    };

    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...dataToSend }),
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Error en el servidor. Intente de nuevo.");
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};

export const unregisterEventAction = async (id: string, token: string) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events/${id}`;

    const user = await getCurrentUser();

    const dataToSend = {
      data: {
        users: {
          disconnect: [user?.documentId],
        },
      },
    };

    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...dataToSend }),
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Error en el servidor. Intente de nuevo.");
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};
