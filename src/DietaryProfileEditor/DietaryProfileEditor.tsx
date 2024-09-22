import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './IntlProviderWrapper'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login/Login'
import ProfileManagement from './ProfileManagement/ProfileManagement'
import Container from 'react-bootstrap/Container'

const DietaryProfileEditor: React.FC = () => {
  const applicationBasePath = import.meta.env.DEV
    ? '/'
    : '/solid-dietary-profile-editor/'

  return (
    <SessionProvider restorePreviousSession>
      <IntlProviderWrapper>
        <Container fluid>
          <BrowserRouter basename={applicationBasePath}>
            <Routes>
              <Route path="/" element={<ProfileManagement />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </IntlProviderWrapper>
    </SessionProvider>
  )
}

export default DietaryProfileEditor
