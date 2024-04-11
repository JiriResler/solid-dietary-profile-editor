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

      <div className="select-provider-heading">Select an identity provider</div>

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

          <div className="why-solid ">
            <span
              onClick={() => {
                setShowProvidersModal(true)
              }}
            >
              What is Solid?
            </span>
          </div>

          <h2>
            <span>or</span>
          </h2>

          <TraditionalProviders />
        </>
      )}
    </>
  )
}

export default SelectProvider
