import { z } from "zod";
import { strapiImageSchema, strapiMetaSchema } from "./strapi.schema";

export const blogSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  readTime: z.string(),
  author: z.string(),
  aboutAuthor: z.string(),
  date: z.string().transform((val) => {
    const [year, month, day] = val.split("-");
    return `${day}/${month}/${year}`;
  }),
  image: strapiImageSchema,
});

export const blogDetailSchema = blogSchema.extend({
  content: z.array(z.any()),
});

export const blogsSchema = z.object({
  data: z.array(blogSchema),
  meta: strapiMetaSchema,
});

export type BlogType = z.infer<typeof blogSchema>;
export type BlogDetailType = z.infer<typeof blogDetailSchema>;
