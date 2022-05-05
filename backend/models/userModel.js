//===================================================================================================================================================================//
//                                                                  User Mongoose Model                                                                              //
//===================================================================================================================================================================//

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Library that helps hash passwords.

//===================================================================================================================================================================//

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

//===================================================================================================================================================================//

// Created Mongoose method that uses bcrypt to compare the passed in hashed password with the hashed password stored in the database.
userSchema.methods.matchPassword = async function (enteredPassword) {
    
    return await bcrypt.compare(enteredPassword, this.password);
}

// Runs this function every time before userSchema is ever saved.
// If password has been changed, uses bcrypt to re-hash the new passed in password.
userSchema.pre('save', async function (next) {
    
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//===================================================================================================================================================================//

const User = mongoose.model('User', userSchema);
export default User;