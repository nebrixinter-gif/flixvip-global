import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Plans from './pages/Plans';
import Premium from './pages/Premium';
import Browse from './pages/Browse';

function Root() {
  const { user } = useApp();
  return user ? <Navigate to="/browse" replace /> : <Landing />;
}

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
