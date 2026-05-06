const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function testConnection() {
  console.log('Attempting to connect to MongoDB...');
  try {
    await mongoose.connect(uri);
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('❌ ERROR: Could not connect to MongoDB.');
    console.error('Reason:', err.message);
    if (err.message.includes('IP not whitelisted') || err.message.includes('not permitted')) {
      console.log('\nTIP: It looks like your IP address is not whitelisted in MongoDB Atlas.');
    }
    process.exit(1);
  }
}

testConnection();
