import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Fade from '@mui/material/Fade'
import Stack from 'react-bootstrap/Stack'

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

  return (
    <Fade in={true} timeout={500}>
      <Stack
        gap={3}
        className="select-login-method-stack position-absolute top-50 start-50 translate-middle text-center pb-1"
      >
        <Button
          className="login-screen-button w-100"
          variant="secondary"
          onClick={() => {
            setCreateNewAccount(false)
          }}
        >
          <FormattedMessage id="goBack" defaultMessage="Back" />
        </Button>
      </Stack>
    </Fade>
  )
}

export default CreateEmailAccount
