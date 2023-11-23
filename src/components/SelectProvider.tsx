import Button from 'react-bootstrap/Button'
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

  return (
    <>
      <Stack gap={3} className="sign-in-stack mt-4 text-center mx-auto">
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
                setSelectedProvider(IdentityProvider.TRADITIONAL)
              }}
              className="show-more-providers mx-auto"
            >
              Other providers
            </span>
          </>
        )}

        {selectedProvider === IdentityProvider.SOLID && (
          <LogInSolid setSelectedProvider={setSelectedProvider} />
        )}
      </Stack>

      {selectedProvider === IdentityProvider.TRADITIONAL && (
        <TraditionalProviders />
      )}
    </>
  )
}

export default SelectProvider
