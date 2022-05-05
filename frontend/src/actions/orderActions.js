//===================================================================================================================================================================//
//                                                                         Order Actions                                                                             //
//===================================================================================================================================================================//

import axios from 'axios';
import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, 
        ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, 
        ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, 
        ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL, 
        ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, 
        ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL
    } from '../constants/orderConstants';

//===================================================================================================================================================================//

// Creates a new order based on info from the order object passed in.
export const createOrder = (order) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.post(`/api/orders`, order, header);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Gets detailed info of the requested order, based on the ID passed in.
export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.get(`/api/orders/${id}`, header);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Uses the PayPal API to pay for the order that matches the order ID passed in.
// paymentResult is info passed in from the PayPal API about the user.
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, header);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// For the admin, changes delivery status of the passed in order to 'delivered'.
export const deliverOrder = (order) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, header);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Lists all orders for the current logged in user.
export const listMyOrders = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.get(`/api/orders/myorders`, header);

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// For the admin, lists all orders in the database.
export const listOrders = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.get(`/api/orders`, header);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};