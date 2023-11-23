import './TraditionalProviders.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import IdentityProvider from './IdentityProviderEnum'
import { FormattedMessage } from 'react-intl'

type Props = {
  setSelectedProvider: React.Dispatch<React.SetStateAction<IdentityProvider>>
}

const TraditionalProviders: React.FC<Props> = ({ setSelectedProvider }) => {
  return (
    <div className="more-providers mt-3">
      <Row className="">
        <Col>
          <Button className="provider-button facebook-button">
            <img
              src="images/facebook_round_white_icon.svg"
              alt="Facebook logo"
              className="provider-icon"
            />
          </Button>
        </Col>

        <Col>
          <Button className="provider-button google-button">
            <img
              src="images/google_g_logo.svg"
              alt="Google logo"
              className="provider-icon"
            />
          </Button>
        </Col>

        <Col>
          <Button className="provider-button apple-button">
            <img
              src="images/apple_logo_white.svg"
              alt="Apple logo"
              className="provider-icon"
            />
          </Button>
        </Col>
      </Row>
      <div>
        <Button
          variant="secondary"
          className="mt-5"
          onClick={() => {
            setSelectedProvider(IdentityProvider.NONE)
          }}
        >
          <FormattedMessage id="go_back" defaultMessage={'Back to Solid'} />
        </Button>
      </div>
    </div>
  )
}

export default TraditionalProviders
