const jwt= require("jsonwebtoken");
const { JWT_KEYCODE } = require("../configuration/config");

class HelperClass{


    static decodeJwt(token){
        const decoded = jwt.verify(token,JWT_KEYCODE)
        return decoded;
    }

}

module.exports = HelperClass