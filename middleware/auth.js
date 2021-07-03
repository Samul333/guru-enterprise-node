const jwt= require("jsonwebtoken");
const { JWT_KEYCODE } = require("../configuration/config");
const User = require("../model/User");

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies['Gurutification'] || req.header('Authorization').replace('Bearer ','') 
        const decoded = jwt.verify(token,JWT_KEYCODE)
        const user = await User.findOne({_id:decoded.user._id, 'tokens.token':token})
        if(!user) throw new Error('Invalid authentication error')

        req.user = user;
        req.token = token;
        next()
    }
    catch(err){
        res.status(401).send({error:'Not authenticated'})
    }
}

module.exports = auth;