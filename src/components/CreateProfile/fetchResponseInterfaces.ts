export interface WikidataDietResponse {
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

export interface WikidataCuisineResponse {
  results: {
    bindings: CuisineResponseBinding[]
  }
}

export interface CuisineResponseBinding {
  cuisineIRI: {
    value: string
  }
  cuisineLabel: {
    value: string
  }
}
