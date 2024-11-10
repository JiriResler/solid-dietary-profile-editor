import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Fade from '@mui/material/Fade'
import Stack from 'react-bootstrap/Stack'
import LoginBackButton from '../../LoginBackButton/LoginBackButton'
import './CreateEmailAccount.css'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../../firebase'
import Spinner from 'react-bootstrap/Spinner'
import ErrorModal from '../../../../ErrorModal/ErrorModal'

type CreateEmailAccountProps = {
  setCreateNewAccount: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Allows the user to create a new email account.
 * @param setCreateNewAccount A function for setting the state variable for switching content on the login screen.
 */
const CreateEmailAccount: React.FC<CreateEmailAccountProps> = ({
  setCreateNewAccount,
}) => {
  const intl = useIntl()

  const [signUpInProgress, setSignUpInProgress] = useState(false)

  const [signUpCausedError, setSignUpCausedError] = useState(false)

  const [signUpErrorMessage, setSignUpErrorMessage] = useState('')

  const [userEmail, setUserEmail] = useState('')

  const [userEmailIsValid, setUserEmailIsValid] = useState(false)

  const [userEmailValidated, setUserEmailValidated] = useState(false)

  const [userEmailTextFieldTouched, setUserEmailTextFieldTouched] =
    useState(false)

  const [userPassword, setUserPassword] = useState('')

  const [userPasswordIsValid, setUserPasswordIsValid] = useState(false)

  const [userPasswordTextFieldTouched, setUserPasswordTextFieldTouched] =
    useState(false)

  /**
   * Returns the placeholder for the new user password input.
   */
  function getNewPasswordInputPlaceholder() {
    return intl.formatMessage({
      id: 'password',
      defaultMessage: 'Password',
    })
  }

  /**
   * Validates user email and marks it as validated so that appropriate styles can be applied.
   */
  function validateUserEmail(email: string) {
    const emailValid = isEmail(email)

    if (emailValid) {
      setUserEmailIsValid(true)
    } else {
      setUserEmailIsValid(false)
    }

    setUserEmailValidated(true)
  }

  /**
   * Runs password validation and sets component state variables.
   * @param newPassword Currently typed in password.
   */
  function handlePasswordOnChange(newPassword: string) {
    const passwordValid = isStrongPassword(newPassword, { minSymbols: 0 })

    if (passwordValid) {
      setUserPasswordIsValid(true)
    } else {
      setUserPasswordIsValid(false)
    }

    setUserPassword(newPassword)
    setUserPasswordTextFieldTouched(true)
  }

  /**
   * Calls the email validation function and marks email input field as touched.
   */
  function handleEmailOnBlur() {
    validateUserEmail(userEmail)
    setUserEmailTextFieldTouched(true)
  }

  /**
   * Sets the user email state variable and validates it if the input field has been touched.
   * @param newEmail Newly entered email string.
   */
  function handleEmailOnChange(newEmail: string) {
    if (userEmailTextFieldTouched) {
      validateUserEmail(newEmail)
    }

    setUserEmail(newEmail)
  }

  /**
   * Validates the new account form and sends a request to Firebase.
   */
  function handleNewAccountFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setSignUpInProgress(true)

    const formNotValid =
      !isEmail(userEmail) || !isStrongPassword(userPassword, { minSymbols: 0 })

    if (formNotValid) {
      const errorMessage = intl.formatMessage({
        id: 'emailOrPasswordInvalid',
        defaultMessage:
          'The email or password you entered is incorrect. Please check your details and try again.',
      })

      setSignUpErrorMessage(errorMessage)
      setSignUpCausedError(true)

      setSignUpInProgress(false)
      return
    }

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .catch((error: Error) => {
        console.error(error)

        let errorMessage

        if (error.message.includes('auth/email-already-in-use')) {
          errorMessage = intl.formatMessage({
            id: 'signUpEmailInUse',
            defaultMessage:
              'The email address you entered is already in use. Please choose a different one.',
          })
        } else {
          errorMessage = intl.formatMessage({
            id: 'singUpDefaultErrorMessage',
            defaultMessage:
              'There was an error during sign-up. Please check your internet connection and try again.',
          })
        }

        setSignUpErrorMessage(errorMessage)
        setSignUpCausedError(true)
      })
      .finally(() => {
        setSignUpInProgress(false)
      })
  }

  return (
    <>
      <ErrorModal
        show={signUpCausedError}
        setShow={setSignUpCausedError}
        titleMessage={intl.formatMessage({
          id: 'signUpFailed',
          defaultMessage: 'Sign up failed',
        })}
        bodyMessage={signUpErrorMessage}
      />

      <Fade in={true} timeout={500}>
        <Stack
          gap={3}
          className="select-login-method-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
        >
          <LoginBackButton
            setParentComponentScreenState={setCreateNewAccount}
          />

          <span className="select-login-method-heading">
            <FormattedMessage
              id="createYourAccount"
              defaultMessage="Create an email account"
            />
          </span>

          <Form noValidate onSubmit={(e) => handleNewAccountFormSubmit(e)}>
            <Form.Group className="mb-3" controlId="createAccountEmail">
              <Form.Control
                type="email"
                required
                placeholder={'Email'}
                value={userEmail}
                onChange={(e) => handleEmailOnChange(e.target.value)}
                onBlur={() => handleEmailOnBlur()}
                isInvalid={!userEmailIsValid && userEmailValidated}
              />

              <Form.Control.Feedback type="invalid" className="text-start ms-2">
                <FormattedMessage
                  id="provideValidEmail"
                  defaultMessage="Provide a valid email address"
                />
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="createAccountPassword">
              <Form.Control
                type="password"
                required
                placeholder={getNewPasswordInputPlaceholder()}
                value={userPassword}
                onChange={(e) => {
                  handlePasswordOnChange(e.target.value)
                }}
                isInvalid={userPasswordTextFieldTouched && !userPasswordIsValid}
              />

              <div className="password-requirements-text mt-1 text-start ms-2">
                <FormattedMessage
                  id="passwordMustContain"
                  defaultMessage="A password must contain"
                />

                <ul>
                  <li>
                    <FormattedMessage
                      id="atLeastEightChars"
                      defaultMessage="At least 8 characters"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="lowerCaseLetter"
                      defaultMessage="A lower case letter"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="upperCaseLetter"
                      defaultMessage="An upper case letter"
                    />
                  </li>
                  <li>
                    <FormattedMessage id="number" defaultMessage="A number" />
                  </li>
                </ul>
              </div>
            </Form.Group>

            <Button
              className="login-screen-button email-and-password-button w-100"
              type="submit"
            >
              {!signUpInProgress ? (
                <FormattedMessage id="signUp" defaultMessage="Sign up" />
              ) : (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Button>
          </Form>
        </Stack>
      </Fade>
    </>
  )
}

export default CreateEmailAccount
