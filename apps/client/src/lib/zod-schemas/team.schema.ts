import { z } from "zod";
import { strapiImageSchema } from "./strapi.schema";

const SocialLink = z.object({
  id: z.number(),
  url: z.string(),
  icon: z.string(),
});

const TeamMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
  description: z.string(),
  image: strapiImageSchema,
  socialLink: z.array(SocialLink),
});

export const teamMemberPageSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  teamMember: z.array(TeamMemberSchema),
});
