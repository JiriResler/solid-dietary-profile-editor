import './CircularProgressBar.css'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import React from 'react'

/**
 * Takes a step number and total steps as input and returns progress value in percentage.
 */
function calculateProgressValue(step: number, totalSteps: number): number {
  if (totalSteps <= 0) {
    console.error(
      `Invalid totalSteps value: ${totalSteps}. It must be greater than 0.`,
    )
    return 0
  }

  if (step < 0 || step >= totalSteps) {
    console.warn(
      `Dietary preferences form step number out of range. Expected a number between 0 and ${
        totalSteps - 1
      }, but got ${step}.`,
    )
    return 0
  }

  return Math.round(((step + 1) / totalSteps) * 100)
}

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
