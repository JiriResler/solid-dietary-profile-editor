import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LogInSolid from './LogInSolid'
import Stack from 'react-bootstrap/Stack'
import ProviderComparisonModalWrapper from './ProviderComparisonModalWrapper'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

const SignInViaProvider: React.FC = () => {
  const [loginWithSolid, setLoginWithSolid] = useState(false)
  const [showMoreProviders, setShowMoreProviders] = useState(false)
  const [showProvidersModal, setShowProvidersModal] = useState(false)

  return (
    <>
      <ProviderComparisonModalWrapper
        showProvidersModal={showProvidersModal}
        setShowProvidersModal={setShowProvidersModal}
      />

      <Stack gap={3} className="sign-in-stack mt-4 text-center mx-auto">
        <h5>
          <FormattedMessage
            id="sign_in_via_provider"
            defaultMessage={'Please sign in via an identity provider'}
          />
        </h5>

        {!loginWithSolid && (
          <>
            <Button
              onClick={() => {
                setLoginWithSolid(true)
              }}
              className="solid-button text-start mx-auto"
            >
              <img
                src="images/logo_solid.svg"
                alt="Solid logo"
                className="provider-icon"
              />
              <span className="ms-3">Solid</span>
            </Button>

            <span
              onClick={() => {
                setShowMoreProviders(!showMoreProviders)
              }}
              className="show-more-providers mx-auto"
            >
              More providers {/* Chevron icon */}
              {!showMoreProviders && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              )}
              {showMoreProviders && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                  />
                </svg>
              )}
            </span>
          </>
        )}

        {loginWithSolid && (
          <>
            <LogInSolid setSolidLogin={setLoginWithSolid} />
          </>
        )}
      </Stack>

      {showMoreProviders && (
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
      )}
    </>
  )
}

export default SignInViaProvider
