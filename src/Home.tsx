// import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function Home() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')

  const signupWithUsernameAndPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()

    if (signUpPassword === signUpConfirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        console.log('Sign up succesfull')
      } catch {
        console.log('Email must be valid and password at lesat 6 chars long')
      }
    } else {
      console.log("Passwords don't match. Please try again.")
    }
  }

  const loginWithUsernameAndPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      console.log('Login succesfull')
    } catch {
      console.log('You entered a wrong username or password.')
    }
  }

  return (
    <div>
      {/* <h1>This is the home page</h1>
      <Link to="about">Click to view our about page</Link> */}
      <h1>Create a new profile</h1>
      <form>
        <input
          type="email"
          placeholder="Your email"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Repeat password"
          value={signUpConfirmPassword}
          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
        ></input>
        <button
          type="submit"
          onClick={(e) => void signupWithUsernameAndPassword(e)}
        >
          Create profile
        </button>
      </form>

      <h1>Log in</h1>
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
    </div>
  )
}

export default Home
