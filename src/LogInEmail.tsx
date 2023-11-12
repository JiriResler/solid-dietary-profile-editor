// import { auth } from './firebase'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { signOut } from 'firebase/auth'
import { useState } from 'react'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'

type Props = {
  setSelectedLoginMethod: React.Dispatch<React.SetStateAction<string>>
}

function LogInEmail({ setSelectedLoginMethod }: Props) {
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
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedLoginMethod('none')
            }}
          >
            <FormattedMessage id="go_back" defaultMessage={'Go back'} />
          </Button>
        </Stack>
      )}

      {signInState === 'password' && (
        <Stack gap={2} className="text-center">
          <h4>Sign in</h4>
          <Form>
            <Stack gap={2}>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="Email Address" />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput2">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Stack>
          </Form>
          <a href="/">Forgot Your Password</a>
          <Button>SIGN IN</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSignInState('email')
            }}
          >
            Back to email
          </Button>
        </Stack>
      )}
    </>
  )
}

export default LogInEmail
