import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Navbar from './components/navbar/Navbar.jsx'
import LoginPage from './pages/loginpage/LoginPage.jsx'
import RegisterPage from './pages/registerpage/RegisterPage.jsx'
import SubjectPage from './pages/subject/SubjectPage.jsx'
import ProfilePage from './pages/profilepage/ProfilePage.jsx'
import Protected from './pages/Protected.jsx'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/:url" element={<SubjectPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/protected" element={<Protected />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
