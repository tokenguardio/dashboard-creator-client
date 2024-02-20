import { z } from 'zod'

export const LayoutSchema = z.array(
  z.object({
    id: z.string(),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
  })
)

export type TLayout = z.infer<typeof LayoutSchema>