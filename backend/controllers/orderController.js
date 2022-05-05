//===================================================================================================================================================================//
//                                                         Controller For The Order Route                                                                            //
//===================================================================================================================================================================//

import asyncHandler from 'express-async-handler'; // Middleware for handling exceptions inside async routes and passes them to custom error handler.
import Order from '../models/orderModel.js';

//===================================================================================================================================================================//

// Adds a new order to the database.
// Used in a POST request to /api/orders.
export const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    // Throw error if no orderItems in req.body.
    // If there is an orderItem, create new order based on info passed through req.body and save new order to database.
    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No Order Items');
    }
    else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

//===================================================================================================================================================================//

// Gets an order by its ID.
// Used in a GET request to /api/orders/:id.
export const getOrderById = asyncHandler(async (req, res) => {

    // Finds the order in the database by its ID and grabs the name and email of the user attached to that order.
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order) {
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error('Order Not Found!');
    }
});

//===================================================================================================================================================================//

// Updates an order to paid.
// Used in a GET request to /api/orders/:id/pay.
// Only Admin allowed.
export const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // Info inside paymentResult is needed for the PayPal API.
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order Not Found!');
    }
});

//===================================================================================================================================================================//

// Updates order to delivered.
// Used in a GET request to /api/orders/:id/deliver.
// Only Admin allowed.
export const updateOrderToDelivered = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if(order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order Not Found!');
    }
});

//===================================================================================================================================================================//

// Gets the orders for the current logged in user.
// Used in a GET request to /api/orders/myorders.
export const getMyOrders = asyncHandler(async (req, res) => {

    // Finds orders from database where user has the same id as the id passed in from req.user.
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
});

//===================================================================================================================================================================//

// Gets all orders in the database.
// Used in a GET request to /api/orders.
// Only Admin allowed.
export const getAllOrders = asyncHandler(async (req, res) => {

    // Gets all orders from database as well as the id and name of every user that has an order.
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});