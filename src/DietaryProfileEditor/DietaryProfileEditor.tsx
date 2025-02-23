import { SessionProvider } from '@inrupt/solid-ui-react'
import IntlProviderWrapper from './IntlProviderWrapper'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login/Login'
import DietaryProfileManagement from './DietaryProfileManagement/DietaryProfileManagement'
import Container from 'react-bootstrap/Container'
import { FacebookProvider } from 'react-facebook'
import './DietaryProfileEditor.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Wraps the application in necessary components and defines its routes.
 */
const DietaryProfileEditor: React.FC = () => {
  const queryClient = new QueryClient()

  const applicationBasePath = import.meta.env.DEV
    ? '/'
    : '/solid-dietary-profile-editor/'

  return (
    <SessionProvider restorePreviousSession>
      <FacebookProvider appId="3665987363684602">
        <IntlProviderWrapper>
          <QueryClientProvider client={queryClient}>
            <Container fluid>
              <BrowserRouter basename={applicationBasePath}>
                <Routes>
                  <Route path="/" element={<DietaryProfileManagement />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </Container>
          </QueryClientProvider>
        </IntlProviderWrapper>
      </FacebookProvider>
    </SessionProvider>
  )
}

export default DietaryProfileEditor
