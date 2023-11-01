import { Link } from 'react-router-dom'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { useState } from 'react'

function LogInEmail() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  //   const auth = getAuth()

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

  async function logOut() {
    try {
      await signOut(auth)
      alert('Log out successful')
    } catch {
      alert('Log out failed.')
    }
  }

  return (
    <div>
      <p>is logged in: {auth.currentUser !== null ? 'true' : 'false'}</p>
      <p>
        auth.currentUser is {auth.currentUser === null ? 'null' : 'not null'}
      </p>
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
      <button
        onClick={() => {
          void logOut()
        }}
      >
        Log out
      </button>
      <br />
      <Link to="/">Go back</Link>
    </div>
  )
}

export default LogInEmail
