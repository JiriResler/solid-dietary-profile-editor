import Button from 'react-bootstrap/Button'
import ProviderComparisonModalWrapper from './ProviderComparisonModalWrapper'
import LogInSolid from './LogInSolid'
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import './SelectProvider.css'
import TraditionalProviders from './TraditionalProviders'

const SelectProvider: React.FC = () => {
  const [loginWithSolid, setLoginWithSolid] = useState(false)

  const [showProvidersModal, setShowProvidersModal] = useState(false)

  return (
    <>
      <ProviderComparisonModalWrapper
        showProvidersModal={showProvidersModal}
        setShowProvidersModal={setShowProvidersModal}
      />

      <Stack gap={3} className="select-provider-stack mt-4 text-center mx-auto">
        <h5>
          <FormattedMessage
            id="sign_in_via_provider"
            defaultMessage={'Please sign in via an identity provider'}
          />
        </h5>

        {loginWithSolid && <LogInSolid setLoginWithSolid={setLoginWithSolid} />}

        {!loginWithSolid && (
          <>
            <Button
              onClick={() => {
                setLoginWithSolid(true)
              }}
              className="select-provider-button solid-button text-start mx-auto"
            >
              <img
                src="images/logo_solid.svg"
                alt="Solid logo"
                className="solid-icon"
              />
              <span className="ms-3">Solid</span>
            </Button>
            <hr />

            <TraditionalProviders />

            <div className="why-solid text-center mt-2">
              <span
                onClick={() => {
                  setShowProvidersModal(true)
                }}
              >
                Why use Solid?
              </span>
            </div>
          </>
        )}
      </Stack>
    </>
  )
}

export default SelectProvider
