// import { auth } from './firebase'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { signOut } from 'firebase/auth'
import { useState } from 'react'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function LogInEmail() {
  const [signInState, setSignInState] = useState('email')

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
    <>
      {signInState === 'email' && (
        <Stack gap={3} className="text-center">
          <h4>Sign In or Sign Up</h4>
          <Form>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="Email Address" />
            </Form.Group>
          </Form>

          <Button
            onClick={() => {
              setSignInState('password')
            }}
          >
            CONTINUE
          </Button>
          <span>or</span>
          <div>
            G <button>Sign in with Google</button>
          </div>
          <div>
            F <button>Sign in with Facebook</button>
          </div>
        </Stack>
      )}

      {signInState === 'password' && (
        <div>
          <h4>Sign in</h4>
          <input placeholder="Email address"></input>
          <input placeholder="Password"></input>
          <p>Forgot Your Password</p>
          <button>SIGN IN</button> <br />
          <button
            onClick={() => {
              setSignInState('email')
            }}
          >
            Back to email
          </button>
        </div>
      )}
    </>
  )
}

export default LogInEmail
