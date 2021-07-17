const dotenv = require('dotenv')
dotenv.config()


const DOMAIN_NAME = process.env.DOMAIN_NAME || 'http://localhost:3000'
const MAILER_EMAIL = process.env.MAILER_EMAIL || ''
const MAILER_PASSWORD= process.env.MAILER_PASSWORD || ''
const JWT_KEYCODE = process.env.JWT_KEYCODE || ''
const MONGODB_URI = process.env.MONGODB_URI || ''



module.exports={
    DOMAIN_NAME,
    MAILER_EMAIL,
    MAILER_PASSWORD,
    JWT_KEYCODE,
    MONGODB_URI
}