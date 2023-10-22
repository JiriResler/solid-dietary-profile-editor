import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/solid-dietary-profile-editor/" element={<Home />} />
          <Route
            path="/solid-dietary-profile-editor/about"
            element={<About />}
          />
          <Route
            path="/solid-dietary-profile-editor/contact"
            element={<Contact />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
