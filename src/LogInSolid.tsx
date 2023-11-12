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

type Props = {
  setSelectedLoginMethod: React.Dispatch<React.SetStateAction<string>>
}

const LogInSolid: React.FC<Props> = ({ setSelectedLoginMethod }) => {
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
    <Stack gap={3} className="text-center">
      <Row>
        <Col>
          <h5>
            <FormattedMessage
              id="select_id_provider"
              defaultMessage={'Select your identity provider'}
            />
          </h5>
        </Col>
      </Row>

      <Row className="mx-auto">
        <Col xs={12} md={9}>
          <Form.Select
            className="select-provider mx-auto"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {identityProviders.map((opt) => {
              return <option key={opt}>{opt}</option>
            })}
          </Form.Select>
        </Col>

        <Col md={3} className="solid-button-login-redirect">
          <LoginButton
            oidcIssuer={selectedOption}
            redirectUrl={
              window.location.origin +
              (import.meta.env.PROD ? '/solid-dietary-profile-editor/' : '')
            }
          >
            <Button className="login-solid-button">
              <FormattedMessage id="log_in" defaultMessage={'Log in'} />
            </Button>
          </LoginButton>
        </Col>
      </Row>

      <Button
        variant="secondary"
        className="mt-4 back-button"
        onClick={() => {
          setSelectedLoginMethod('none')
        }}
      >
        <FormattedMessage id="go_back" defaultMessage={'Back'} />
      </Button>
    </Stack>
  )
}

export default LogInSolid
