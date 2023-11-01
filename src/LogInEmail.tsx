import { Link } from 'react-router-dom'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'

function LogInEmail() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const loginWithUsernameAndPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      alert('Login successful')
    } catch {
      alert('You entered a wrong username or password.')
    }
  }

  return (
    <div>
      <h1>Log in with email and password</h1>
      <form>
        <input
          type="email"
          placeholder="Your email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        ></input>
        <button
          type="submit"
          onClick={(e) => void loginWithUsernameAndPassword(e)}
        >
          Log in
        </button>
      </form>
      <br />
      <Link to="/">Go back</Link>
    </div>
  )
}

export default LogInEmail
