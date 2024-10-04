import { describe, test, expect, beforeEach } from 'vitest'
import { getKeyByValue } from './SelectSolidProviderHelpers'

describe('SelectSolidProviderHelper functions', () => {
  let obj: object

  beforeEach(() => {
    obj = {
      testKey: 'testValue',
    }
  })

  test('getKeyByValue should return the existing key for a valid value', () => {
    const value = 'testValue'
    const expectedKey = 'testKey'

    const actualKey = getKeyByValue(obj, value)

    expect(actualKey).toEqual(expectedKey)
  })

  test('getKeyByValue should return undefined for a non-existing value', () => {
    const value = 'nonExistingValue'
    const expectedKey = undefined

    const actualKey = getKeyByValue(obj, value)

    expect(actualKey).toEqual(expectedKey)
  })

  test('getKeyByValue should return undefined if the object is empty', () => {
    const emptyObj = {}
    const value = 'testValue'
    const expectedKey = undefined

    const actualKey = getKeyByValue(emptyObj, value)

    expect(actualKey).toEqual(expectedKey)
  })
})
