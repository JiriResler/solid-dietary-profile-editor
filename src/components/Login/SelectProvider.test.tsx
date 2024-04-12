import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SelectProvider from './SelectProvider'
import IntlProviderWrapper from '../IntlProviderWrapper'

describe('SelectProvider', () => {
  test('selecting to log in via solid renders a list with solid providers', () => {
    render(
      <IntlProviderWrapper>
        <SelectProvider />
      </IntlProviderWrapper>,
    )

    const signInViaSolidButton = screen.getByText('Sign in with Solid')

    fireEvent.click(signInViaSolidButton)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
