import Button from 'react-bootstrap/Button'
import ProviderComparisonModalWrapper from './ProviderComparisonModalWrapper'
import LogInSolid from './LogInSolid'
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react'
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

      <Stack gap={2} className="select-provider-stack text-center mx-auto">
        <div className='select-provider-heading'>Select an identity provider</div>

        {loginWithSolid && <LogInSolid setLoginWithSolid={setLoginWithSolid} />}

        {!loginWithSolid && (
          <>
            <Button
              onClick={() => {
                setLoginWithSolid(true)
              }}
              className="sign-with-solid-button text-start mx-auto"
            >
              <img
                src="images/logo_solid.svg"
                alt="Solid logo"
                className="solid-icon"
              />
              <span className="ms-3">Sign in with Solid</span>
            </Button>

            <div className="why-solid text-center">
              <span
                onClick={() => {
                  setShowProvidersModal(true)
                }}
              >
                What is Solid?
              </span>
            </div>

            <h2><span>or</span></h2>

            <TraditionalProviders />
          </>
        )}
      </Stack>
    </>
  )
}

export default SelectProvider
