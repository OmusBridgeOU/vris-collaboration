import { z } from 'zod'

export const crowdLevelSchema = z.union([
  z.literal(-1),
  z.literal(1),
  z.literal(2),
  z.literal(3),
])

export const crowdDataSchema = z.object({
  value1: crowdLevelSchema,
  value2: crowdLevelSchema,
  updated_at: z.iso.datetime().nullable(),
})

export type CrowdLevel = z.infer<typeof crowdLevelSchema>
export type CrowdData = z.infer<typeof crowdDataSchema>
