import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecommendationForm from './pages/RecommendationForm';
import Results from './pages/Results';
import Search from './pages/Search';
import Compare from './pages/Compare';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<RecommendationForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/search" element={<Search />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Telangana EAPCET College Recommendation System | AI-Powered Admissions Guide</p>
      </footer>
    </div>
  );
}

export default App;
