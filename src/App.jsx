import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Navbar from './components/navbar/Navbar.jsx'
import SubjectPage from './pages/subject/SubjectPage.jsx'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/:url" element={<SubjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
