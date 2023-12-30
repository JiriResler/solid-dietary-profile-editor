import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SelectProvider from './SelectProvider'
import IntlProviderWrapper from '../IntlProviderWrapper'

describe('SelectProvider', () => {
  test('choose a provider heading is rendered', () => {
    render(
      <IntlProviderWrapper>
        <SelectProvider />
      </IntlProviderWrapper>,
    )

    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  test('selecting to log in via solid renders a list with solid providers', () => {
    render(
      <IntlProviderWrapper>
        <SelectProvider />
      </IntlProviderWrapper>,
    )

    const signInViaSolidButton = screen.getByText('Solid')

    fireEvent.click(signInViaSolidButton)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
