const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const { DOMAIN_NAME, MAILER_EMAIL, MAILER_PASSWORD, JWT_KEYCODE } = require('../configuration/config');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
           user: MAILER_EMAIL,
           pass: MAILER_PASSWORD
       }
   });


const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:false,
        trim:true
    },
    lastname:{
        type:String,
        required:false,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:6,
        validate(value){
            if(value.toLowerCase().includes('password')) throw new Error('Password cannot include the word password')
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid! Please enter a valid email')
            }
        }
    },

    age:{
        type:Number,
        required:false,
        validate(value){
            if(value <0){
                throw new Error('Age must be a positive number')
            }
        }
    },

    // 0 for students 1 for tutors
    userType:{
        type:Number,
        required:true,
    },

    username:{
        type:String,
        unique:true,
        trim:true,

    },
    gender:{
        type:String,
        required:false
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{ timestamps: true })



userSchema.pre('save', async function(next){
    const user = this;

   

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10)
        
    }
    next()
})

userSchema.methods.sendVerificationEmail = async function(){
    const user = this;
    const token = jwt.sign({user},JWT_KEYCODE)
    const mailOptions = {
        from: 'samulshrestha97@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Verify your Email Address', // Subject line
        html: `<p>Your Verification Process is almost completed. Verify your email by going to the link. <a href='${DOMAIN_NAME}api/v1/user/verify/${token}'>Click here </a></p>`// plain text body
      };
    
     transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log('Email has been sent');
     });
}


userSchema.methods.generateAuthToken = async function(){
    const user = this;

    const token = jwt.sign({user},JWT_KEYCODE)

    user.tokens = user.tokens.concat({token})

    await user.save()

    return token

}

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials= async(email,password)=>{
    const user = await User.findOne({email});

    if(!user) throw new Error('Invalid user');

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) throw new Error('Invalid user')
    console.log(user)
    return user
}

const User = mongoose.model('User',userSchema)

module.exports = User;
