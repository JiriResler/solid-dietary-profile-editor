import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Fade from '@mui/material/Fade'
import Stack from 'react-bootstrap/Stack'
import LoginBackButton from '../../LoginBackButton/LoginBackButton'

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

  const [newPassword, setNewPassword] = useState('')

  const [repeatNewPassword, setRepeatNewPassword] = useState('')

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
   * Returns the placeholder for the repeat user password input.
   */
  function getRepeatPasswordInputPlaceholder() {
    return intl.formatMessage({
      id: 'repeatPassword',
      defaultMessage: 'Repeat password',
    })
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
            defaultMessage="Create a new account"
          />
        </span>

        <Form.Control
          type="text"
          placeholder={'Email'}
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value)
          }}
        />

        <Form.Control
          type="password"
          placeholder={getNewPasswordInputPlaceholder()}
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value)
          }}
        />

        <Form.Control
          type="password"
          placeholder={getRepeatPasswordInputPlaceholder()}
          value={repeatNewPassword}
          onChange={(e) => {
            setRepeatNewPassword(e.target.value)
          }}
        />

        <Button className="login-screen-button email-and-password-button">
          <FormattedMessage id="signUp" defaultMessage="Sign up" />
        </Button>
      </Stack>
    </Fade>
  )
}

export default CreateEmailAccount
