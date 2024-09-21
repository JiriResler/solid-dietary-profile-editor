import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './components/IntlProviderWrapper'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import ProfileManagement from './components/ProfileManagement/ProfileManagement'

const DietaryProfileEditor: React.FC = () => {
  const applicationBasePath = import.meta.env.DEV
    ? '/'
    : '/solid-dietary-profile-editor/'

  return (
    <SessionProvider restorePreviousSession>
      <IntlProviderWrapper>
        <BrowserRouter basename={applicationBasePath}>
          <Routes>
            <Route path="/" element={<ProfileManagement />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default DietaryProfileEditor
