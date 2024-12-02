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

export const requirementSchema = z.object({
  id: z.number(),
  description: z.string(),
});

export const scheduleSchema = z.object({
  id: z.number(),
  time: z.string().transform((val) => val.slice(0, 5)),
  description: z.string(),
});

export const activityDetailSchema = activitySchema.extend({
  requirements: z.array(requirementSchema),
  schedule: z.array(scheduleSchema),
  users: z.array(z.any()),
});

export const activitiesSchema = z.object({
  data: z.array(activitySchema),
  meta: strapiMetaSchema,
});

export type ActivityType = z.infer<typeof activitySchema>;
export type ActivityDetailType = z.infer<typeof activityDetailSchema>;
