import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "./types";


// Get current user profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Create or Update a profile
export const createProfile = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await axios.post('api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'PROFILE UPDATED!' : 'PROFILE CREATED!', 'success'));

    return true; // <-- indicate success
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });

    return false; // <-- indicate failure
  }
};

// Add experience
export const addExperience = (formData) => async dispatch => {
    try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await axios.put('api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('EXPERIENCE ADDED', 'success'));

    return true; // <-- indicate success
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });

    return false; // <-- indicate failure
  }
}

// Add Education
export const addEducation = (formData) => async dispatch => {
    try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await axios.put('api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('EDUCATION ADDED', 'success'));

    return true; // <-- indicate success
  } catch (error) {
    const errors = error.response?.data?.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });

    return false; // <-- indicate failure
  }
}