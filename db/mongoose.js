const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Samul:killinginthenameof@cluster0.h638k.mongodb.net/guru-project?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true},()=>{
    console.log('The connection has been established')
});





