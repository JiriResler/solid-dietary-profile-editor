import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import './SelectAllergens.css'
import { Allergen } from './profileDataTypes'

type Props = {
  allergenArray: Allergen[]
  currentStep: number
  selectedAllergens: Set<Allergen>
  setSelectedAllergens: React.Dispatch<React.SetStateAction<Set<Allergen>>>
}

const SelectAllergens: React.FC<Props> = ({
  allergenArray,
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
        {allergenArray.map((allergen: Allergen) => {
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
                    allergen.iconUrl
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
