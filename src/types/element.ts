import { z } from 'zod'

export const ElementSchema = z.union([
  z.object({
    title: z.string(),
    type: z.literal('areaChart'),
      //     visType: z.union([
  //       z.literal('areaChart'),
  //       z.literal('barChart'),
  //       z.literal('stackedBarChart'),
  //       z.literal('multiAreaChart'),
  //       z.literal('lineChart'),
  //       z.literal('multiLineChart'),
  //       z.literal('table')
  //     ]),
    id: z.string(),
    data: z.unknown(),
  }),
  z.object({
    id: z.string(),
    i: z.string().optional(),
    text: z.string(),
    title: z.string().optional(),
    type: z.literal('text'),
  }),
  z.object({
    id: z.string(),
    i: z.string().optional(),
    text: z.string(),
    title: z.string().optional(),
    type: z.literal('button'),
    link: z.string(),
  }),
])

export type TElement = z.infer<typeof ElementSchema>

// export const ElementSchema = z.union([
  //   z.object({
  //     _id: z.string(),
  //     id: z.string(),
  //     title: z.string(),
  //     visType: z.literal('singleValue'),
  //     prefix: z.string().optional(),
  //     info: z.string().optional(),
  //     showTrend: z.boolean, // default false
  //     formatValue: z.boolean().optional,
  //     data: z.unknown(),
  //   }),
  //   z.object({
  //     _id: z.string(),
  //     id: z.string(),
  //     title: z.string(),
  //     visType: z.union([
  //       z.literal('areaChart'),
  //       z.literal('barChart'),
  //       z.literal('stackedBarChart'),
  //       z.literal('multiAreaChart'),
  //       z.literal('lineChart'),
  //       z.literal('multiLineChart'),
  //       z.literal('table')
  //     ]),
  //     data: z.unknown(),
  //     round: z.number().optional(),
  //     minValue: z.number().optional(),
  //     maxValue: z.number().optional(),
  //     info: z.string().optional(),
  //     formatValue: z.boolean().optional(), // default false
  //     prefixValue: z.string().optional(),
  //   }),
  //   z.object({
  //     _id: z.string(),
  //     id: z.string(),
  //     text: z.string(),
  //     visType: z.literal('text'),
  //   }),
  //   z.object({
  //     _id: z.string(),
  //     id: z.string(),
  //     text: z.string(),
  //     visType: z.literal('button'),
  //     link: z.string(),
  //   }),
  // ])