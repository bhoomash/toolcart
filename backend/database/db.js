require('dotenv').config()
const mongoose=require("mongoose")

exports.connectToDB=async()=>{
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        console.log('Using MongoDB URI:', process.env.MONGO_URI.replace(/:[^:@]*@/, ':****@'));

        // Simple connection without complex options
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas successfully');
    } catch (error) {
        console.log('❌ Failed to connect to MongoDB Atlas:', error.message);
        console.log('Connection string format check:');
        console.log('- Should start with: mongodb+srv://');
        console.log('- Should include valid username and password');
        console.log('- Should have correct cluster URL');
        console.log('- Database name should be specified');
        console.log('\nTroubleshooting steps:');
        console.log('1. Check if your IP is whitelisted in MongoDB Atlas (add 0.0.0.0/0 for all IPs)');
        console.log('2. Verify username and password are correct');
        console.log('3. Ensure the cluster is running and accessible');
        console.log('4. Check your internet connection');
        process.exit(1);
    }
}