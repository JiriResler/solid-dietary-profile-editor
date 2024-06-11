/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export const initFacebookSdk = () => {
  return new Promise((resolve) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '3665987363684602',
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      })
      // Resolve the promise when the SDK is loaded
      resolve()
    }
  })
}

export const getFacebookLoginStatus = () => {
  return new Promise((resolve) => {
    window.FB.getLoginStatus((response) => {
      resolve(response)
    })
  })
}

export const fbLogin = () => {
  return new Promise((resolve) => {
    window.FB.login((response) => {
      resolve(response)
    })
  })
}
