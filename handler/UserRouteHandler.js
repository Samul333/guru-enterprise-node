
const User = require('../model/User');
const HelperClass = require('../utils/helper');

 async function  createNewUser(req,res){
    const body = req.body
    const user = new User(body);

    try{
        await user.sendVerificationEmail()
        console.log('After Email Sent')
        const resp = await user.save();
        const token =  await resp.generateAuthToken()
        res.status(200).json({sucess:true,data:{user:resp,token}})
    }
    catch(err){
        res.status(400).json({sucess:false,err:err.message})
    }

}



async function getAllUsers(req,res){

    try{
        const users = await User.find({});
        console.log(users)
        res.status(200).json({success:true,data:{users:users}})
    }
    catch(err){
        res.status(400).json({success:false,err:err.message})
    }

}


async function loginUser(req,res){
    try{
        const {email,password}= req.body
        const user = await User.findByCredentials(email,password)
        if(!user.isVerified) throw new Error('The email has not been verified yet!')
        const token = await user.generateAuthToken()
  
        res.cookie('Gurutification', token,{httpOnly:true,secure:true,domain:'localhost'});
        res.status(200).send({success:true,user,token,auth:true})
    }
    catch(err){
        res.status(400).json({success:false,err:err.message})
    }
}


async function logoutAll(req,res){
    try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({success:true,message:'Logout successful'})
    }
    catch(err){
        res.status(400).send({success:false,err:err.message})
    }
}

async function logout(req,res){
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            token.token !== req.token
        })
        await req.user.save()
        res.send({sucess:true})
    }catch(err){
        res.status(400).send({success:false})
    }
}


async function getCurrentUser(req,res){

    res.status(200).send({auth:true,user:req.user})

}

async function verifyToken(req,res){
   const {token} = req.params;
    try{
        const decoded =  HelperClass.decodeJwt(token)
        const user = await User.findById(decoded.user._id);
        user.isVerified = true;
        await user.save();
        res.status(200).send('The account has been activated successfully')
    }
    catch(err){
        res.status(400).send('An error occured please try again')
    }
  
}

module.exports={
    createNewUser,
    getAllUsers,
    loginUser,
    logoutAll,
    logout,
    getCurrentUser,
    verifyToken
}