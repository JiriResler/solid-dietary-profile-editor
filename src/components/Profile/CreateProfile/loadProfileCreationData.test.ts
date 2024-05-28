import { describe, test, assert } from 'vitest'
import { Thing } from '@inrupt/solid-client'
import { getAllergenFromThing } from './loadProfileCreationData'
import { Allergen } from './profileDataTypes'

describe('Load profile creation data', () => {
  test('Allergen created from a correct Thing returns an Allergen with correct values.', () => {
    const thing: Thing = {
      type: 'Subject',
      url: 'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/Fish',
      predicates: {
        'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
          namedNodes: [
            'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/ontology#Allergen',
          ],
        },
        'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/ontology#allergenNumber':
          {
            literals: {
              'http://www.w3.org/2001/XMLSchema#integer': ['4'],
            },
          },
        'http://www.w3.org/2000/01/rdf-schema#label': {
          langStrings: {
            en: ['Fish'],
            sk: ['Ryby'],
            cz: ['Ryby'],
          },
        },
        'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/ontology#hasIcon':
          {
            namedNodes: [
              'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/resource/fish.svg',
            ],
          },
        'http://www.w3.org/2002/07/owl#sameAs': {
          namedNodes: ['http://dbpedia.org/resource/Fish'],
        },
      },
    }

    const expectedAllergen: Allergen = {
      iri: thing.url,
      currentLanguageLabel:
        thing.predicates['http://www.w3.org/2000/01/rdf-schema#label']
          .langStrings!.en[0],
      menuLegendNumber: parseInt(
        thing.predicates[
          'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/ontology#allergenNumber'
        ].literals!['http://www.w3.org/2001/XMLSchema#integer'][0],
      ),
      iconUrl:
        thing.predicates[
          'https://raw.githubusercontent.com/JiriResler/personalized-restaurant-menu-viewer-application-ontology/main/ontology#hasIcon'
        ].namedNodes![0],
      sameAsIri:
        thing.predicates['http://www.w3.org/2002/07/owl#sameAs'].namedNodes![0],
    }

    const actualAllergen = getAllergenFromThing(thing, 'en')

    assert.deepEqual(actualAllergen, expectedAllergen)
  })
})
