import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Database Connected: ${connection.connection.host}`);
    } 
    catch (error) {
        console.error(`Error On Initial Connection: ${error}`);
        process.exit(1);
    }
};

export default connectDB;