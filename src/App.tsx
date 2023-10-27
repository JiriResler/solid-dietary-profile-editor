import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import SignInMethodComparison from './SignInMethodComparison'
import './styles/LoginScreen.css'
import { IntlProvider } from 'react-intl'

const sk_messages = { 
  app_name: 'Editor diétneho profilu',
  about_application: 'O aplikácii',
  sign_in_with: 'Prihlásiť sa cez',
  or: 'alebo',
  email_and_password: 'Email a heslo',
  what_is_the_difference: 'Aký je v tom rozdiel?'
 }

const App: React.FC = () => {
  const selectedLanguage = 'en'
  return (
    <IntlProvider
      messages={sk_messages}
      locale={selectedLanguage}
      defaultLocale="en"
    >
      <BrowserRouter
        basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="sign-in-methods-comparison"
            element={<SignInMethodComparison />}
          />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
