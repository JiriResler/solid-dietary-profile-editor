export type DBPediaResponse = {
  head: {
    link: Array<unknown>
    vars: string[]
  }
  results: {
    bindings: DBPediaResponseBinding[]
  }
}

type DBPediaResponseBinding = {
  iri: {
    value: string
  }
  label: {
    value: string
  }
}
