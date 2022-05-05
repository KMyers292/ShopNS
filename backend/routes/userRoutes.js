//===================================================================================================================================================================//
//                                                                      User Routes                                                                                  //
//===================================================================================================================================================================//

import express from 'express';
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js';
import { isLoggedIn, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

//===================================================================================================================================================================//

router.route('/')
    .post(registerUser)
    .get(isLoggedIn, isAdmin, getUsers);

router.post('/login', authUser);

router.route('/profile')
    .get(isLoggedIn, getUserProfile)
    .put(isLoggedIn, updateUserProfile);

router.route('/:id')
    .get(isLoggedIn, isAdmin, getUserById)
    .put(isLoggedIn, isAdmin, updateUser)
    .delete(isLoggedIn, isAdmin, deleteUser);

//===================================================================================================================================================================//

export default router;