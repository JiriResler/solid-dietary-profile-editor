import * as React from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import './EditProfileNavStepper.css'
import Box from '@mui/material/Box'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FormattedMessage } from 'react-intl'

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        size="90px"
        thickness={6}
        value={100}
        sx={{ color: '#e3dfde' }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          variant="determinate"
          size="90px"
          thickness={6}
          sx={{ color: '#2541b2' }}
          {...props}
        />
      </Box>

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="inside-progress-text">2 of 4</span>
      </Box>
    </Box>
  )
}

const EditProfileNavStepper: React.FC = () => {
  const [progress] = React.useState(50)

  return (
    <Row className="h-100 align-items-center">
      <Col xs={8} lg={9}>
        <div className="ms-2">
          <h1>
            <FormattedMessage
              id="allergiesAndFoodIntolerances"
              defaultMessage="Allergens and Intolerances"
            />
          </h1>

          <h5 className="d-none d-lg-flex text-secondary">Next: Step 3</h5>
        </div>
      </Col>

      <Col xs={4} lg={3} className="text-end">
        <CircularProgressWithLabel value={progress} />
      </Col>
    </Row>
  )
}

export default EditProfileNavStepper
