import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import MainAdmin from './components/MainAdmin';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute />}>
        <Route path="/main" element={<Main />} />
        <Route path="/mainAdmin" element={<MainAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;