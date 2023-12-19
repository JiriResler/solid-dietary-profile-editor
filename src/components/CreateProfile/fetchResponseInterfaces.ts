export interface DietResponse {
  results: {
    bindings: DietResponseBinding[]
  }
}

export interface DietResponseBinding {
  dietIRI: {
    value: string
  }
  dietLabel: {
    value: string
  }
}

export interface IngredientResponse {
  food: string
  foodLabel: string
}
