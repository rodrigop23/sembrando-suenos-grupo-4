import { z } from "zod";
import { strapiImageSchema, strapiMetaSchema } from "./strapi.schema";
import { requirementSchema, scheduleSchema } from "./activity.schema";

export const eventSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
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

export const eventDetailSchema = eventSchema.extend({
  requirements: z.array(requirementSchema),
  schedule: z.array(scheduleSchema),
});

export const eventsSchema = z.object({
  data: z.array(eventSchema),
  meta: strapiMetaSchema,
});

export type ActivityType = z.infer<typeof eventSchema>;
export type ActivityDetailType = z.infer<typeof eventDetailSchema>;
