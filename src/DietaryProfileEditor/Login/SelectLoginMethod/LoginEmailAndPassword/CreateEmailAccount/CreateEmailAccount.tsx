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
  const [userEmail, setUserEmail] = useState('')

  const [userEmailIsValid, setUserEmailIsValid] = useState(false)

  const [userEmailValidated, setUserEmailValidated] = useState(false)

  const [userEmailTextFieldTouched, setUserEmailTextFieldTouched] =
    useState(false)

  const [userPassword, setUserPassword] = useState('')

  const [userPasswordIsValid, setUserPasswordIsValid] = useState(false)

  const [userPasswordTextFieldTouched, setUserPasswordTextFieldTouched] =
    useState(false)

  const intl = useIntl()

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
    const passwordValid = isStrongPassword(newPassword)

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

  return (
    <Fade in={true} timeout={500}>
      <Stack
        gap={3}
        className="select-login-method-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
      >
        <LoginBackButton setParentComponentScreenState={setCreateNewAccount} />

        <span className="select-login-method-heading">
          <FormattedMessage
            id="createYourAccount"
            defaultMessage="Create an email account"
          />
        </span>

        <Form noValidate>
          <Form.Group className="mb-3" controlId="createAccountEmail">
            <Form.Control
              type="email"
              className="login-form-control"
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
              className="login-form-control"
              required
              placeholder={getNewPasswordInputPlaceholder()}
              value={userPassword}
              onChange={(e) => {
                handlePasswordOnChange(e.target.value)
              }}
              isInvalid={userPasswordTextFieldTouched && !userPasswordIsValid}
            />

            <div className="password-requirements mt-1 text-start ms-2">
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
            <FormattedMessage id="signUp" defaultMessage="Sign up" />
          </Button>
        </Form>
      </Stack>
    </Fade>
  )
}

export default CreateEmailAccount
