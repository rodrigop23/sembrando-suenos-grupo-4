import { z } from "zod";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const strapiImageSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  url: z.string().transform((url) => `${STRAPI_URL}${url}`),
});

export const linkSchema = z.object({
  id: z.number(),
  url: z.string(),
  text: z.string(),
  isExternal: z.boolean(),
});

export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
});

export const strapiMetaSchema = z.object({
  pagination: paginationSchema,
});
