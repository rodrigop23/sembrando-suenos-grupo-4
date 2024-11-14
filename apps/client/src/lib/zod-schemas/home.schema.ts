import { number, z } from "zod";
import { linkSchema, strapiImageSchema } from "./strapi.schema";

const MissionSchema = z.object({
  id: z.number(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  image: strapiImageSchema,
});

const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: strapiImageSchema,
});

const heroSectionSchema = z.object({
  __component: z.literal("layout.hero-section"),
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  image: strapiImageSchema,
  ctaButton: linkSchema.nullable(),
});

const missionSectionSchema = z.object({
  __component: z.literal("layout.mission-section"),
  id: z.number(),
  title: z.string(),
  missions: z.array(MissionSchema),
});

const proyectSectionSchema = z.object({
  __component: z.literal("layout.proyect-section"),
  id: z.number(),
  title: z.string(),
  proyects: z.array(ProjectSchema),
});

const getInvolvedSectionSchema = z.object({
  __component: z.literal("layout.get-involved-section"),
  id: z.number(),
  title: z.string(),
  description: z.string(),
  volunteerButton: linkSchema.nullable(),
  donationButton: linkSchema.nullable(),
});

const BlockSchema = z.discriminatedUnion("__component", [
  heroSectionSchema,
  missionSectionSchema,
  proyectSectionSchema,
  getInvolvedSectionSchema,
]);

export const homePageSchema = z.object({
  id: number(),
  documentId: z.string(),
  blocks: z.array(BlockSchema),
});

export type BlockType = z.infer<typeof BlockSchema>;
export type HeroSectionType = z.infer<typeof heroSectionSchema>;
export type MissionSectionType = z.infer<typeof missionSectionSchema>;
export type ProyectSectionType = z.infer<typeof proyectSectionSchema>;
export type GetInvolvedSectionType = z.infer<typeof getInvolvedSectionSchema>;
