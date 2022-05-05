//===================================================================================================================================================================//
//                                                                         Product Actions                                                                           //
//===================================================================================================================================================================//

import axios from 'axios';
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
        PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
        PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, 
        PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, 
        PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, 
        PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, 
        PRODUCT_DELETE_REVIEW_REQUEST, PRODUCT_DELETE_REVIEW_SUCCESS, PRODUCT_DELETE_REVIEW_FAIL, 
        PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL,
        PRODUCT_UPDATE_COUNT_REQUEST, PRODUCT_UPDATE_COUNT_SUCCESS, PRODUCT_UPDATE_COUNT_FAIL
    } from '../constants/productConstants.js';

//===================================================================================================================================================================//

// Returns every product object in the database.
// If a keyword is provided, return products that have the keyword letters in the product name.
export const listProducts = (keyword = "", pageNumber = '', filter = '') => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&filter=${filter}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS, 
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Returns detailed information about the product requested, based on product ID.
export const listProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Deletes the requested product, based on the product ID.
export const deleteProduct = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        await axios.delete(`/api/products/${id}`, header);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Creates a new product based on information provided in form.
export const createProduct = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.post(`/api/products`, {}, header);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Updates an existing product that is passed in.
export const updateProduct = (product) => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data } = await axios.put(`/api/products/${product._id}`, product, header);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Creates a new product review based on the review object passed in for the product that matches the product ID passed in.
export const createProductReview = (productId, review) => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        await axios.post(`/api/products/${productId}/reviews`, review, header);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Creates a new product review based on the review object passed in for the product that matches the product ID passed in.
export const deleteProductReview = (productId) => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_DELETE_REVIEW_REQUEST
        }) 

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        await axios.delete(`/api/products/${productId}/reviews`, header);

        dispatch({
            type: PRODUCT_DELETE_REVIEW_SUCCESS
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_DELETE_REVIEW_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Gets the top 3 best reviewed products.
export const listTopProducts = () => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_TOP_REQUEST
        });

        const { data } = await axios.get(`/api/products/top`);

        dispatch({
            type: PRODUCT_TOP_SUCCESS, 
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//===================================================================================================================================================================//

// Gets the product from the passed in ID and then updates that products in stock count based on the quantity passed in.
export const updateProductCount = (id, quantity) => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_UPDATE_COUNT_REQUEST
        }) 

        const { data } = await axios.get(`/api/products/${id}`);

        const count = (data.countInStock - quantity) > 0 ? (data.countInStock - quantity) : 0;

        const updatedProduct = {
            _id: id,
            name: data.name,
            price: data.price,
            image: data.image,
            category: data.category,
            description: data.description,
            countInStock: count
        }

        const {userLogin: { userInfo }} = getState();

        const header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
      
        const { data: putData } = await axios.put(`/api/products/${id}`, updatedProduct, header);

        dispatch({
            type: PRODUCT_UPDATE_COUNT_SUCCESS,
            payload: putData
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_COUNT_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};