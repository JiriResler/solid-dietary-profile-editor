// import { auth } from './firebase'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { signOut } from 'firebase/auth'
// import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

function LogInEmail() {
  // const [loginEmail, setLoginEmail] = useState('new.profile@gmail.com')
  // const [loginPassword, setLoginPassword] = useState('123456')

  //   const auth = getAuth()

  // const loginWithUsernameAndPassword = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   e.preventDefault()
  //   try {
  //     await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  //     alert('Login successful')
  //   } catch {
  //     alert('You entered a wrong username or password.')
  //   }
  // }

  // async function logOut() {
  //   try {
  //     await signOut(auth)
  //     alert('Log out successful')
  //   } catch {
  //     alert('Log out failed.')
  //   }
  // }

  return (
    <Stack gap={3} className="text-center">
      <h4>Sign In or Sign Up</h4>
      <input placeholder="Email Address"></input>
      <button>CONTINUE</button>
      <span>or</span>
      <div>
        G <button>Sign in with Google</button>
      </div>
      <div>
        F <button>Sign in with Facebook</button>
      </div>
    </Stack>
  )
}

export default LogInEmail
