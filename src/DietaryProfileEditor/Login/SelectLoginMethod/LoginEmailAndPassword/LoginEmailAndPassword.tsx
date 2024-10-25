import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Fade from '@mui/material/Fade'
import Stack from 'react-bootstrap/Stack'
import './LoginEmailAndPassword.css'
import CreateEmailAccount from './CreateEmailAccount/CreateEmailAccount'
import LoginBackButton from '../LoginBackButton/LoginBackButton'

type LoginEmailAndPasswordProps = {
  setLoginWithEmailAndPassword: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Enables a user to sign in or sign up using their email and password.
 * @param setLoginWithEmailAndPassword A function for setting the state variable for switching content on the login screen.
 */
const LoginEmailAndPassword: React.FC<LoginEmailAndPasswordProps> = ({
  setLoginWithEmailAndPassword,
}) => {
  const [loginEmail, setLoginEmail] = useState('')

  const [loginPassword, setLoginPassword] = useState('')

  const [createNewAccount, setCreateNewAccount] = useState(false)

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

  if (createNewAccount) {
    return <CreateEmailAccount setCreateNewAccount={setCreateNewAccount} />
  }

  return (
    <Fade in={true} timeout={500}>
      <Stack
        gap={3}
        className="select-login-method-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
      >
        <LoginBackButton
          setParentComponentScreenState={setLoginWithEmailAndPassword}
        />

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

        <Button className="login-screen-button email-and-password-button">
          <FormattedMessage id="signIn" defaultMessage="Sign in" />
        </Button>

        <div>
          <span>
            <FormattedMessage
              id="newAccount"
              defaultMessage="If you are new, you can also"
            />
          </span>
          <br />
          <span
            className="create-account-span mx-auto"
            onClick={() => setCreateNewAccount(true)}
          >
            <FormattedMessage
              id="createAccount"
              defaultMessage="Create an account"
            />
          </span>
        </div>
      </Stack>
    </Fade>
  )
}

export default LoginEmailAndPassword
