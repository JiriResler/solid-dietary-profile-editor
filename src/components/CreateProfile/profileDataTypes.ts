import SelectMenuOption from './selectMenuOptionType'

export type Allergen = {
  IRI: string
  label: string
  menuLegendNumber: number
  iconUrl: string
}

export type Diet = {
  label: string
  IRI: string
}

export type TastePreferences = {
  cuisines: ReadonlyArray<SelectMenuOption>
  desserts: string[]
  spiciness: string[]
}
