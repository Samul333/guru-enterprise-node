const express = require('express')
require('./db/mongoose');
const app = express()
const userRoute = require('./route/User');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { DOMAIN_NAME } = require('./configuration/config');



app.use(cookieParser())
app.use(express.json())

// app.use(async function(req,res,next){
//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//       }

//       await sleep(2000)
//       next()
// })
console.log(DOMAIN_NAME)
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:8080','https://guru-finder.netlify.app/']
}))
app.use('/api/v1/user',userRoute)
const port = process.env.PORT || 3000;



app.get('/',(req,res)=>{
    res.send('The application is up right now')
})


app.listen(port,()=>{
    console.log(`The application is up and running on port ${port}`)
})
