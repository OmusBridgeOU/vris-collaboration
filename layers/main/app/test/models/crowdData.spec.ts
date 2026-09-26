import { describe, expect, test } from 'vitest'
import { crowdDataSchema } from '../../models/crowdData'

describe('crowdDataSchema', () => {
  test('本番APIのD1日時をUTCのISO形式に変換する', () => {
    expect(crowdDataSchema.parse({
      value1: 3,
      value2: 3,
      updated_at: '2026-09-26 03:32:12',
    })).toEqual({
      value1: 3,
      value2: 3,
      updated_at: '2026-09-26T03:32:12Z',
    })
  })

  test('既存のISO形式の日時も受け入れる', () => {
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

  test('未登録時のnullを受け入れる', () => {
    const payload = { value1: -1, value2: -1, updated_at: null }
    expect(crowdDataSchema.parse(payload)).toEqual(payload)
  })

  test.each([
    { value1: -2, value2: 1, updated_at: null },
    { value1: 0, value2: 1, updated_at: null },
    { value1: 4, value2: 1, updated_at: null },
    { value1: 1, value2: 2, updated_at: 'invalid-date' },
    { value1: 1, value2: 2, updated_at: '2026-02-30 03:32:12' },
    { value1: 1, value2: 2, updated_at: '2026-09-26 24:00:00' },
    { value1: 1, value2: 2, updated_at: '2026-09-26' },
    { value1: 1, updated_at: null },
  ])('契約外のレスポンスを拒否する: %o', (payload) => {
    expect(crowdDataSchema.safeParse(payload).success).toBe(false)
  })
})
