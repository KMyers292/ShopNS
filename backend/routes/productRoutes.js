//===================================================================================================================================================================//
//                                                                      Product Routes                                                                               //
//===================================================================================================================================================================//

import express from 'express';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, deleteProductReview, getTopProducts } from '../controllers/productController.js';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

//===================================================================================================================================================================//

router.route('/')
    .get(getProducts)
    .post(isLoggedIn, isAdmin, createProduct);

router.get('/top', getTopProducts);

router.route('/:id')
    .get(getProductById)
    .delete(isLoggedIn, isAdmin, deleteProduct)
    .put(isLoggedIn, updateProduct);

router.route('/:id/reviews')
    .post(isLoggedIn, createProductReview)
    .delete(isLoggedIn, deleteProductReview);

//===================================================================================================================================================================//

export default router;