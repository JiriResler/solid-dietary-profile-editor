import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginButton } from '@inrupt/solid-ui-react'
import { useState } from 'react'
import './LoginSolid.css'
import { FormattedMessage } from 'react-intl'

const solidIdProviders: string[] = [
  'https://solidcommunity.net/',
  'https://login.inrupt.com/',
  'https://inrupt.net/',
  'https://solidweb.org/',
]

// todo Make provider urls prettier - names instead of full urls

// const solidIdProviders: string[] = [
//   'solidcommunity.net',
//   'inrupt.com (PodSpaces)',
//   'inrupt.net',
//   'solidweb.org',
// ]

type Props = {
  setLoginWithSolid: React.Dispatch<React.SetStateAction<boolean>>
}

const LogInSolid: React.FC<Props> = ({ setLoginWithSolid }) => {
  const identityProviders: string[] = solidIdProviders

  const [selectedOption, setSelectedOption] = useState(solidIdProviders[0])

  return (
    <div className="fade-in">
      <Form.Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="choose-solid-provider-element mb-4"
      >
        {identityProviders.map((opt) => {
          return <option key={opt}>{opt}</option>
        })}
      </Form.Select>

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
        <Button className="solid-login-button w-100 choose-solid-provider-element">
          <FormattedMessage
            id="redirectToProvider"
            defaultMessage="Redirect to provider"
          />
        </Button>
      </LoginButton>

      <Button
        variant="secondary"
        className="choose-solid-provider-element w-100 mt-3"
        onClick={() => {
          setLoginWithSolid(false)
        }}
      >
        <FormattedMessage id="goBack" defaultMessage="Back" />
      </Button>
    </div>
  )
}

export default LogInSolid
