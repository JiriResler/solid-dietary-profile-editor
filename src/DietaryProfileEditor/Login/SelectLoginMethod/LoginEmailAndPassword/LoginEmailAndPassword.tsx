import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Fade from '@mui/material/Fade'
import Stack from 'react-bootstrap/Stack'
import './LoginEmailAndPassword.css'
import CreateEmailAccount from '../CreateEmailAccount/CreateEmailAccount'
import LoginBackButton from '../LoginBackButton/LoginBackButton'
import isEmail from 'validator/lib/isEmail'
import ErrorModal from '../../../ErrorModal/ErrorModal'
import Spinner from 'react-bootstrap/Spinner'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../firebase'

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

  /**
   * Validates the login form and sends a sign-in request to Firebase.
   */
  function handleLoginFormOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoginInProgress(true)

    const formNotValid = !isEmail(loginEmail) || loginPassword === ''

    if (formNotValid) {
      const errorMessage = intl.formatMessage({
        id: 'loginCredentialsNotValid',
        defaultMessage:
          'The email you entered is invalid, or the password is missing. Please check your information and try again.',
      })

      setLoginErrorMessage(errorMessage)
      setLoginCausedError(true)

      setLoginInProgress(false)
      return
    }

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .catch((error: Error) => {
        console.error(error)
        const errorMessage = intl.formatMessage({
          id: 'emailLoginErrorMessage',
          defaultMessage:
            'The credentials you entered are incorrect. Please check your details and try again.',
        })

        setLoginErrorMessage(errorMessage)
        setLoginCausedError(true)
      })
      .finally(() => {
        setLoginInProgress(false)
      })
  }

  if (createNewAccount) {
    return <CreateEmailAccount setCreateNewAccount={setCreateNewAccount} />
  }

  return (
    <>
      <ErrorModal
        show={loginCausedError}
        setShow={setLoginCausedError}
        titleMessage={intl.formatMessage({
          id: 'loginFailed',
          defaultMessage: 'Login failed',
        })}
        bodyMessage={loginErrorMessage}
      />

      <Fade in={true} timeout={500}>
        <Stack
          gap={3}
          className="select-login-method-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
        >
          <LoginBackButton
            setParentComponentScreenState={setLoginWithEmailAndPassword}
          />

          <Form noValidate onSubmit={(e) => handleLoginFormOnSubmit(e)}>
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
                className="app-form-control"
              />

              <Form.Control
                type="password"
                placeholder={getPasswordInputPlaceholder()}
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value)
                }}
                className="app-form-control"
              />

              <Button
                type="submit"
                className="login-screen-button app-secondary-color-button"
              >
                {!loginInProgress ? (
                  <FormattedMessage id="signIn" defaultMessage="Sign in" />
                ) : (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
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
    </>
  )
}

export default LoginEmailAndPassword
