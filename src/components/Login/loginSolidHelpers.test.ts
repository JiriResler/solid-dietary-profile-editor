import { describe, test, expect } from 'vitest'
import { getKeyByValue } from './loginSolidHelpers'

describe('loginSolidHelpers', () => {
  test('return existing key', () => {
    const obj = {
      testKey: 'testValue',
    }

    const value = 'testValue'

    const expectedKey = 'testKey'

    const actualKey = getKeyByValue(obj, value)

    expect(actualKey).toEqual(expectedKey)
  })

  test('return non existing key', () => {
    const obj = {
      testKey: 'testValue',
    }

    const value = 'nonExistingValue'

    const expectedKey = undefined

    const actualKey = getKeyByValue(obj, value)

    expect(actualKey).toEqual(expectedKey)
  })
})
