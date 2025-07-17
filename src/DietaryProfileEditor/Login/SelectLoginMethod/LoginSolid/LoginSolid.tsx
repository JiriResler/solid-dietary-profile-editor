import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { getKeyByValue } from './LoginSolidHelpers'
import Spinner from 'react-bootstrap/Spinner'
import ErrorModal from '../../../ErrorModal/ErrorModal'
import { login } from '@inrupt/solid-client-authn-browser'
import LoginBackButton from '../LoginBackButton/LoginBackButton'
import LanguageContext from '../../../LanguageContext'

type LoginSolidProps = {
  setLoginWithSolid: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Enables a user to log in via Solid. Contains controls for selecting a Solid provider and a Login button for redirecting to the provider.
 * @param setLoginWithSolid A function for setting a state variable indicating whether the user wishes to log in with Solid.
 */
const LoginSolid: React.FC<LoginSolidProps> = ({ setLoginWithSolid }) => {
  const [selectedProviderName, setSelectedProviderName] = useState('')

  const [providerUrl, setProviderUrl] = useState('')

  const [loginCausedError, setLoginCausedError] = useState(false)

  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const [loginInProgress, setLoginInProgress] = useState(false)

  const intl = useIntl()

  const { selectedLanguage } = useContext(LanguageContext)

  const providerNameAndUrls = {
    'Inrupt Pod Spaces': 'https://login.inrupt.com/',
    'Data Pod': 'https://datapod.igrant.io/',
    'solidcommunity.net': 'https://solidcommunity.net/',
    'solidweb.org': 'https://solidweb.org/',
    'redpencil.io': 'https://solid.redpencil.io/',
  }

  /**
   * Redirects the user to the selected Solid provider.
   */
  function handleSolidLogin() {
    setLoginInProgress(true)

    login({
      oidcIssuer: providerUrl,
      redirectUrl: getRedirectUrl(),
    })
      .catch((error: Error) => {
        handleOnLoginError(error)
      })
      .finally(() => {
        setLoginInProgress(false)
      })
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
   * Logs the login error to the console and informs the user that something went wrong while trying to log in vith a Solid provider.
   */
  function handleOnLoginError(loginError: Error) {
    console.error(loginError)

    const errorMessage = intl.formatMessage({
      id: 'loginSolidErrorMessage',
      defaultMessage: `Possible reasons include:
        1. You are not connected to the internet.
        2. The provider URL is incorrect.
        3. There may be an issue with the selected Solid provider.
      `,
    })

    setLoginErrorMessage(errorMessage)
    setLoginCausedError(true)
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
   * Returns the placeholder for the Solid provider URL text input.
   */
  function getProviderUrlInputPlaceholder() {
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

    const urlState = '?locale=' + selectedLanguage

    return new URL(
      productionMode
        ? '/solid-dietary-profile-editor/login' + urlState
        : '/login' + urlState,
      window.location.origin,
    ).toString()
  }

  return (
    <>
      <ErrorModal
        show={loginCausedError}
        setShow={setLoginCausedError}
        titleMessage={intl.formatMessage({
          id: 'loginFailed',
          defaultMessage: 'Login failed',
        })}
        bodyMessage={loginErrorMessage}
      />

      <LoginBackButton setParentComponentScreenState={setLoginWithSolid} />

      <span className="select-login-method-heading">
        <FormattedMessage
          id="selectASolidProvider"
          defaultMessage="Select a Solid provider"
        />
      </span>

      <Form.Select
        value={selectedProviderName}
        onChange={(e) => handleSelectOnChange(e)}
        className="app-form-control"
      >
        <option key="defaultOption" hidden>
          {intl.formatMessage({
            id: 'chooseSolidProvider',
            defaultMessage: 'Choose a Solid provider',
          })}
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
        placeholder={getProviderUrlInputPlaceholder()}
        value={providerUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnProviderUrlChange(e)
        }
        className="app-form-control"
      />

      <Button
        onClick={() => handleSolidLogin()}
        className="login-screen-button solid-button mt-2 w-100"
        disabled={providerUrl.length === 0}
      >
        {!loginInProgress ? (
          <FormattedMessage
            id="redirectToProvider"
            defaultMessage="Redirect to provider"
          />
        ) : (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Button>
    </>
  )
}

export default LoginSolid
