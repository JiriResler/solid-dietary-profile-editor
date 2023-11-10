import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { useState } from 'react'

function LogInEmail() {
  const [loginEmail, setLoginEmail] = useState('new.profile@gmail.com')
  const [loginPassword, setLoginPassword] = useState('123456')

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
      <h1>Sign In or Sign Up</h1>
      <input placeholder="Email Address"></input>
      <button>CONTINUE</button>
      <p>or</p>
      <hr></hr>G <button>Sign in with Google</button> <br />F{' '}
      <button>Sign in with Facebook</button>
    </div>
  )
}

export default LogInEmail
