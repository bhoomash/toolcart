require('dotenv').config()
const mongoose=require("mongoose")

exports.connectToDB=async()=>{
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI)
        console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
        console.log('❌ Failed to connect to MongoDB Atlas:', error.message);
        
        // Fallback to local MongoDB
        console.log('Attempting to connect to local MongoDB...');
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/mern-ecommerce')
            console.log('✅ Connected to local MongoDB');
        } catch (localError) {
            console.log('❌ Failed to connect to local MongoDB:', localError.message);
            console.log('Please ensure MongoDB is installed and running locally, or check your Atlas connection.');
            process.exit(1);
        }
    }
}