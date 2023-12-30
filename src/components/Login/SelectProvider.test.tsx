import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})
