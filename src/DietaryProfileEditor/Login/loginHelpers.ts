/**
 * Returns full language name based on the provided locale.
 */
export function languageFullName(locale: string): string | undefined {
  if (locale === 'en') {
    return 'English'
  }

  if (locale === 'sk') {
    return 'Slovensky'
  }

  return undefined
}
