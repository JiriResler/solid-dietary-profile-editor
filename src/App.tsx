import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { useSession, LoginButton, LogoutButton } from '@inrupt/solid-ui-react'

function App() {
  const { session } = useSession()

  const identityProviders = [
    'https://solidcommunity.net/',
    'https://login.inrupt.com/',
    'https://inrupt.net/',
    'https://solidweb.org/',
  ]

  const [selectedProvider, setSelectedProvider] = useState(identityProviders[0])

  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>GH Pages deployment test</h1>
              <div>
                isLoggedIn: {session.info.isLoggedIn == true ? 'true' : 'false'}
              </div>
              <br />
              <div>
                Your webID:{' '}
                {session.info.isLoggedIn == true
                  ? session.info.webId
                  : 'Log in to see your WebID'}
              </div>
              <br />
              <div>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                >
                  {identityProviders.map((providerUrl) => {
                    return <option key={providerUrl}>{providerUrl}</option>
                  })}
                </select>{' '}
                <LoginButton
                  oidcIssuer={selectedProvider}
                  redirectUrl={window.location.href}
                />{' '}
                <LogoutButton />
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
