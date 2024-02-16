import { z } from 'zod'
import { LayoutSchema } from './layout'
import { ElementSchema } from './element'
import { ThemeSchema } from './theme'

export const DashboardSchema = z.object({
  title: z.string(),
  elements: z.array(ElementSchema),
  layout: LayoutSchema,
  theme: ThemeSchema,
  _id: z.string(),
})

export type TDashboard = z.infer<typeof DashboardSchema>
