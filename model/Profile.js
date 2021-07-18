const mongoose = require('mongoose');


const profileSchema = mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User', 
        unique:true
    },

    avatar:{
        type:Buffer
    },

    languages:[{

        name:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        efficiency:{
            type:String,
            required:true,
            trim:true
        }
    }],

    education:[{

        name:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },

        years:{
            type:String,
            required:true,
            trim:true
        },

        level:{
            type:String,
            required:true,
            trim:true
        }

    }],

    subject:[{
        name:{
            type:String,
            required:true,
            trim:true, 
            unique:true
        },

        description:{
            type:String,
            required:true,
            trim:true
        },

        rate:{
            type:Number,
            required:true,
        }

    }],

    tags:[
        {
            type:String,
            unique:true,

        }
    ],
    credentials:[{
        image:Buffer,
        description:String
    }],

    employment:[{
        role:{
            type:String,
            required:true,
            trim:true
        },

        timeFrame:{
            type:String,
            required:true,
            trim:true
        },
        company:{
            type:String,
            required:true,
            trim:true
        },

        jobDescription:{
            type:String,
            required:true,
            trim:true
        }

    }]


},{ timestamps: true })

const Profile = mongoose.model('Profile',profileSchema)

module.exports = Profile;