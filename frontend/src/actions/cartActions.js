//===================================================================================================================================================================//
//                                                                         Cart Actions                                                                              //
//===================================================================================================================================================================//

import axios from 'axios';
import {CART_ADD_ITEM, 
        CART_REMOVE_ITEM, 
        CART_SAVE_SHIPPING_ADDRESS, 
        CART_SAVE_PAYMENT_METHOD
    } from '../constants/cartConstants';

//===================================================================================================================================================================//

// Gets info for the requested product based on passed in ID, when product is added to cart.
// Adds that product to local storage so cart doesn't empty when leaving page.
export const addToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity: quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//===================================================================================================================================================================//

// Removes product from cart where that product ID matches passed in ID.
// Updates the local storage.
export const removeFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//===================================================================================================================================================================//

// Saves the users shipping address passed in as 'data'.
// Adds shipping address to local storage.
export const saveShippingAddress = (data) => async (dispatch) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

//===================================================================================================================================================================//

// Saves the users payment method passed in as 'data'.
// Adds payment method to local storage.
export const savePaymentMethod = (data) => async (dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};