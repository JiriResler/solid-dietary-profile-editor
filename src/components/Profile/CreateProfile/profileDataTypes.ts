import SelectMenuOption from './selectMenuOptionType'

export type Allergen = {
  iri: string
  currentLanguageLabel: string
  menuLegendNumber: number
  iconUrl: string
  sameAsIri: string
}

export type Diet = {
  iri: string
  currentLanguageLabel: string
  sameAsIri: string
}

export type TastePreferences = {
  cuisines: ReadonlyArray<SelectMenuOption>
  desserts: string[]
  spiciness: string[]
}
