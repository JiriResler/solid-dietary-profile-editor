import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'

const allergenList: Allergen[] = []

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
                  type="checkbox"
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
