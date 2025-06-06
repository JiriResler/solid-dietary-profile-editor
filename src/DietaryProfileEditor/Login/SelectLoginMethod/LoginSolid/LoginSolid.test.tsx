import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginSolid from './LoginSolid'
import { IntlProvider } from 'react-intl'

describe('LoginSolid', () => {
  const propFnMock = vi.fn()

  beforeEach(() => {
    render(
      <IntlProvider locale="en">
        <LoginSolid setLoginWithSolid={propFnMock} />
      </IntlProvider>,
    )
  })

  test('Provider URL field should match selected provider', () => {
    const providerSelect = screen.getByRole('combobox')

    fireEvent.change(providerSelect, { target: { value: 'Data Pod' } })

    const providerUrlTextField = screen.getByRole('textbox')

    expect(providerUrlTextField).toHaveValue('https://datapod.igrant.io/')
  })

  test("Typing a known provider's URL should change selected provider", () => {
    const providerUrlTextField = screen.getByRole('textbox')

    fireEvent.change(providerUrlTextField, {
      target: { value: 'https://login.inrupt.com/' },
    })

    const providerSelect = screen.getByRole('combobox')

    expect(providerSelect).toHaveValue('Inrupt Pod Spaces')
  })

  test('Provider redirect button should be disabled when provider URL input field is empty', () => {
    const providerUrlTextField = screen.getByRole('textbox')

    fireEvent.change(providerUrlTextField, { target: { value: 'someValue' } })

    fireEvent.change(providerUrlTextField, { target: { value: '' } })

    const redirectButton = screen.getAllByRole('button')[1]

    expect(redirectButton).toBeDisabled()
  })

  test('Changing a known provider URL removes selected provider', () => {
    const providerSelect = screen.getByRole('combobox')

    fireEvent.change(providerSelect, { target: { value: 'Data Pod' } })

    const providerUrlTextField = screen.getByRole('textbox')

    fireEvent.change(providerUrlTextField, { target: { value: '' } })

    expect(providerSelect).toHaveValue('Choose a Solid provider')
  })
})
