import { z } from 'zod'

export const ThemeSchema = z.object({
  name: z.string(),
  _id: z.string(),
  font: z.string(),
  textColor: z.string(),
  itemGridStroke: z.string(),
  bgColor: z.string(),
  itemGridBgColor: z.string(),
  chartGradient: z.boolean(),
  bottomTimeline: z.boolean(),
  itemGridRadius: z.string(),
  additionalColor: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string()
})

export type TTheme = z.infer<typeof ThemeSchema>