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
