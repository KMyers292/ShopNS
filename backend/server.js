import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`));