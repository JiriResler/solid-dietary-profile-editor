import Button from 'react-bootstrap/Button'
import LogInSolid from './LogInSolid'
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import './SelectProvider.css'
import TraditionalProviders from './TraditionalProviders'

const SelectProvider: React.FC = () => {
  const [loginWithSolid, setLoginWithSolid] = useState(false)
  const [showMoreProviders, setShowMoreProviders] = useState(false)

  return (
    <>
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
                setShowMoreProviders(false)
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
              More providers
            </span>
          </>
        )}

        {loginWithSolid && <LogInSolid setSolidLogin={setLoginWithSolid} />}
      </Stack>

      {showMoreProviders && <TraditionalProviders />}
    </>
  )
}

export default SelectProvider
