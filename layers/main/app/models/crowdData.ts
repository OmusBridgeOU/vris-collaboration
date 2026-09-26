import { z } from 'zod'

export const crowdLevelSchema = z.union([
  z.literal(-1),
  z.literal(1),
  z.literal(2),
  z.literal(3),
])

const crowdUpdatedAtSchema = z.string()
  .transform((value) => {
    // D1のCURRENT_TIMESTAMPはUTC。タイムゾーンを明示したISO形式にそろえる。
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
      return `${value.replace(' ', 'T')}Z`
    }
    return value
  })
  .pipe(z.iso.datetime())

export const crowdDataSchema = z.object({
  value1: crowdLevelSchema,
  value2: crowdLevelSchema,
  updated_at: crowdUpdatedAtSchema.nullable(),
})

export type CrowdLevel = z.infer<typeof crowdLevelSchema>
export type CrowdData = z.infer<typeof crowdDataSchema>
