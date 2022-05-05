//===================================================================================================================================================================//
//                                                                      Order Routes                                                                                 //
//===================================================================================================================================================================//

import express from 'express';
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getAllOrders } from '../controllers/orderController.js';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

//===================================================================================================================================================================//

router.route('/')
    .get(isLoggedIn, isAdmin, getAllOrders)
    .post(isLoggedIn, addOrderItems);

router.get('/myorders', isLoggedIn, getMyOrders);
router.get('/:id', isLoggedIn, getOrderById);
router.put('/:id/pay', isLoggedIn, updateOrderToPaid);
router.put('/:id/deliver', isLoggedIn, isAdmin, updateOrderToDelivered);

//===================================================================================================================================================================//

export default router;