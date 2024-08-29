import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './components/IntlProviderWrapper'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import ProfileManagement from './components/ProfileManagement/ProfileManagement'

const DietaryProfileEditor: React.FC = () => {
  return (
    <SessionProvider>
      <IntlProviderWrapper>
        <BrowserRouter
          basename={
            import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'
          }
        >
          <Routes>
            <Route path="/" element={<ProfileManagement />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default DietaryProfileEditor
