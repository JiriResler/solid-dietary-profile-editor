import Button from 'react-bootstrap/Button'

type Props = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const CreateProfileNavigation: React.FC<Props> = ({
  currentStep,
  setCurrentStep,
}) => {
  return (
    <div className="border text-center">
      {currentStep > 1 && (
        <Button
          onClick={() => {
            setCurrentStep(currentStep - 1)
          }}
        >
          Previous step
        </Button>
      )}

      {currentStep > 0 && <span>{currentStep} / 3</span>}

      {currentStep > 0 && currentStep < 3 && (
        <Button
          onClick={() => {
            setCurrentStep(currentStep + 1)
          }}
        >
          Next step
        </Button>
      )}

      {currentStep === 3 && <Button variant="success">Create profile</Button>}
    </div>
  )
}

export default CreateProfileNavigation
