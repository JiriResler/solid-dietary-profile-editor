import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LoginButton } from '@inrupt/solid-ui-react'
import { useState } from 'react'
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'
import { FormattedMessage } from 'react-intl'

// const solidIdProviders: string[] = [
//   'https://solidcommunity.net/',
//   'https://login.inrupt.com/',
//   'https://inrupt.net/',
//   'https://solidweb.org/',
// ]

const solidIdProviders: string[] = [
  'solidcommunity.net',
  'inrupt.com (PodSpaces)',
  'inrupt.net',
  'solidweb.org',
]

const LogInSolid: React.FC = () => {
  useEffect(() => {
    async function fetchData() {
      await handleIncomingRedirect({
        restorePreviousSession: true,
      })
    }

    fetchData()
      .then(() => {
        console.log('handleIncomingRedirect()')
      })
      .catch(() => 'obligatory catch')
  }, [])

  const identityProviders: string[] = solidIdProviders

  const [selectedOption, setSelectedOption] = useState(
    'Select an identity provider',
  )

  return (
    <Stack gap={2} className="text-center">
      <Row>
        <Col>
          <h4>
            <FormattedMessage
              id="select_id_provider"
              defaultMessage={'Select your identity provider'}
            />
          </h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Select
            size="lg"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {identityProviders.map((opt) => {
              return <option key={opt}>{opt}</option>
            })}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col>
          <LoginButton
            oidcIssuer={selectedOption}
            redirectUrl={
              window.location.origin +
              (import.meta.env.PROD ? '/solid-dietary-profile-editor/' : '')
            }
          >
            <Button size="lg" className="login-solid-button">
              <FormattedMessage id="log_in" defaultMessage={'Log in'} />
            </Button>
          </LoginButton>
        </Col>
      </Row>
    </Stack>
  )
}

export default LogInSolid
