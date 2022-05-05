//===================================================================================================================================================================//
//                                                                      Backend API Server                                                                           //
//===================================================================================================================================================================//

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

//===================================================================================================================================================================//

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

// Connects to the Mongo Database through the cloud using .env MONGO_URI.
mongoose.connect(process.env.MONGO_URI)
    .catch((error) => { 
        console.log(`Error On Initial Connection: ${error}`); 
    });

// Handles if there is an error after initial connection to database.
// As well as log to the console a message if connection to database is successful.
mongoose.connection.on('error', (error) => { console.log(`Connection Error: ${error}`); });
mongoose.connection.once('open', () => { console.log(`Database Connected: ${mongoose.connection.host}`); });

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// When this route is hit, send the paypal client id from the .env.
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// Serves static images in the uploads folder.
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// If in production mode, use the build folder for the site.
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    // Sends all requests to index.html in the build folder. This folder serves all of the routes.
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`));