import './CircularProgressBar.css'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import React from 'react'
import calculateProgressValue from './circularProgressHelpers'

type ProgressProps = {
  currentStep: number
  totalSteps: number
}

/**
 * Displays a circular progress indicator with the current step information.
 */
const CircularProgressBar: React.FC<ProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        size="80px"
        thickness={6}
        value={100}
        sx={{ color: '#e3dfde' }}
        aria-hidden
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
          size="80px"
          thickness={6}
          sx={{ color: '#2541b2' }}
          aria-label="dietary-preferences-form-progress"
          value={calculateProgressValue(currentStep, totalSteps)}
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
        <span className="inside-progress-text">
          {currentStep + 1} of {totalSteps}
        </span>
      </Box>
    </Box>
  )
}

export default CircularProgressBar
