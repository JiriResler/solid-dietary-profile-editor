import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'

const allergenList: Allergen[] = [
  {
    label: 'Celery',
    menuLegendNumber: 1,
    IRI: 'http://dbpedia.org/resource/Celery',
  },
  {
    label: 'Molluscs',
    menuLegendNumber: 8,
    IRI: 'http://dbpedia.org/resource/Mollusc_shell',
  },
  {
    label: 'Gluten',
    menuLegendNumber: 2,
    IRI: 'http://dbpedia.org/resource/Gluten',
  },
  {
    label: 'Mustard',
    menuLegendNumber: 9,
    IRI: 'http://dbpedia.org/resource/Mustard_(condiment)',
  },
  {
    label: 'Crustaceans',
    menuLegendNumber: 3,
    IRI: 'http://dbpedia.org/resource/Crustacean',
  },
  {
    label: 'Nuts',
    menuLegendNumber: 10,
    IRI: 'http://dbpedia.org/resource/Nut_(fruit)',
  },
  {
    label: 'Eggs',
    menuLegendNumber: 4,
    IRI: 'http://dbpedia.org/resource/Egg',
  },
  {
    label: 'Peanuts',
    menuLegendNumber: 11,
    IRI: 'http://dbpedia.org/resource/Peanut',
  },
  {
    label: 'Fish',
    menuLegendNumber: 5,
    IRI: 'http://dbpedia.org/resource/Fish',
  },
  {
    label: 'Sesame',
    menuLegendNumber: 12,
    IRI: 'http://dbpedia.org/resource/Sesame',
  },
  {
    label: 'Lupin',
    menuLegendNumber: 6,
    IRI: 'http://dbpedia.org/resource/Lupinus_polyphyllus',
  },
  {
    label: 'Soya',
    menuLegendNumber: 13,
    IRI: 'http://dbpedia.org/resource/Soybean',
  },
  {
    label: 'Milk',
    menuLegendNumber: 7,
    IRI: 'http://dbpedia.org/resource/Milk',
  },
  {
    label: 'Sulphites',
    menuLegendNumber: 14,
    IRI: 'http://dbpedia.org/resource/Sulfur_dioxide',
  },
]

type Props = {
  currentStep: number
  selectedAllergens: Set<Allergen>
  setSelectedAllergens: React.Dispatch<React.SetStateAction<Set<Allergen>>>
}

const SelectAllergens: React.FC<Props> = ({
  currentStep,
  selectedAllergens,
  setSelectedAllergens,
}) => {
  function handleCheckboxOnChange(allergen: Allergen) {
    const newAllergenSet = new Set(selectedAllergens)

    if (newAllergenSet.has(allergen)) {
      newAllergenSet.delete(allergen)
    } else {
      newAllergenSet.add(allergen)
    }

    setSelectedAllergens(newAllergenSet)
  }

  return (
    <>
      <h1>{currentStep}. What are you allergic to?</h1>

      <p>
        A number in brackets is the number of the allergen given by the law.
      </p>

      <Row>
        {allergenList.map((allergen: Allergen) => {
          return (
            <Col key={allergen.IRI} xs={6}>
              <Stack direction="horizontal" gap={2}>
                <Form.Check
                  checked={selectedAllergens.has(allergen)}
                  onChange={() => {
                    handleCheckboxOnChange(allergen)
                  }}
                  type={'checkbox'}
                />
                <div>
                  {allergen.menuLegendNumber} {allergen.label}
                </div>
                <img
                  src={
                    'images/allergens/' + allergen.label.toLowerCase() + '.svg'
                  }
                  className="allergen-icon"
                />
              </Stack>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default SelectAllergens
