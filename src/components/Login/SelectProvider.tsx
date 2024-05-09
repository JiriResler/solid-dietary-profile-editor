import Button from 'react-bootstrap/Button'
import ProviderComparisonModalWrapper from './ProviderComparisonModalWrapper'
import LogInSolid from './LogInSolid'
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

      <span className="select-provider-heading">
        Select an identity provider
      </span>

      {loginWithSolid && <LogInSolid setLoginWithSolid={setLoginWithSolid} />}

      {!loginWithSolid && (
        <>
          <Button
            onClick={() => {
              setLoginWithSolid(true)
            }}
            className="provider-button solid-button text-start"
          >
            <img
              src="images/logo_solid.svg"
              alt="Solid logo"
              className="solid-icon"
            />
            <span className="ms-3">Sign in with Solid</span>
          </Button>

          <div
            onClick={() => {
              setShowProvidersModal(true)
            }}
            className="clickable-text w-50 mt-1 mx-auto"
          >
            What is Solid?
          </div>

          <div className="providers-divider">
            <span>or</span>
          </div>

          <TraditionalProviders />
        </>
      )}
    </>
  )
}

export default SelectProvider
