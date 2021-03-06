
const Profile = require('../model/Profile');
const ProfileController = require('../handler/ProfileRouteHandler');
const auth = require('../middleware/auth');
const route = require('express').Router();
const multer = require('multer')

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){

          return cb(new Error('The File Type is not supported'))

        }

        cb(undefined,true)
        
        
    }
})





route.get('/',auth, ProfileController.getProfile )

route.post('/language',auth, ProfileController.addLanguage)
route.get('/language',auth,ProfileController.getLanguage)
route.delete('/language',auth,ProfileController.deleteLanguage)
route.patch('/language',auth,ProfileController.editLanguage)

route.get('/subject',auth, ProfileController.getSubjects)
route.post('/subject',auth, ProfileController.addSubjects)
route.patch('/subject',auth, ProfileController.editSubject)
route.delete('/subject',auth, ProfileController.deleteSubject)

route.post('/tags',auth, ProfileController.addTags)
route.get('/tags',auth, ProfileController.getTags)


route.get('/education', auth, ProfileController.getEducation)
route.post('/education', auth, ProfileController.addEduction)
route.patch('/education',auth,ProfileController.editEducation)
route.delete('/education', auth,ProfileController.deleteEducation)

//Upload Credentials
route.post('/upload/certification',auth,upload.single('image'), ProfileController.uploadCredentials)
route.delete('/upload/certification',auth,ProfileController.removeCredentials)


route.post('/employment',auth,ProfileController.addEmployment)
route.patch('/employment',auth,ProfileController.editEmployment)
route.delete('/employment',auth,ProfileController.deleteEmployment)

// route.post('/upload/avatar',auth,upload.single('image'), ProfileController.uploadAvatar)
route.post('/upload/avatar',auth,upload.single('image'), ProfileController.uploadAvatar)
route.get('/test',async(req,res)=>{

    const profileData = new Profile({
        userId:'60e16a19557d1400151cdfe1',
        languages:[{
            name:'Nepali',
            efficiency:'Native and Fluent'
        }],
        subject:[{
            name:'React and Vue Guru',
            rate:'350',
            description:"I'm a Software Developer with a years of experience as a Full Stack Web Developer. I'm mostly late to work with sometimes dissapering for hours in between work hours, but I can still teach you stuff",

        }],
        education:[{
            name:'Prime College',
            level:'Bachelor of Science in Information Technology',
            years:'2016-2020'
        }]
    })

    await profileData.save();
    res.send('ok')

})



module.exports = route;