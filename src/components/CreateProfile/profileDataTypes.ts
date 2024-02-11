import SelectMenuOption from './selectMenuOptionType'

export type Allergen = {
  iri: string
  label: string
  menuLegendNumber: number
  iconUrl: string
  sameAsIri: string
}

export type Diet = {
  label: string
  iri: string
}

export type TastePreferences = {
  cuisines: ReadonlyArray<SelectMenuOption>
  desserts: string[]
  spiciness: string[]
}
