import { Langbase } from 'langbase';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Langbase client
const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY
});

export default langbase; 