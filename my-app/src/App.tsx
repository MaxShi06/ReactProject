import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Registration from './pages/Registraion';
import Login from './pages/Login';
import Bikes from './pages/First';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/" element={<Navigate to="/bikes" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
