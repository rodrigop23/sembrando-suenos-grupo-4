import envs from "@/config/envs";
import { blogDetailSchema, blogsSchema } from "@/lib/zod-schemas/blog.schema";
import qs from "qs";

export const getBlogsDataAction = async (
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
          fields: ["url"],
        },
      },
      fields: [
        "title",
        "description",
        "category",
        "readTime",
        "author",
        "aboutAuthor",
        "content",
        "date",
      ],
      pagination: {
        pageSize: 4,
        page,
      },
      status: "published",
    });

    const url = new URL("/api/blogs", envs.NEXT_PUBLIC_STRAPI_URL);

    url.search = queryString;

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    if (!data) {
      throw new Error("Error en el servidor. Intente de nuevo.");
    }

    if (data.error) {
      return {
        ok: false,
        message: data?.error?.message,
      };
    }

    const validateSchema = await blogsSchema.safeParseAsync(data);

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

export const getBlogDetailsAction = async (id: string) => {
  try {
    const queryString = qs.stringify({
      populate: {
        image: {
          fields: ["url"],
        },
      },
      fields: [
        "title",
        "description",
        "category",
        "readTime",
        "author",
        "aboutAuthor",
        "content",
        "date",
      ],
    });

    const url = new URL(`/api/blogs/${id}`, envs.NEXT_PUBLIC_STRAPI_URL);

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

    const validateSchema = await blogDetailSchema.safeParseAsync(data.data);

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
