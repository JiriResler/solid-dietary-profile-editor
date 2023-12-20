import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './CreateProfileNavigation.css'

type Props = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  saveProfile: () => void
}

const CreateProfileNavigation: React.FC<Props> = ({
  currentStep,
  setCurrentStep,
  saveProfile,
}) => {
  return (
    <Row>
      <Col className="text-end">
        {currentStep > 1 && (
          <Button
            onClick={() => {
              setCurrentStep(currentStep - 1)
            }}
            className="navigationButton"
          >
            Previous
          </Button>
        )}
      </Col>

      <Col xs={3} className="d-flex align-items-center ">
        {currentStep > 0 && <span className="mx-auto">{currentStep} / 3</span>}
      </Col>

      <Col>
        {currentStep > 0 && currentStep < 3 && (
          <Button
            onClick={() => {
              setCurrentStep(currentStep + 1)
            }}
            className="navigationButton"
          >
            Next
          </Button>
        )}

        {currentStep === 3 && (
          <Button
            onClick={() => {
              saveProfile()
            }}
            className="navigationButton"
            variant="success"
          >
            Finish
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default CreateProfileNavigation
