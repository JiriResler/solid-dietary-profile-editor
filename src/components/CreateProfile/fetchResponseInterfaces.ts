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
