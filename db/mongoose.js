const mongoose = require('mongoose');
const { MONGODB_URI } = require('../configuration/config');

mongoose.connect(MONGODB_URI, 
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true},()=>{
    console.log('The connection has been established')
});





