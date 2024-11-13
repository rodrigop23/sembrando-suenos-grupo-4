import envs from "@/config/envs";
import qs from "qs";

export const getHomeData = async () => {
  try {
    const queryString = qs.stringify({
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
      },
      fields: [
        "title",
        "subtitle",
        "description",
        "aboutUsTitle",
        "aboutUsDescription",
        "misionTitle",
        "misionDescription",
        "visionTitle",
        "visionDescription",
      ],
    });

    const url = new URL("/api/global", envs.NEXT_PUBLIC_STRAPI_URL);

    url.search = queryString;

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataTwo = await response.json();

    if (!dataTwo) {
      throw new Error("Error en el servidor. Intente de nuevo.");
    }

    if (dataTwo.error) {
      throw new Error(dataTwo?.error?.message);
    }
    const data = dataTwo.data;

    console.log(data);

    const newData = {
      id: data.id,
      documentId: data.documentId,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      aboutUsTitle: data.aboutUsTitle,
      aboutUsDescription: data.aboutUsDescription,
      misionTitle: data.misionTitle,
      misionDescription: data.misionDescription,
      visionTitle: data.visionTitle,
      visionDescription: data.visionDescription,
      image: {
        url: envs.NEXT_PUBLIC_STRAPI_URL + data.image.url,
        alternativeText: data.image.alternativeText,
      },
    };

    return newData;
  } catch (error) {
    console.log(error);

    throw new Error("Algo salió mal. Intente de nuevo.");
  }
};
