import './DietaryPreferencesForm.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormHeader from './FormHeader/FormHeader'
import AllergensAndIntolerances from './AllergensAndIntolerances/AllergensAndIntolerances'
import FormFooter from './FormFooter/FormFooter'
import DietPreferences from './DietPreferences/DietPreferences'
import TastesAndFoodPreparation from './TastesAndFoodPreparation/TastesAndFoodPreparation'
import React, { useState } from 'react'

/**
 * Renders the actual dietary preferences form, while the DietaryPreferencesForm component manages screen size adaptations for large or small displays.
 */
const ActualDietaryPreferencesForm: React.FC = () => {
  const [formStep, setFormStep] = useState(0)

  const totalNumberOfSteps = 3

  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])

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
              <AllergensAndIntolerances
                selectedAllergens={selectedAllergens}
                setSelectedAllergens={setSelectedAllergens}
              />
            )}
            {formStep === 1 && <DietPreferences />}
            {formStep === 2 && <TastesAndFoodPreparation />}
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
 * Displays a form that allows the user to input or update their dietary preferences.
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
