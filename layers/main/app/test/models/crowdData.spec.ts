import { describe, expect, test } from 'vitest'
import { crowdDataSchema } from '../../models/crowdData'

describe('crowdDataSchema', () => {
  test('本番APIの正常なレスポンスを受け入れる', () => {
    expect(crowdDataSchema.parse({
      value1: 1,
      value2: 3,
      updated_at: '2026-09-26T01:00:00.000Z',
    })).toEqual({
      value1: 1,
      value2: 3,
      updated_at: '2026-09-26T01:00:00.000Z',
    })
  })

  test.each([
    { value1: -2, value2: 1, updated_at: null },
    { value1: 0, value2: 1, updated_at: null },
    { value1: 4, value2: 1, updated_at: null },
    { value1: 1, value2: 2, updated_at: 'invalid-date' },
    { value1: 1, updated_at: null },
  ])('契約外のレスポンスを拒否する: %o', (payload) => {
    expect(crowdDataSchema.safeParse(payload).success).toBe(false)
  })
})
