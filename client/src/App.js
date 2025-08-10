import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SectionLayout from './SectionLayout';
//Redux
import {Provider} from "react-redux";
import store from './store.js';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Navbar /> {/* This is outside Routes now */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<SectionLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
