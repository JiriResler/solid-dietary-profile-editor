import Button from 'react-bootstrap/Button'
import ProviderComparisonModalWrapper from './ProviderComparisonModalWrapper'
import LogInSolid from './LogInSolid'
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import './SelectProvider.css'
import TraditionalProviders from './TraditionalProviders'
import IdentityProvider from './IdentityProviderEnum'

const SelectProvider: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<IdentityProvider>(
    IdentityProvider.NONE,
  )

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

        {selectedProvider === IdentityProvider.NONE && (
          <>
            <Button
              onClick={() => {
                setSelectedProvider(IdentityProvider.SOLID)
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

            <Button
              onClick={() => {
                setSelectedProvider(IdentityProvider.TRADITIONAL)
              }}
              className="select-provider-button mt-2 mx-auto"
            >
              Other providers
            </Button>

            <div className="how-to-choose-provider text-center mt-2">
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

        {selectedProvider === IdentityProvider.SOLID && (
          <LogInSolid setSelectedProvider={setSelectedProvider} />
        )}

        {selectedProvider === IdentityProvider.TRADITIONAL && (
          <TraditionalProviders setSelectedProvider={setSelectedProvider} />
        )}
      </Stack>
    </>
  )
}

export default SelectProvider
