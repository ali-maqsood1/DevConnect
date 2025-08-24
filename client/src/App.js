import './App.css';
import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Alert from "./components/layout/Alert.jsx";
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashBoard from './components/dashboard/DashBoard';
import CreateProfile from './components/profile-forms/CreateProfile.jsx';
import EditProfile from './components/profile-forms/EditProfile.jsx';
import AddExperience from './components/profile-forms/AddExperience.jsx';
import AddEducation from './components/profile-forms/AddEducation.jsx';
import Profile from './components/profile/Profile.jsx';
import Profiles from './components/profiles/Profiles.jsx';
import Posts from './components/posts/Posts.jsx';
import Post from './components/post/Post.jsx';
import NotFound from './components/layout/NotFound.jsx';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux
import {Provider} from "react-redux";
import store from './store.js';

import { loadUser } from './actions/auth.js';
import setAuthToken from './utils/setAuthToken.js';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function MainLayout() {
  return (
    <>
      <Navbar />
      <section className="container">
        <Alert />
        <Outlet />
      </section>
    </>
  );
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<MainLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<Profile />} />
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
          <Route 
            path="/edit-profile" 
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/add-experience" 
            element={
              <PrivateRoute>
                <AddExperience />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/add-education" 
            element={
              <PrivateRoute>
                <AddEducation />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/posts" 
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/posts/:id" 
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            } 
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
