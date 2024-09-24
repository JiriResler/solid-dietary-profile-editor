import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SelectSolidProvider from './SelectSolidProvider/SelectSolidProvider'
import { useState } from 'react'
import './SelectProvider.css'
import TraditionalProviders from '../TraditionalProviders'
import { FormattedMessage } from 'react-intl'
import Stack from 'react-bootstrap/Stack'

const SelectProvider: React.FC = () => {
  const [loginWithSolid, setLoginWithSolid] = useState(false)

  const [showSolidModal, setShowSolidModal] = useState(false)

  const solidDescriptionText = `
    Solid lets you control where your data is stored and who can access it. To get started, create a WebID with a Solid provider. You can also sign in using Google or Facebook, with your data stored on their servers. You can switch to Solid later without losing your data. Learn more on the Solid project website.
  `

  if (loginWithSolid) {
    return <SelectSolidProvider setLoginWithSolid={setLoginWithSolid} />
  }

  return (
    <>
      <Modal
        size="lg"
        centered
        show={showSolidModal}
        onHide={() => {
          setShowSolidModal(false)
        }}
      >
        <Modal.Body>
          <FormattedMessage
            id="solidDescription"
            defaultMessage={solidDescriptionText}
          />{' '}
          <br />
          <div className="mt-3 text-end">
            <Button
              variant="secondary"
              onClick={() => {
                setShowSolidModal(false)
              }}
            >
              <FormattedMessage id="closeModal" defaultMessage="Close" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Stack
        gap={3}
        className="select-provider-stack position-absolute top-50 start-50 translate-middle text-center"
      >
        <span className="select-provider-heading">
          <FormattedMessage
            id="selectIdentityProvider"
            defaultMessage="Select an identity provider"
          />
        </span>

        <Button
          onClick={() => {
            setLoginWithSolid(true)
          }}
          className="login-screen-button solid-button text-start"
        >
          <img
            src="images/logo_solid.svg"
            alt="Solid logo"
            className="solid-icon"
          />
          <span className="ms-3">
            <FormattedMessage
              id="signInWithSolid"
              defaultMessage="Sign in with Solid"
            />
          </span>
        </Button>

        <div
          onClick={() => {
            setShowSolidModal(true)
          }}
          className="clickable-text w-50 mt-1 mx-auto"
        >
          <FormattedMessage id="whatIsSolid" defaultMessage="What is Solid?" />
        </div>

        <div className="providers-divider">
          <span>
            <FormattedMessage id="signInDivider" defaultMessage="or" />
          </span>
        </div>

        <TraditionalProviders />
      </Stack>
    </>
  )
}

export default SelectProvider
