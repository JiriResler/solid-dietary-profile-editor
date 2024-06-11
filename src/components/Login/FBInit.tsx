/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react'

const mdbreact = require('../../utils/FacebookSDK')
const { getFacebookLoginStatus, initFacebookSdk, fbLogin } = mdbreact

export default function FBInit() {
  useEffect(() => {
    console.log('Started use effect')
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response: null) => {
        if (response == null) {
          console.log('No login status for the person')
        } else {
          console.log(response)
        }
      })
    })
  }, [])

  function login() {
    console.log('reached log in button')
    fbLogin().then((response: { status: string }) => {
      console.log(response)
      if (response.status === 'connected') {
        console.log('Person is connected')
      } else {
        // something
      }
    })
  }

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  )
}
