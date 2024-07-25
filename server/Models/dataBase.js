const mongoose = require ('mongoose');
require('dotenv').config(); 
const mongo_url = process.env.MONGODB_URI

mongoose.connect(mongo_url)
.then(()=>{
   console.log('Data base connected successfully');
}).catch((err)=>{
  console.log('database error',err);
})