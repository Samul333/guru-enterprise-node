const Profile = require("../model/Profile");
const { success, error } = require("../utils/response");


class SearchController{

    async search(req,res,next){
        try{
            const {term} = req.body;

            const data = await Profile.find({"subject.name":{ $regex: /Guitar/}})
    
            success({res,data})
        }
     catch(err){
        error({res,message:err.message})
     }

    }

}


module.exports = new SearchController()