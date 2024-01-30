import { z } from 'zod'

// export const paletteSchema = z.object({
//   primaryColor: z.string(),
//   secondaryColor: z.string(),
//   additionalColor: z.string(),
// })

export const themeSchema = z.object({
  // font: z.string(),
  // palette: paletteSchema,
  // textColor: z.string(),
  // itemGridStroke: z.string(),
  // bgColor: z.string(),
  // itemGridRadius: z.string(),
  // itemGridBgColor: z.string(),
  // chartGradient: z.boolean(),
  // bottomTimeline: z.boolean(),
  _id: z.string(),
  bgColor: z.string(),
  itemGridBgColor: z.string(),
  itemGridRadius: z.string()
})

export type TTheme = z.infer<typeof themeSchema>