//===================================================================================================================================================================//
//                                                         Auth Middleware Functions                                                                                 //
//===================================================================================================================================================================//

import jwt from 'jsonwebtoken'; // Package that creates JSON web tokens for use in request headers for authentication purposes.
import asyncHandler from 'express-async-handler'; // Middleware for handling exceptions inside async routes and passes them to custom error handler.
import User from '../models/userModel.js';

//===================================================================================================================================================================//

// Middleware function that checks if user is logged in and authorized for the specific route.
export const isLoggedIn = asyncHandler( async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Gets the token from the header and verifies that token is correct.
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Uses the decoded users ID to find the requested user and pass back all info except the password.
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } 
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized, Token is Invalid');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not Authorized, No Token Available');
    }
});

//===================================================================================================================================================================//

// Middleware function that checks if the current logged in user is an Admin or not.
export const isAdmin = (req, res, next) => {

    if(req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not Authorized As An Admin!'); 
    }
};