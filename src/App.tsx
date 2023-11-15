import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import About from './components/About'
import { IntlProvider } from 'react-intl'
import { useState } from 'react'
import { useSession } from '@inrupt/solid-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Profile from './components/Profile'
import LanguageContext from './LanguageContext'
import Login from './components/Login'

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

const App: React.FC = () => {
  const [language, setLanguage] = useState('en')
  const languageContextInitialValue = { language, setLanguage }

  const { session } = useSession()
  const [user] = useAuthState(auth)

  function getCurrentLocaleMessages(locale: string) {
    if (locale === 'sk') {
      return sk_messages
    }

    if (locale === 'cs') {
      return cs_messages
    }

    return {}
  }

  function loginIfNotAuthenticated() {
    const userIsLoggedOut = !session.info.isLoggedIn && user === null

    if (userIsLoggedOut) {
      return <Navigate to="/login" />
    } else {
      if (session.info.isLoggedIn) {
        return <Profile selectedSignInMethod="solid" />
      } else {
        return <Profile selectedSignInMethod="firebase" />
      }
    }
  }

  return (
    <LanguageContext.Provider value={languageContextInitialValue}>
      <IntlProvider
        messages={getCurrentLocaleMessages(language)}
        locale={language}
      >
        <BrowserRouter
          basename={
            import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'
          }
        >
          <Routes>
            <Route path="/" element={loginIfNotAuthenticated()} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export default App
