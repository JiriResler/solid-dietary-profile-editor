/**
 * Returns an object's key by its associated value or undefined if the object does not have a key with such value.
 */
export function getKeyByValue(targetObject: object, value: string) {
  return Object.keys(targetObject).find(
    (key) => targetObject[key as keyof typeof targetObject] === value,
  )
}

/**
 * Creates a redirect URL based on whether code runs in production mode and returns it.
 */
export function getRedirectUrl() {
  const productionMode = import.meta.env.PROD

  return new URL(
    productionMode ? '/solid-dietary-profile-editor/login' : '/login',
    window.location.origin,
  ).toString()
}
