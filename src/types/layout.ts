import { z } from 'zod'

export const LayoutSchema = z.array(
  z.object({
    id: z.string(),
    i: z.string().optional(),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
    static: z.boolean()
  })
)

export type TLayout = z.infer<typeof LayoutSchema>