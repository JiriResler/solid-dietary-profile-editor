// import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'

const allergenList = [
  {
    name: 'Celery',
    assignedLawNumber: 1,
    IRI: 'http://dbpedia.org/resource/Celery',
  },
  {
    name: 'Molluscs',
    assignedLawNumber: 8,
    IRI: 'http://dbpedia.org/resource/Mollusc_shell',
  },
  {
    name: 'Gluten',
    assignedLawNumber: 2,
    IRI: 'http://dbpedia.org/resource/Gluten',
  },
  {
    name: 'Mustard',
    assignedLawNumber: 9,
    IRI: 'http://dbpedia.org/resource/Mustard_(condiment)',
  },
  {
    name: 'Crustaceans',
    assignedLawNumber: 3,
    IRI: 'http://dbpedia.org/resource/Crustacean',
  },
  {
    name: 'Nuts',
    assignedLawNumber: 10,
    IRI: 'http://dbpedia.org/resource/Nut_(fruit)',
  },
  {
    name: 'Eggs',
    assignedLawNumber: 4,
    IRI: 'http://dbpedia.org/resource/Egg',
  },
  {
    name: 'Peanuts',
    assignedLawNumber: 11,
    IRI: 'http://dbpedia.org/resource/Peanut',
  },
  {
    name: 'Fish',
    assignedLawNumber: 5,
    IRI: 'http://dbpedia.org/resource/Fish',
  },
  {
    name: 'Sesame',
    assignedLawNumber: 12,
    IRI: 'http://dbpedia.org/resource/Sesame',
  },
  {
    name: 'Lupin',
    assignedLawNumber: 6,
    IRI: 'http://dbpedia.org/resource/Lupinus_polyphyllus',
  },
  {
    name: 'Soya',
    assignedLawNumber: 13,
    IRI: 'http://dbpedia.org/resource/Soybean',
  },
  {
    name: 'Milk',
    assignedLawNumber: 7,
    IRI: 'http://dbpedia.org/resource/Milk',
  },
  {
    name: 'Sulphites',
    assignedLawNumber: 14,
    IRI: 'http://dbpedia.org/resource/Sulfur_dioxide',
  },
]

const SelectAllergens: React.FC = () => {
  return (
    <>
      <Stack>
        <h1>1. What are you allergic to?</h1>

        <p>
          A number in brackets is the number of the allergen given by the law.
        </p>

        <Row>
          {allergenList.map((allergen) => {
            return (
              <Col key={allergen.IRI} xs={6}>
                <Stack direction="horizontal" gap={2}>
                  <Form.Check type={'checkbox'} id={'id'} />
                  <div>
                    {allergen.name} ({allergen.assignedLawNumber})
                  </div>
                  <img
                    src={
                      'images/allergens/' + allergen.name.toLowerCase() + '.svg'
                    }
                    alt=""
                    className="allergen-icon"
                  />
                </Stack>
              </Col>
            )
          })}
        </Row>
      </Stack>
      <div className="mt-5">1/3</div>
      <Button>Next step</Button>
    </>
  )
}

export default SelectAllergens
