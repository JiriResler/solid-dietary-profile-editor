import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import React from 'react'

const LoginEmailAndPassword: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('')

  const [loginPassword, setLoginPassword] = useState('')

  return (
    <>
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
        placeholder={'Password'}
        value={loginPassword}
        onChange={(e) => {
          setLoginPassword(e.target.value)
        }}
      />

      <Button>Login</Button>
    </>
  )
}

export default LoginEmailAndPassword
