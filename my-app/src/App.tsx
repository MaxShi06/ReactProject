import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Сart';
import Books from './pages/First';
import Login from './pages/Login';
import Registration from './pages/Registraion';
import { isLoggedIn } from './servise/localStorageHelper';
import { store } from './store/store';
import './App.css';

type ProtectedRouteProps = {
  children: ReactElement;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn() ? '/books' : '/login'} replace />} />
          <Route path="/login" element={isLoggedIn() ? <Navigate to="/books" replace /> : <Login />} />
          <Route
            path="/registration"
            element={isLoggedIn() ? <Navigate to="/books" replace /> : <Registration />}
          />
          <Route
            path="/books"
            element={(
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/cart"
            element={(
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
