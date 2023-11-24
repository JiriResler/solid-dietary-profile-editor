import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginButton } from '@inrupt/solid-ui-react'
import { useState } from 'react'
// import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
// import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import './LoginSolid.css'
import { useSession } from '@inrupt/solid-ui-react'

const solidIdProviders: string[] = [
  'https://solidcommunity.net/',
  'https://login.inrupt.com/',
  'https://inrupt.net/',
  'https://solidweb.org/',
]

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
  const { session } = useSession()

  // useEffect(() => {
  //   async function fetchData() {
  //     await handleIncomingRedirect({
  //       restorePreviousSession: true,
  //     })
  //   }

  //   fetchData()
  //     .then(() => {
  //       console.log('handleIncomingRedirect()')
  //     })
  //     .catch(() => 'obligatory catch')
  // }, [])

  const identityProviders: string[] = solidIdProviders

  const [selectedOption, setSelectedOption] = useState(solidIdProviders[0])

  return (
    <div className="fade-in">
      <p>{session.info.isLoggedIn ? 'logged in' : 'logged out'}</p>
      <Row>
        <Col xs={12} md={9}>
          <Form.Select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {identityProviders.map((opt) => {
              return <option key={opt}>{opt}</option>
            })}
          </Form.Select>
        </Col>

        <Col md={3} className="mt-4">
          <LoginButton
            oidcIssuer={selectedOption}
            redirectUrl={
              window.location.origin +
              (import.meta.env.PROD ? '/solid-dietary-profile-editor/' : '')
            }
          >
            <Button className="solid-login-button">
              <FormattedMessage id="log_in" defaultMessage={'Log in'} />
            </Button>
          </LoginButton>
        </Col>
      </Row>

      <div className="text-start mt-3">
        <Button
          variant="secondary"
          className="back-button mt-4"
          onClick={() => {
            setLoginWithSolid(false)
          }}
        >
          <FormattedMessage id="go_back" defaultMessage={'Back'} />
        </Button>
      </div>
    </div>
  )
}

export default LogInSolid
