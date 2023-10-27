import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import SignInMethodComparison from './SignInMethodComparison'
import './styles/LoginScreen.css'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'

const en_messages = { app_name: 'Dietary profile editor' }
const sk_messages = { app_name: 'Editor diétneho profilu' }

const App: React.FC = () => {
  const selectedLanguage = 'en'
  return (
    <IntlProvider
      messages={en_messages}
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
