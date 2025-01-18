import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
// Connection URL
const dbUrl = process.env.MONGO_URL
const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;
