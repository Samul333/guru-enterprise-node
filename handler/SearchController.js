const Profile = require("../model/Profile");
const { success, error } = require("../utils/response");


class SearchController{

    async search(req,res,next){

        const {term} = req.body;

        const data = await Profile.find({subject:{$elemMatch : {name:'/React/'}}})

        success({res,data})

    }

}


module.exports = new SearchController()