import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SelectSolidProvider from './SelectSolidProvider'
import { IntlProvider } from 'react-intl'

describe('SelectSolidProvider', () => {
  const propFnMock = vi.fn()

  test('renders', () => {
    render(
      <IntlProvider locale="en">
        <SelectSolidProvider setLoginWithSolid={propFnMock} />
      </IntlProvider>,
    )
    expect(screen.getByText('Select a Solid provider')).toBeDefined()
  })
})
