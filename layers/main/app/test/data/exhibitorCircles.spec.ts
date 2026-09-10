import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { exhibitorCircles } from '../../data/exhibitorCircles'

describe('exhibitorCircles', () => {
  const imagePaths = exhibitorCircles.flatMap(circle => circle.imgSrc ? [circle.imgSrc] : [])

  test('uses deployment-safe ASCII image paths', () => {
    expect(imagePaths).not.toHaveLength(0)
    expect(imagePaths.every(path => /^[\x20-\x7E]+$/.test(path))).toBe(true)
  })

  test('references image files that exist in public', () => {
    const missingPaths = imagePaths.filter(path => !existsSync(resolve(import.meta.dirname, '../../../public', path.slice(1))))

    expect(missingPaths).toEqual([])
  })
})
