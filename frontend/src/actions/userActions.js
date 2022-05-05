//===================================================================================================================================================================//
//                                                                         User Actions                                                                              //
//===================================================================================================================================================================//

import axios from 'axios';
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, 
        USER_LOGOUT, 
        USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
        USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET, 
        USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, 
        USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, 
        USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, 
        USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
    } from '../constants/userConstants.js';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants.js';
import { CART_RESET } from '../constants/cartConstants';

//===================================================================================================================================================================//

// Authenticates a user based on email and password passed in and logs them in.
// Upon successful login, adds the user info to local storage.
export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const header = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
      
        const { data } = await axios.post('/api/users/login', { email, password }, header);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    } 
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Logs the current user out.
// Clears local storage.
// Resets any user dependent lists.
export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: CART_RESET });
};

//===================================================================================================================================================================//

// Creates a new user based on passed in name, email, and password.
// Upon successful creation, logs in user and adds info to local storage.
export const register = (name, email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        }) 

        const header = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
      
        const { data } = await axios.post('/api/users', { name, email, password }, header);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } 
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Gets detailed info for the user that matches the user ID passed in.
export const getUserDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };
      
        const { data } = await axios.get(`/api/users/${id}`, header);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Updates the info for the passed in user.
export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
      
        const { data } = await axios.put(`/api/users/profile`, user, header);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } 
    catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Gets all users in the database.
// Only viewable by Admin.
export const listUsers = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_LIST_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        
        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
  
        const { data } = await axios.get(`/api/users`, header);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: USER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Deletes a user that matches the passed in user ID.
// Only Admin can delete.
export const deleteUser = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_DELETE_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        await axios.delete(`/api/users/${id}`, header);

        dispatch({
            type: USER_DELETE_SUCCESS
        });
    } 
    catch (error) {
        dispatch({
            type: USER_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Allows the Admin to update user info and give them admin privileges, or take it away.
export const updateUser = (user) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.put(`/api/users/${user._id}`, user, header);

        dispatch({
            type: USER_UPDATE_SUCCESS
        });

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};