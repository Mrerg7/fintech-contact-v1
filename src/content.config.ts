import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const site = defineCollection({
  loader: file('./src/content/site/default.json'),
  schema: z.object({
    domain: z.string(),
    email: z.email(),
    tagline: z.string(),
    heroSupport: z.string(),
    trustPoints: z.array(z.string()),
    valueProps: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    useCases: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    seoPoints: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    processSteps: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    disclaimer: z.string(),
  }),
});

export const collections = { site };
