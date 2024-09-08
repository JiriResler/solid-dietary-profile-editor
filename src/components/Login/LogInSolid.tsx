import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginButton } from '@inrupt/solid-ui-react'
import { useState } from 'react'
import './LoginSolid.css'
import { FormattedMessage } from 'react-intl'
import Stack from 'react-bootstrap/Stack'

const solidIdProviders: string[] = [
  'Inrupt Pod Spaces',
  'Data Pod',
  'solidcommunity.net',
  'solidweb.org',
  'redpencil.io',
]

type Props = {
  setLoginWithSolid: React.Dispatch<React.SetStateAction<boolean>>
}

const LogInSolid: React.FC<Props> = ({ setLoginWithSolid }) => {
  const identityProviders: string[] = solidIdProviders

  const [selectedOption, setSelectedOption] = useState('')

  return (
    <Stack gap={3} className="fade-in">
      <span className="select-provider-heading">
        <FormattedMessage
          id="selectASolidProvider"
          defaultMessage="Select a Solid provider"
        />
      </span>

      <Form.Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="choose-solid-provider-element"
      >
        <option key="defaultOption" hidden>
          <FormattedMessage
            id="chooseSolidProvider"
            defaultMessage="Choose a Solid provider"
          />
        </option>
        {identityProviders.map((opt) => {
          return <option key={opt}>{opt}</option>
        })}
      </Form.Select>

      <span className="select-provider-heading-smaller">
        <FormattedMessage
          id="typeInProviderUrl"
          defaultMessage="Or type in a provider URL"
        />
      </span>

      <Form.Control type="text" placeholder="Place a provider URL" />

      <LoginButton
        oidcIssuer={selectedOption}
        redirectUrl={new URL(
          import.meta.env.PROD
            ? '/solid-dietary-profile-editor/login'
            : '/login',
          window.location.origin,
        ).toString()}
        onError={console.error}
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
