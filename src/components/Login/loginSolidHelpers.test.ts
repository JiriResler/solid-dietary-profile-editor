import { describe, test, expect } from 'vitest'
import { getKeyByValue } from './loginSolidHelpers'

describe('Log in Solid', () => {
  test('return existing key', () => {
    const obj = {
      testKey: 'testValue',
    }

    const value = 'testValue'

    const expectedKey = 'testKey'

    const actualKey = getKeyByValue(obj, value)

    expect(actualKey).toEqual(expectedKey)
  })
})
