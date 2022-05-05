//===================================================================================================================================================================//
//                                                         Controller For The User Route                                                                             //
//===================================================================================================================================================================//

import asyncHandler from 'express-async-handler'; // Middleware for handling exceptions inside async routes and passes them to custom error handler.
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//===================================================================================================================================================================//

// Authenticates the user and gets the access token.
// Used in a POST request to /api/users/login.
// 'matchPassword' is a created mongoose instance method declared in userModel.js used to match the passed in password with the stored one.
export const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Checks if there is a user and if password passed in matches password in database.
    // Responds back with user object and generates a jws token.
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

//===================================================================================================================================================================//

// Registers a new user and adds it to the database.
// Used in a POST request to /api/users.
export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if(userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }
    
    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

//===================================================================================================================================================================//

// Gets the profile information for the current logged in user.
// Used in a GET request to /api/users/profile.
export const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
    else {
        res.status(404);
        throw new Error('User Not Found');
    }
});

//===================================================================================================================================================================//

// Updates the profile information of the current logged in user.
// Used in a PUT request to /api/users/profile.
export const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });
    }
    else {
        res.status(404);
        throw new Error('User Not Found');
    }
    
});

//===================================================================================================================================================================//

// Gets all users from the database.
// Used in a GET request to /api/users.
// Only Admin allowed.
export const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({});

    res.json(users);
});

//===================================================================================================================================================================//

// Deletes a selected user from the database.
// Used in a DELETE request to /api/users/:id.
// Only Admin allowed.
export const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if(user) {
        await user.remove();res.json({ message: 'User Removed Successfully!' });
    }
    else {
        res.status(404);
        throw new Error('User Not Found!');
    }
});

//===================================================================================================================================================================//

// Gets the current logged in user.
// Used in a GET request to /api/users/:id.
// Only Admin allowed.
export const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.json(user);
    }
    else{
        res.status(404);
        throw new Error('User Not Found!');
    }
});

//===================================================================================================================================================================//

// Updates the current logged in user.
// Used in a PUT request to /api/users/:id
// Only Admin allowed.
export const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else {
        res.status(404);
        throw new Error('User Not Found');
    }
    
});