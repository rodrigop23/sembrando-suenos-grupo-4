import { z } from "zod";
import { strapiImageSchema, strapiMetaSchema } from "./strapi.schema";

export const activitySchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  descripcion: z.string(),
  date: z.string().transform((val) => {
    const [year, month, day] = val.split("-");
    return `${day}/${month}/${year}`;
  }),
  time: z.string().transform((val) => val.slice(0, 5)),
  location: z.string(),
  details: z.string(),
  numberOfParticipants: z.number(),
  organizer: z.string(),
  image: strapiImageSchema,
});

export const activitiesSchema = z.object({
  data: z.array(activitySchema),
  meta: strapiMetaSchema,
});

export type ActivityType = z.infer<typeof activitySchema>;
