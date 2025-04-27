import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MainPage from './pages/MainPage';
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/map" element={<MapPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
      </Routes>
    </Router>
  );
}

export default App;