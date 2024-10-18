/**
 * Returns an object's key by its associated value or undefined if the object does not have a key with such value.
 */
export function getKeyByValue(targetObject: object, value: string) {
  return Object.keys(targetObject).find(
    (key) => targetObject[key as keyof typeof targetObject] === value,
  )
}
