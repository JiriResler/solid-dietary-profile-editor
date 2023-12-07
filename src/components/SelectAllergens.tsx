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
    imageName: 'celery',
    IRI: 'http://dbpedia.org/resource/Celery',
  },
  {
    name: 'Gluten',
    assignedLawNumber: 2,
    imageName: 'gluten',
    IRI: 'http://dbpedia.org/resource/Gluten',
  },
  {
    name: 'Gluten',
    assignedLawNumber: 2,
    imageName: 'gluten',
    IRI: 'http://dbpedia.org/resource/Gluten',
  },
  {
    name: 'Gluten',
    assignedLawNumber: 2,
    imageName: 'gluten',
    IRI: 'http://dbpedia.org/resource/Gluten',
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
              <Col xs={6}>
                <Stack direction="horizontal" gap={2}>
                  <Form.Check type={'checkbox'} id={'id'} />
                  <div>
                    {allergen.name} ({allergen.assignedLawNumber})
                  </div>
                  <img
                    src={'images/allergens/' + allergen.imageName + '.svg'}
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
