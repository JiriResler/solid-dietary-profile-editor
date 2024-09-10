import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginButton } from '@inrupt/solid-ui-react'
import { useState } from 'react'
import './LoginSolid.css'
import { FormattedMessage } from 'react-intl'
import Stack from 'react-bootstrap/Stack'

type Props = {
  setLoginWithSolid: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Enables a user to log in via Solid. Contains controls for selecting a Solid provider and a Login button for redirecting to the provider.
 * @param setLoginWithSolid A function for setting a state variable indicating whether a user wishes to log in vith Solid.
 */
const LogInSolid: React.FC<Props> = ({ setLoginWithSolid }) => {
  const [selectedProviderName, setSelectedProviderName] = useState('')

  const [providerUrl, setProviderUrl] = useState('')

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
    console.error(`Error while logging in: ${error.message}`)

    const alertMessage = `
      Login failed. Possible reasons include: 

      1. The Solid provider URL is invalid or incorrect. 
      2. You are not connected to the internet. 
      3. There may be an issue with the Solid provider.
    `

    alert(alertMessage)
  }

  /**
   * Returns an object's key by its associated value.
   */
  function getKeyByValue(targetObject: object, value: string) {
    return Object.keys(targetObject).find(
      (key) => targetObject[key as keyof typeof targetObject] === value,
    )
  }

  /**
   * Sets Solid provider URL state variable and changes current Select option if the URL is one of the listed providers'.
   */
  function handleOnProviderUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = e.target.value

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

  return (
    <Stack gap={3} className="fade-in">
      <span className="select-provider-heading">
        <FormattedMessage
          id="selectASolidProvider"
          defaultMessage="Select a Solid provider"
        />
      </span>

      <Form.Select
        value={selectedProviderName}
        onChange={(e) => handleSelectOnChange(e)}
        className="choose-solid-provider-element"
      >
        <option key="defaultOption" hidden>
          <FormattedMessage
            id="chooseSolidProvider"
            defaultMessage="Choose a Solid provider"
          />
        </option>

        {Object.keys(providerNameAndUrls).map((opt) => {
          return <option key={opt}>{opt}</option>
        })}
      </Form.Select>

      <span className="select-provider-heading-smaller">
        <FormattedMessage
          id="typeInProviderUrl"
          defaultMessage="Or type in a provider URL"
        />
      </span>

      <Form.Control
        type="text"
        placeholder="Place a provider URL"
        value={providerUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnProviderUrlChange(e)
        }
      />

      <LoginButton
        oidcIssuer={providerUrl}
        redirectUrl={new URL(
          import.meta.env.PROD
            ? '/solid-dietary-profile-editor/login'
            : '/login',
          window.location.origin,
        ).toString()}
        onError={(error) => {
          handleOnLoginError(error)
        }}
      >
        <Button className="solid-login-button w-100 choose-solid-provider-element mt-4">
          <FormattedMessage
            id="redirectToProvider"
            defaultMessage="Redirect to provider"
          />
        </Button>
      </LoginButton>

      <Button
        variant="secondary"
        className="choose-solid-provider-element w-100"
        onClick={() => {
          setLoginWithSolid(false)
        }}
      >
        <FormattedMessage id="goBack" defaultMessage="Back" />
      </Button>
    </Stack>
  )
}

export default LogInSolid
