import { describe, test, expect } from 'vitest'
import { languageFullName } from './loginHelpers'

describe('Login component helper functions', () => {
  test('languageFullName should return full name for a supported locale', () => {
    const locale = 'en'
    const languageName = languageFullName(locale)

    expect(languageName).toEqual('English')
  })

  test('languageFullName should return undefined for an unsupported locale', () => {
    const locale = 'ar'
    const languageName = languageFullName(locale)

    expect(languageName).toEqual(undefined)
  })
})
