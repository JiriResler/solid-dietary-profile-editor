import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './EditDietaryProfile.css'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { styled } from '@mui/material/styles'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import EditProfileNavigation from './EditProfileNavigation/EditProfileNavigation'

const EditDietaryProfile: React.FC = () => {
  const [currentStep] = useState(0)

  const CustomStepConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 12px)',
      right: 'calc(50% + 12px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#1c3bb8',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#1c3bb8',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }))

  return (
    <>
      <Row>
        <Col>
          <Stepper
            activeStep={currentStep}
            alternativeLabel
            className="edit-profile-stepper mt-3"
            connector={<CustomStepConnector />}
            sx={{
              '& .MuiStepLabel-iconContainer.Mui-active > .MuiSvgIcon-root.Mui-active':
                {
                  color: '#2541b2',
                },
              '& .MuiStepLabel-iconContainer.Mui-completed > .MuiSvgIcon-root.Mui-completed':
                {
                  color: '#2541b2',
                },
              '& .MuiStepLabel-labelContainer': {
                height: '50px',
                position: 'relative',
              },
            }}
          >
            <Step key="step1">
              <StepLabel>
                <FormattedMessage id="allergens" defaultMessage="Allergens" />
              </StepLabel>
            </Step>

            <Step key="step2">
              <StepLabel>
                <FormattedMessage id="diets" defaultMessage="Diets" />
              </StepLabel>
            </Step>

            <Step key="step3">
              <StepLabel>
                <div className="position-absolute top-50 start-50 translate-middle">
                  <FormattedMessage
                    id="tastePreferences"
                    defaultMessage="Taste preferences"
                  />
                </div>
              </StepLabel>
            </Step>
          </Stepper>
        </Col>
      </Row>

      <Row>
        <Col>Main content</Col>
      </Row>

      <Row>
        <Col>
          <EditProfileNavigation />
        </Col>
      </Row>
    </>
  )
}

export default EditDietaryProfile
