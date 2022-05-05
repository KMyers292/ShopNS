import jwt from 'jsonwebtoken';

// Middleware to generate a new jws web token using the passed in user ID.
const generateToken = (id) => {
    
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

export default generateToken;