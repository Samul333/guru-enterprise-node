const Profile = require("../model/Profile");
const { success, error } = require("../utils/response");
const sharp = require('sharp')
class ProfileController {

  // Only for test purpose

  async getAllProfile(req, res, next) {
    const data = await Profile.find();
    res.send(data);
  }

  // Add Language 

  async addLanguage(req, res, next) {
    try {
      const profileData = await Profile.findOne({ userId: req.user._id });
      profileData.languages.push(req.body);
      const savedData = await profileData.save();
      res.status(200).send({ success: true, data: savedData });
    } catch (err) {
      res.send(err.message);
    }
  }


  // Get all the languages of the User

  async getLanguage(req, res, next) {
    try {
      const profileData = await Profile.findOne({ userId: req.user._id });
      const languageData = profileData.languages;
      success({ res, data: languageData });
    } catch (err) {}
  }

  async deleteLanguage(req,res,next){
    try{
      const profileData = await Profile.findOne ({ userId: req.user._id }); 
      profileData.languages = profileData.languages.filter(item=>{
      return item._id != req.body.languageId;
     })

     const savedData = await profileData.save();
     success({ res, data: savedData });

    }
    catch(err){
      error({res,message:err.message})
    }
  }


  async editLanguage(req,res,next){
    try{
      const profileData = await Profile.findOne ({ userId: req.user._id });
      profileData.languages.forEach(item=>{

        if(item._id==req.body.languageId){

          item.name = req.body.name;
          item.efficiency = req.body.efficiency;

        }
      
      })
      
      const savedData = await profileData.save();
      success({ res, data: savedData });

    }
    catch(err){
      error({res,message:err.message})
    }
  }


  async getSubjects(req,res,next){
      try{
        const profileData = await Profile.findOne({ userId: req.user._id });
        const subjectData = profileData.subject;
      success({ res, data: subjectData });
      }
      catch(err){
        error({res,message:err.message})
      }
  }

  async addSubjects(req,res,next){
      try{
        const profileData = await Profile.findOne({ userId: req.user._id });
        profileData.subject.push(req.body);
        const savedData = await profileData.save();
        success({res,data:savedData})
      }
      catch(err){
        error({res,message:err.message})
      }
  }


  async addTags(req,res,next){
      try{
        const profileData = await Profile.findOne({ userId: req.user._id });
         req.body.tags.forEach(tag=>{
            profileData.tags.push(tag)
        })
        const savedData = await profileData.save();
        success({res,data:savedData})
      }
      catch(err){
        error({res,message:err.message})
      }
  }

  async getTags(req,res,next){
    try{
        const profileData = await Profile.findOne({ userId: req.user._id });
        const subjectData = profileData.tags;
      success({ res, data: subjectData });
      }
      catch(err){
        error({res,message:err.message})
      }
  }


  async getProfile(req, res, next) {
    try {
      const profileData = await Profile.findOne({ userId: req.user._id });

      res.status(200).send({ success: true, data: profileData });
    } catch (err) {
      res.status(404).send({ success: false, message: err.message });
    }
  }


  async getEducation(req,res,next){
    try{
      const profileData = await Profile.findOne({ userId: req.user._id });
      const subjectData = profileData.education;
      success({ res, data: subjectData });
    }
    catch(err){
      error({res,message:err.message})
    }
  }

  async addEduction(req,res,next){
    try {
      const profileData = await Profile.findOne({ userId: req.user._id });
      profileData.education.push(req.body);
      const savedData = await profileData.save();
      res.status(200).send({ success: true, data: savedData });
    } catch (err) {
      res.send(err.message);
    }
  }

  async editEducation(req,res,next){
    try{
      const profileData = await Profile.findOne ({ userId: req.user._id });
      profileData.education.forEach(item=>{
    if(item._id==req.body.educationId){

          item.name = req.body.name;
          item.level = req.body.level;
          item.years = req.body.years;

        }
      
      })
      
      const savedData = await profileData.save();
      success({ res, data: savedData });
    }
    catch(err){

    }
  }


  async deleteEducation(req,res,next){
    try{
      const profileData = await Profile.findOne ({ userId: req.user._id }); 
      profileData.education = profileData.education.filter(item=>{
      return item._id != req.body.educationId;
     })

     const savedData = await profileData.save();
     success({ res, data: savedData });

    }
    catch(err){
      error({res,message:err.message})
    }
  }

  async editSubject(req,res,next){
    try{
      const profileData = await Profile.findOne({ userId: req.user._id });
      profileData.subject.forEach(item=>{
    if(item._id==req.body.subjectId){

          item.name = req.body.name;
          item.rate = req.body.rate;
          item.description = req.body.description;

        }
      
      })
      
      const savedData = await profileData.save();
      success({ res, data: savedData });
    }
    catch(err){

    }
  }

  async deleteSubject(req,res,next){
    try{
      const profileData = await Profile.findOne ({ userId: req.user._id }); 
      profileData.subject = profileData.subject.filter(item=>{
      return item._id != req.body.subjectId;
     })

     const savedData = await profileData.save();
     success({ res, data: savedData });

    }
    catch(err){
      error({res,message:err.message})
    }
  }

  async uploadCredentials(req,res,next){
    try{
    
      const profileData = await Profile.findOne ({ userId: req.user._id });
      if(profileData.credentials.length>=2) throw new Error('Maximum amount of credentials Reached!')
      profileData.credentials.push({image:req.file.buffer,description:req.body.description})
      const savedData =  await profileData.save();
      success({res,data:savedData})
    }
    catch(err){
      error({res,message:err.message})
    }
    
   }


   async removeCredentials(req,res,next){
    try{
      const profileData = await Profile.findOne ({ userId: req.user._id }); 
      profileData.credentials = profileData.credentials.filter(item=>{
      return item._id != req.body.credId;
     })

     const savedData = await profileData.save();
     success({ res, data: savedData });

    }
    catch(err){
      error({res,message:err.message})
    }

   }


   async uploadAvatar(req,res,next){

    try{
      const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
      const profileData = await Profile.findOne ({ userId: req.user._id });
      profileData.avatar = buffer;
      const savedData =  await profileData.save();
      success({res,data:savedData})
    }
    catch(err){
      error({res,message:err.message})
    }


   }


   async addEmployment(req,res,next){

      try{
        const profileData = await Profile.findOne({ userId: req.user._id });
        profileData.employment.push(req.body);
        const savedData = await profileData.save();
        res.status(200).send({ success: true, data: savedData });
      }
      catch(err){
        error({res,message:err.message})
      }

   }

   async editEmployment(req,res,next){
    try{
      const profileData = await Profile.findOne({ userId: req.user._id });
      profileData.employment.forEach(item=>{
    if(item._id==req.body.empId){

          item.role = req.body.role;
          item.timeFrame = req.body.timeFrame;
          item.jobDescription = req.body.jobDescription;
          item.company = req.body.company

        }
      
      })
      
      const savedData = await profileData.save();
      success({ res, data: savedData });
    }
    catch(err){
      error({res,message:err.message})
    }

   }
   

   async deleteEmployment(req,res,next){
    try{
      const profileData = await Profile.findOne ({ userId: req.user._id }); 
      profileData.employment = profileData.employment.filter(item=>{
      return item._id != req.body.empId;
     })

     const savedData = await profileData.save();
     success({ res, data: savedData });

    }
    catch(err){
      error({res,message:err.message})
    }
   }
}

module.exports = new ProfileController();
