import { z } from 'zod'

export const ElementSchema = z.union([
  z.object({
    title: z.string(),
    type: z.literal('areaChart'),
    id: z.string(),
    data: z.unknown(),
  }),
  z.object({
    text: z.string(),
    type: z.literal('text'),
    id: z.string(),
  }),
  z.object({
    text: z.string(),
    type: z.literal('button'),
    id: z.string(),
    link: z.string(),
  }),
])

export type TElement = z.infer<typeof ElementSchema>