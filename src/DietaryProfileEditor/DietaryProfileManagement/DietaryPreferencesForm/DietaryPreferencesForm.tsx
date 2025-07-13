import './DietaryPreferencesForm.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormHeader from './FormHeader/FormHeader'
import SelectAllergens from './SelectAllergens/SelectAllergens'
import FormFooter from './FormFooter/FormFooter'
import SelectDietPreferences from './SelectDietPreferences/SelectDietPreferences'
import SelectTastePreferences from './SelectTastePreferences/SelectTastePreferences'
import React, { useState } from 'react'

export const SelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
}

/**
 * Renders controls of the dietary preferences form.
 */
const ActualDietaryPreferencesForm: React.FC = () => {
  const [formStep, setFormStep] = useState(0)

  const totalNumberOfSteps = 3

  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])

  const [selectedDiets, setSelectedDiets] = useState<string[]>([])

  return (
    <div className="d-flex flex-column h-100">
      <div>
        <FormHeader
          formStep={formStep}
          totalNumberOfSteps={totalNumberOfSteps}
        />
      </div>

      <div className="form-main-content flex-fill mt-1 mb-3">
        <div className="overflow-content h-100" tabIndex={-1}>
          <Form>
            {formStep === 0 && (
              <SelectAllergens
                selectedAllergens={selectedAllergens}
                setSelectedAllergens={setSelectedAllergens}
              />
            )}
            {formStep === 1 && (
              <SelectDietPreferences
                selectedDiets={selectedDiets}
                setSelectedDiets={setSelectedDiets}
              />
            )}
            {formStep === 2 && <SelectTastePreferences />}
          </Form>
        </div>
      </div>

      <div>
        <FormFooter
          formStep={formStep}
          setFormStep={setFormStep}
          totalNumberOfSteps={totalNumberOfSteps}
        />
      </div>
    </div>
  )
}

/**
 * Displays a form that allows the user to input or update their dietary preferences and manages screen size adaptations for large or small displays.
 */
const DietaryPreferencesForm: React.FC = () => {
  return (
    <div className="dietary-preferences-form-screen">
      <div className="d-lg-none h-100 form-small-screen-container">
        <ActualDietaryPreferencesForm />
      </div>

      <div className="d-none d-lg-block h-100">
        <Row className="form-background-color position-relative h-100">
          <Col>
            <Card className="dietary-preferences-form-card position-absolute top-50 start-50 translate-middle">
              <Card.Body className="h-100">
                <ActualDietaryPreferencesForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DietaryPreferencesForm
