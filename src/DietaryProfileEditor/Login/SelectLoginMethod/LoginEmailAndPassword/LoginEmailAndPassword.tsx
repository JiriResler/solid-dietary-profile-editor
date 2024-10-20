import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Fade from '@mui/material/Fade'
import Stack from 'react-bootstrap/Stack'

type LoginEmailAndPasswordProps = {
  setLoginWithEmailAndPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginEmailAndPassword: React.FC<LoginEmailAndPasswordProps> = ({
  setLoginWithEmailAndPassword,
}) => {
  const [loginEmail, setLoginEmail] = useState('')

  const [loginPassword, setLoginPassword] = useState('')

  const intl = useIntl()

  /**
   * Returns the placeholder for the user password input.
   */
  function getPasswordInputPlaceholder() {
    return intl.formatMessage({
      id: 'password',
      defaultMessage: 'Password',
    })
  }

  return (
    <Fade in={true} timeout={500}>
      <Stack
        gap={3}
        className="select-login-method-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
      >
        <span className="select-login-method-heading">
          <FormattedMessage
            id="loginWithEmail"
            defaultMessage="Sign in with your email"
          />
        </span>

        <Form.Control
          type="text"
          placeholder={'Email'}
          value={loginEmail}
          onChange={(e) => {
            setLoginEmail(e.target.value)
          }}
        />

        <Form.Control
          type="password"
          placeholder={getPasswordInputPlaceholder()}
          value={loginPassword}
          onChange={(e) => {
            setLoginPassword(e.target.value)
          }}
        />

        <Button>Login</Button>
        <Button
          className="login-screen-button w-100"
          variant="secondary"
          onClick={() => {
            setLoginWithEmailAndPassword(false)
          }}
        >
          <FormattedMessage id="goBack" defaultMessage="Back" />
        </Button>
      </Stack>
    </Fade>
  )
}

export default LoginEmailAndPassword
