import './App.css';
import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SectionLayout from './SectionLayout';
import DashBoard from './components/dashboard/DashBoard';
import CreateProfile from './components/profile-forms/CreateProfile.jsx';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import {Provider} from "react-redux";
import store from './store.js';

import { loadUser } from './actions/auth.js';
import setAuthToken from './utils/setAuthToken.js';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
      <Navbar /> {/* This is outside Routes now */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<SectionLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-profile" 
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
