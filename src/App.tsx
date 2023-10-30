import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import SignInMethodComparison from './SignInMethodComparison'
import './styles/LoginScreen.css'
import { IntlProvider } from 'react-intl'
import { useState } from 'react'
import LogInSolid from './LogInSolid'

const sk_messages = {
  app_name: 'Editor diétneho profilu',
  about_application: 'O aplikácii',
  sign_in_with: 'Prihlásiť sa cez',
  or: 'alebo',
  email_and_password: 'Email a heslo',
  what_is_the_difference: 'Aký je v tom rozdiel?',
}

const cs_messages = {
  app_name: 'Editor dietního profilu',
  about_application: 'O aplikaci',
  sign_in_with: 'Přihlásit se přes',
  or: 'nebo',
  email_and_password: 'Email a heslo',
  what_is_the_difference: 'Jaký je v tom rozdíl?',
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

  return (
    <IntlProvider
      messages={getCurrentLocaleMessages(selectedLanguage)}
      locale={selectedLanguage}
      defaultLocale="en"
    >
      <BrowserRouter
        basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
      >
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
          <Route path="/log-in-solid" element={<LogInSolid />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
