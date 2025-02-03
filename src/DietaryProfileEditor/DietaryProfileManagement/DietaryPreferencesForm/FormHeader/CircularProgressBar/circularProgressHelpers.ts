/**
 * Takes a step number and total steps as input and returns progress value in percentage.
 */
export default function calculateProgressValue(
  step: number,
  totalSteps: number,
): number {
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
