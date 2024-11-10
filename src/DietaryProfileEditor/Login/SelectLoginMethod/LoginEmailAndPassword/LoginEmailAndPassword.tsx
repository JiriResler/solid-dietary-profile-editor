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
import isEmail from 'validator/lib/isEmail'

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
  const [createNewAccount, setCreateNewAccount] = useState(false)

  const intl = useIntl()

  const [loginInProgress, setLoginInProgress] = useState(false)

  const [loginCausedError, setLoginCausedError] = useState(false)

  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const [loginEmail, setLoginEmail] = useState('')

  const [loginEmailIsValid, setLoginEmailIsValid] = useState(false)

  const [loginEmailValidated, setLoginEmailValidated] = useState(false)

  const [loginEmailTextFieldTouched, setLoginEmailTextFieldTouched] =
    useState(false)

  const [loginPassword, setLoginPassword] = useState('')

  /**
   * Returns the placeholder for the user password input.
   */
  function getPasswordInputPlaceholder() {
    return intl.formatMessage({
      id: 'password',
      defaultMessage: 'Password',
    })
  }

  /**
   * Validates user email and marks it as validated so that appropriate styles can be applied.
   */
  function validateLoginEmail(email: string) {
    const emailValid = isEmail(email)

    if (emailValid) {
      setLoginEmailIsValid(true)
    } else {
      setLoginEmailIsValid(false)
    }

    setLoginEmailValidated(true)
  }

  /**
   * Calls the email validation function and marks email input field as touched.
   */
  function handleEmailOnBlur() {
    validateLoginEmail(loginEmail)
    setLoginEmailTextFieldTouched(true)
  }

  /**
   * Sets the user email state variable and validates it if the input field has been touched.
   * @param newEmail Newly entered email string.
   */
  function handleEmailOnChange(newEmail: string) {
    if (loginEmailTextFieldTouched) {
      validateLoginEmail(newEmail)
    }

    setLoginEmail(newEmail)
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

        <Form noValidate>
          <Stack gap={3}>
            <span className="select-login-method-heading">
              <FormattedMessage
                id="loginWithEmail"
                defaultMessage="Sign in with your email"
              />
            </span>

            <Form.Control
              type="email"
              placeholder={'Email'}
              onBlur={() => handleEmailOnBlur()}
              value={loginEmail}
              isInvalid={!loginEmailIsValid && loginEmailValidated}
              onChange={(e) => handleEmailOnChange(e.target.value)}
            />

            <Form.Control
              type="password"
              placeholder={getPasswordInputPlaceholder()}
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value)
              }}
            />

            <Button
              type="submit"
              className="login-screen-button email-and-password-button"
            >
              <FormattedMessage id="signIn" defaultMessage="Sign in" />
            </Button>
          </Stack>
        </Form>

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
