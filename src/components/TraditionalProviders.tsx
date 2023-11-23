import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ProviderComparisonModalWrapper from './ProviderComparisonModalWrapper'

const TraditionalProviders: React.FC = () => {
  const [showProvidersModal, setShowProvidersModal] = useState(false)

  return (
    <>
      <ProviderComparisonModalWrapper
        showProvidersModal={showProvidersModal}
        setShowProvidersModal={setShowProvidersModal}
      />

      <div className="more-providers mt-3 mx-auto">
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

        <div className="how-to-choose-provider text-center mt-3">
          <span
            onClick={() => {
              setShowProvidersModal(true)
            }}
          >
            Which provider to choose?
          </span>
        </div>
      </div>
    </>
  )
}

export default TraditionalProviders
