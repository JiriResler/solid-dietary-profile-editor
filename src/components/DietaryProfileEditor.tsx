import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import RequireAuth from './RequireAuth'
import ProfileManagement from './ProfileManagement'

const DietaryProfileEditor: React.FC = () => {
  return (
    <BrowserRouter
      basename={import.meta.env.DEV ? '/' : '/solid-dietary-profile-editor/'}
    >
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <ProfileManagement />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default DietaryProfileEditor
