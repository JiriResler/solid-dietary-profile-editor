import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginButton } from '@inrupt/solid-ui-react'
import { useState } from 'react'
import './SelectSolidProvider.css'
import { FormattedMessage, useIntl } from 'react-intl'
import Stack from 'react-bootstrap/Stack'
import { getKeyByValue } from './SelectSolidProviderHelpers'
import Spinner from 'react-bootstrap/Spinner'
import { useSession } from '@inrupt/solid-ui-react'

type SelectSolidProviderProps = {
  setLoginWithSolid: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Enables a user to log in via Solid. Contains controls for selecting a Solid provider and a Login button for redirecting to the provider.
 * @param setLoginWithSolid A function for setting a state variable indicating whether a user wishes to log in vith Solid.
 */
const SelectSolidProvider: React.FC<SelectSolidProviderProps> = ({
  setLoginWithSolid,
}) => {
  const { sessionRequestInProgress } = useSession()

  const [selectedProviderName, setSelectedProviderName] = useState('')

  const [providerUrl, setProviderUrl] = useState('')

  const intl = useIntl()

  const providerNameAndUrls = {
    'Inrupt Pod Spaces': 'https://login.inrupt.com/',
    'Data Pod': 'https://datapod.igrant.io/',
    'solidcommunity.net': 'https://solidcommunity.net/',
    'solidweb.org': 'https://solidweb.org/',
    'redpencil.io': 'https://solid.redpencil.io/',
  }

  /**
   * Sets current Select option and changes provider URL in the text field.
   */
  function handleSelectOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value

    setSelectedProviderName(newValue)

    setProviderUrl(
      providerNameAndUrls[newValue as keyof typeof providerNameAndUrls],
    )
  }

  /**
   * Logs the login error to the console and informs the user that something went wrong while trying to log in via the Solid provider.
   */
  function handleOnLoginError(error: Error) {
    console.error('Login error:', error)

    const alertMessage = intl.formatMessage({
      id: 'loginSolidErrorMessage',
      defaultMessage: `
      Login failed. Possible reasons include: 

      1. You are not connected to the internet.  
      2. The Solid provider URL is invalid or incorrect.
      3. There may be an issue with the Solid provider.
    `,
    })

    alert(alertMessage)
  }

  /**
   * Sets Solid provider URL state variable and changes current Select option if the URL is one of the listed providers'.
   */
  function handleOnProviderUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = e.target.value.trim()

    setProviderUrl(newUrl)

    if (Object.values(providerNameAndUrls).includes(newUrl)) {
      const providerName = getKeyByValue(providerNameAndUrls, newUrl)

      // This will never happen
      if (providerName === undefined) {
        return
      }

      setSelectedProviderName(providerName)
    } else {
      setSelectedProviderName('')
    }
  }

  /**
   * Returns a string for the provider URL text input placeholder.
   */
  function getProviderUrlPlaceholder() {
    return intl.formatMessage({
      id: 'providerUrlPlaceholder',
      defaultMessage: 'Place a provider URL',
    })
  }

  /**
   * Creates a redirect URL based on whether code runs in production mode and returns it.
   */
  function getRedirectUrl() {
    const productionMode = import.meta.env.PROD

    return new URL(
      productionMode ? '/solid-dietary-profile-editor/login' : '/login',
      window.location.origin,
    ).toString()
  }

  /**
   * Returns the default intl message for the select component.
   */
  function defaultSelectOptionMessage() {
    return intl.formatMessage({
      id: 'chooseSolidProvider',
      defaultMessage: 'Choose a Solid provider',
    })
  }

  return (
    <Stack
      gap={3}
      className="select-provider-stack position-absolute top-50 start-50 translate-middle text-center pb-1 fade-in"
    >
      <span className="select-provider-heading">
        <FormattedMessage
          id="selectASolidProvider"
          defaultMessage="Select a Solid provider"
        />
      </span>

      <Form.Select
        value={selectedProviderName}
        onChange={(e) => handleSelectOnChange(e)}
        className="solid-provider-select"
      >
        <option key="defaultOption" hidden>
          {defaultSelectOptionMessage()}
        </option>

        {Object.keys(providerNameAndUrls).map((opt) => {
          return <option key={opt}>{opt}</option>
        })}
      </Form.Select>

      <FormattedMessage
        id="typeInProviderUrlHeading"
        defaultMessage="Or type in a provider URL"
      />

      <Form.Control
        type="text"
        placeholder={getProviderUrlPlaceholder()}
        value={providerUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnProviderUrlChange(e)
        }
      />

      <Button
        className="login-screen-button solid-button w-100 mt-2"
        disabled={providerUrl.length === 0}
      >
        <LoginButton
          oidcIssuer={providerUrl}
          redirectUrl={getRedirectUrl()}
          onError={(error) => handleOnLoginError(error)}
        >
          {!sessionRequestInProgress ? (
            <FormattedMessage
              id="redirectToProvider"
              defaultMessage="Redirect to provider"
            />
          ) : (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </LoginButton>
      </Button>

      <Button
        className="login-screen-button secondary-button w-100"
        onClick={() => {
          setLoginWithSolid(false)
        }}
      >
        <FormattedMessage id="goBack" defaultMessage="Back" />
      </Button>
    </Stack>
  )
}

export default SelectSolidProvider
