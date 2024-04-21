import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginButton } from '@inrupt/solid-ui-react'
import { useState } from 'react'
import './LoginSolid.css'

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
        className='solid-provider-detail-element mb-4'
      >
        {identityProviders.map((opt) => {
          return <option key={opt}>{opt}</option>
        })}
      </Form.Select>

      <LoginButton
        oidcIssuer={selectedOption}
        redirectUrl={
          window.location.origin +
          (import.meta.env.PROD ? '/solid-dietary-profile-editor/' : '')
        }
      >
        <Button className="solid-login-button w-100 solid-provider-detail-element">
          Redirect to provider
        </Button>
      </LoginButton>

      <Button
        variant="secondary"
        className='solid-provider-detail-element w-100 mt-3'
        onClick={() => {
          setLoginWithSolid(false)
        }}
      >
        Back
      </Button>
    </div>
  )
}

export default LogInSolid
