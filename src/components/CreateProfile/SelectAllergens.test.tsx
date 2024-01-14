import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SelectAllergens from './SelectAllergens'

describe('SelectAllergens', () => {
  test('select allergens screen contains 14 allergens', () => {
    render(
      <SelectAllergens
        selectedAllergens={new Set()}
        setSelectedAllergens={() => {}}
        currentStep={0}
      />,
    )

    expect(screen.getAllByRole('checkbox')).toHaveLength(14)
  })
})
