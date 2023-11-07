import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import SignInMethodComparison from './SignInMethodComparison'
import './styles/LoginScreen.css'
import { IntlProvider } from 'react-intl'
import { useState } from 'react'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Profile from './components/Profile'

const sk_messages = {
  app_name: 'Editor diétneho profilu',
  about_application: 'O aplikácii',
  sign_in_with: 'Prihlásiť sa cez',
  or: 'alebo',
  email_and_password: 'Email a heslo',
  what_is_the_difference: 'Aký je v tom rozdiel?',
  select_id_provider: 'Vyberte svojho poskytovateľa identity',
  log_in: 'Prihlásiť sa',
  go_back: 'Naspäť',
}

const cs_messages = {
  app_name: 'Editor dietního profilu',
  about_application: 'O aplikaci',
  sign_in_with: 'Přihlásit se přes',
  or: 'nebo',
  email_and_password: 'Email a heslo',
  what_is_the_difference: 'Jaký je v tom rozdíl?',
  select_id_provider: 'Zvolte svého poskytovatele identity',
  log_in: 'Přihlásit',
  go_back: 'Zpátky',
}

function getCurrentLocaleMessages(locale: string) {
  if (locale === 'sk') {
    return sk_messages
  }

  if (locale === 'cs') {
    return cs_messages
  }

  return {}
}

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  // const [selectedSignInMethod, setSelectedSignInMethod] = useState<string>('')

  const { session } = useSession()
  const [user] = useAuthState(auth)

  return (
    <IntlProvider
      messages={getCurrentLocaleMessages(selectedLanguage)}
      locale={selectedLanguage}
      defaultLocale="en"
    >
      <BrowserRouter
        basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
      >
        {!session.info.isLoggedIn && user === null && (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/sign-in-methods-comparison"
              element={<SignInMethodComparison />}
            />
          </Routes>
        )}

        {session.info.isLoggedIn && (
          <Routes>
            <Route
              path="/"
              element={<Profile selectedSignInMethod="solid" />}
            />
          </Routes>
        )}

        {auth.currentUser !== null && (
          <Routes>
            <Route
              path="/"
              element={<Profile selectedSignInMethod="firebase" />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
