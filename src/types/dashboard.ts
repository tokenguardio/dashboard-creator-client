import { z } from 'zod'
import { layoutSchema } from './layout'
import { elementSchema } from './element'
import { themeSchema } from './theme'

export const DashboardSchema = z.object({
  title: z.string(),
  elements: z.array(elementSchema),
  layout: layoutSchema,
  theme: themeSchema,
  _id: z.string(),
})

export type TDashboard = z.infer<typeof DashboardSchema>
