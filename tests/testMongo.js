const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Database name:', conn.connection.name);
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String
    });
    const Test = mongoose.model('Test', testSchema);
    await Test.create({ name: 'test' });
    console.log('Test document created successfully');
    
    // Clean up
    await Test.deleteMany({});
    console.log('Test completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

testConnection(); 