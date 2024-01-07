export type Allergen = {
  IRI: string
  label: string
  menuLegendNumber: number
}

export type Diet = {
  IRI: string
  label: string
}

export type TastePreferences = {
  cuisines: Set<string>
  desserts: string
  spiciness: number
}
