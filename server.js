const express = require('express')
require('./db/mongoose');
const app = express()
const userRoute = require('./route/User');
const profileRoute = require('./route/Profile');
const searchRoute = require('./route/Search');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const compression = require('compression')

app.use(cookieParser())
app.use(express.json())
app.use(compression({
    level:6,
    threshold:20*1000,
    filter:(req,res)=>{
        if(req.header['x-no-compression']){
            return false
        }

        return compression.filter(req,res)
    }

}
))
// app.use(async function(req,res,next){
//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//       }

//       await sleep(2000)
//       next()
// })


app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:8080','https://guru-finder.netlify.app']
}))
app.use('/api/v1/user',userRoute)
app.use('/api/v1/profile',profileRoute)
app.use('/api/v1/search',searchRoute)
const port = process.env.PORT || 3000;



app.get('/',(req,res)=>{
    res.send('The application is up right now')
})


app.listen(port,()=>{
    console.log(`The application is up and running on port ${port}`)
})
