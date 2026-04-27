const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
console.log('Testing connection to:', uri.split('@')[1]);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connection Successful');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection Failed:', err.message);
    process.exit(1);
  });
